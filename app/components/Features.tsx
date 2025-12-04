"use client";

import { motion } from "framer-motion";
import { Wallet, PieChart, Bell, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Wallet,
    title: "Smart Expense Tracking",
    description:
      "Automatically categorize and track all your expenses in real-time with AI-powered insights.",
  },
  {
    icon: PieChart,
    title: "Budget Management",
    description:
      "Set custom budgets for different categories and get alerts before you overspend.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Stay informed about your spending habits with intelligent alerts and reminders.",
  },
  {
    icon: Shield,
    title: "Bank-level Security",
    description:
      "Your financial data is protected with enterprise-grade encryption and security.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="text-primary">Financial Success</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your money better, all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-card border-border">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
