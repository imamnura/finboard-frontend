import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { articles } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

// Generate static params for all articles (ISR)
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Enable ISR - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | FinBoard Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Get related articles (exclude current article)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link href="/articles">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Button>
          </Link>

          {/* Category Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">{article.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm">{article.author.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(article.publishedAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{article.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-12">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split("\n")
                  .map((line) => {
                    // Convert markdown-style headers
                    if (line.startsWith("# "))
                      return `<h1>${line.substring(2)}</h1>`;
                    if (line.startsWith("## "))
                      return `<h2>${line.substring(3)}</h2>`;
                    if (line.startsWith("### "))
                      return `<h3>${line.substring(4)}</h3>`;
                    // Convert markdown lists
                    if (line.startsWith("- "))
                      return `<li>${line.substring(2)}</li>`;
                    // Regular paragraphs
                    if (line.trim()) return `<p>${line}</p>`;
                    return "";
                  })
                  .join(""),
              }}
            />
          </div>

          {/* Author Info */}
          <div className="mt-12 p-6 bg-muted rounded-2xl">
            <div className="flex items-start space-x-4">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {article.author.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Financial Writer & Expert
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pb-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video relative">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm mb-3">
                        {relatedArticle.category}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
