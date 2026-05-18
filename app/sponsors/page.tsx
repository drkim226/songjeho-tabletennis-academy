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
    description: "Supporting local table tennis and community events.",
    support: "Tournament support, academy events, and community programs.",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Sponsor Name 2",
    logoText: "LOGO",
    category: "Business Supporter",
    description: "A valued supporter of our academy and members.",
    support: "Helps support club activities and member events.",
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
    <main className="min-h-screen bg-white text-slate-800">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              Sponsors & Supporters
            </p>

            <h1 className="text-4xl font-extrabold text-sky-700 md:text-5xl">
              Thank You to Our Sponsors
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              We sincerely appreciate the businesses and individuals who support
              Song Jeho Table Tennis Academy and our local table tennis community.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <button
                key={sponsor.id}
                onClick={() => setSelectedSponsor(sponsor)}
                className="group min-h-[330px] rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-sky-50 text-center text-sm font-black text-sky-700 ring-1 ring-sky-100">
                  {sponsor.logoText}
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  {sponsor.category}
                </p>

                <h2 className="text-2xl font-extrabold text-slate-800">
                  {sponsor.name}
                </h2>

                <p className="mt-4 text-sm italic leading-6 text-slate-500">
                  {sponsor.description}
                </p>

                <p className="mt-6 font-bold text-sky-700 transition group-hover:text-orange-500">
                  View Details →
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedSponsor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
            <button
              onClick={() => setSelectedSponsor(null)}
              className="absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 font-bold text-white hover:bg-red-500"
            >
              X
            </button>

            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-sky-50 text-sm font-black text-sky-700 ring-1 ring-sky-100">
              {selectedSponsor.logoText}
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              {selectedSponsor.category}
            </p>

            <h2 className="text-4xl font-extrabold text-slate-900">
              {selectedSponsor.name}
            </h2>

            <p className="mt-6 text-lg italic leading-8 text-slate-600">
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
      )}

      <Footer />
    </main>
  );
}