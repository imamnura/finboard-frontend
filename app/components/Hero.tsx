"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section
      id="home"
      className="pt-32 pb-20 md:pt-40 md:pb-32 bg-linear-to-br from-background via-background to-finance-light-bg"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                Smart Financial Management
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Take Control of Your{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Finances
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Track expenses, manage budgets, and achieve your financial goals
              with our intelligent tracking system powered by Gemercik Studio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-secondary">
                  $2M+
                </div>
                <div className="text-sm text-muted-foreground">Tracked</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  4.9★
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 aspect-4/3 w-full">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Financial Tracking App Dashboard"
                fill
                className="rounded-2xl shadow-strong object-cover"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-accent rounded-full blur-3xl opacity-20 -z-10" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
