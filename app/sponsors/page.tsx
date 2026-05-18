"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Sponsor = {
  id: number;
  name: string;
  logoText: string;
  category: string;
  description: string;
  support: string;
  website?: string;
};

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Sponsor Name 1",
    logoText: "LOGO",
    category: "Community Partner",
    description: "Supporting local table tennis and academy events.",
    support: "Tournament support, academy events, and community programs.",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Sponsor Name 2",
    logoText: "LOGO",
    category: "Business Supporter",
    description: "Helping our academy grow and serve more players.",
    support: "Supports club activities and member programs.",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Individual Supporter",
    logoText: "THANK YOU",
    category: "Personal Supporter",
    description: "Contributing to the growth of our table tennis community.",
    support: "Supports youth, senior, and community table tennis activities.",
  },
  {
    id: 4,
    name: "Sponsor Name 4",
    logoText: "LOGO",
    category: "Event Sponsor",
    description: "Helping make local tournaments and gatherings possible.",
    support: "Supports tournament prizes, banners, and event operations.",
  },
];

export default function SponsorsPage() {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
              Sponsors & Supporters
            </p>

            <h1 className="text-5xl font-black text-slate-900 md:text-6xl">
              Powered by Our Community
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              We sincerely appreciate the businesses and individuals who support
              Song Jeho Table Tennis Academy and help our table tennis community grow.
            </p>
          </div>

          {/* Featured Sponsor */}
          <button
            onClick={() => setSelectedSponsor(sponsors[0])}
            className="group mb-12 grid w-full overflow-hidden rounded-[2rem] bg-white text-left shadow-2xl transition duration-300 hover:-translate-y-2 md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="flex min-h-[320px] items-center justify-center bg-gradient-to-br from-sky-600 to-blue-800 p-10 text-white">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/20 text-2xl font-black backdrop-blur-md ring-1 ring-white/30">
                {sponsors[0].logoText}
              </div>
            </div>

            <div className="p-10">
              <p className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                Featured Supporter
              </p>

              <h2 className="text-4xl font-black text-slate-900">
                {sponsors[0].name}
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                {sponsors[0].description}
              </p>

              <p className="mt-8 font-bold text-sky-700 group-hover:text-orange-500">
                View Sponsor Details →
              </p>
            </div>
          </button>

          {/* Logo Wall */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sponsors.slice(1).map((sponsor) => (
              <button
                key={sponsor.id}
                onClick={() => setSelectedSponsor(sponsor)}
                className="group rounded-[2rem] border border-slate-200 bg-white/80 p-8 text-center shadow-sm backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-2xl"
              >
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-sky-50 text-sm font-black text-sky-700 ring-1 ring-sky-100 transition group-hover:scale-105">
                  {sponsor.logoText}
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                  {sponsor.category}
                </p>

                <h3 className="text-2xl font-extrabold text-slate-900">
                  {sponsor.name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {sponsor.description}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] bg-slate-900 p-10 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-black">
              Interested in Supporting the Academy?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              We welcome local businesses and individuals who want to support
              tournaments, youth development, senior programs, and community events.
            </p>

            <a
              href="/#contact"
              className="mt-8 inline-block rounded-full bg-orange-400 px-8 py-4 font-bold text-slate-900 hover:bg-orange-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {selectedSponsor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-6">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <button
              onClick={() => setSelectedSponsor(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white px-4 py-2 font-bold text-slate-900 shadow hover:bg-red-500 hover:text-white"
            >
              X
            </button>

            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-sky-600 to-blue-800 text-white">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-xl font-black backdrop-blur-md ring-1 ring-white/30">
                {selectedSponsor.logoText}
              </div>
            </div>

            <div className="p-10 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                {selectedSponsor.category}
              </p>

              <h2 className="text-4xl font-black text-slate-900">
                {selectedSponsor.name}
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {selectedSponsor.description}
              </p>

              <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-left">
                <h3 className="text-xl font-bold text-slate-900">Support</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {selectedSponsor.support}
                </p>
              </div>

              {selectedSponsor.website && (
                <a
                  href={selectedSponsor.website}
                  target="_blank"
                  className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}