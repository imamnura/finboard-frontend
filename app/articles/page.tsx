import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { articles } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

// Enable ISR - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export const metadata = {
  title: "Blog | FinBoard - Financial Insights & Tips",
  description:
    "Read the latest articles about personal finance, budgeting, investing, and financial planning from FinBoard experts.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 bg-linear-to-br from-background via-background to-finance-light-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Financial <span className="text-secondary">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tips, guides, and insights to help you master your finances
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="aspect-video relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                      <span>•</span>
                      <span className="text-secondary">{article.category}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 flex-1">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm text-muted-foreground">
                          {article.author.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
