"use client";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { LatestContent } from "./components/LatestContent";
import { Events } from "./components/Event";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <LatestContent />
        <Events />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
