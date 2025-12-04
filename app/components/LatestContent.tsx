"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";

export const LatestContent = () => {
  // Show only first 3 articles
  const latestArticles = articles.slice(0, 3);

  return (
    <section id="content" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Latest Financial <span className="text-secondary">Insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with expert tips and guides to improve your financial
            literacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/articles/${article.slug}`}>
                <Card className="overflow-hidden h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-card cursor-pointer">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {
                          new Date(article.publishedAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </span>
                      <span>•</span>
                      <span className="text-secondary">{article.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/articles">
            <Button size="lg" variant="outline">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
