import { Suspense } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RatingSection from "@/components/RatingSection";
import About from "@/components/About";
import Coaching from "@/components/Coaching";
import Membership from "@/components/Membership";
import Gallery from "@/components/Gallery";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <Hero />

      <RatingSection />

      <About />

      <Suspense fallback={<div className="py-20 text-center">Loading coaching...</div>}>
        <Coaching />
      </Suspense>

      <Membership />

      <Gallery />

      <Suspense fallback={<div className="py-20 text-center">Loading news...</div>}>
        <News />
      </Suspense>

      <Contact />

      <Footer />
    </main>
  );
}