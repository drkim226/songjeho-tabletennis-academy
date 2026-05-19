"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Sponsor = {
  id: number;
  name: string;
  category: string;
  tagline: string;
  description: string;
  services: string[];
  offer?: string;
  phone?: string;
  website?: string;
  address?: string;
  icon: string;
  featured?: boolean;
};

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Sponsor Business 1",
    category: "Insurance / Finance",
    tagline: "Serving the Korean-American community in Los Angeles.",
    description:
      "A trusted local business supporting Song Jeho Table Tennis Academy and our community events.",
    services: ["Auto Insurance", "Business Insurance", "Financial Services"],
    offer: "Special consultation available for academy members.",
    phone: "(000) 000-0000",
    website: "https://example.com",
    address: "Los Angeles, CA",
    icon: "🏢",
    featured: true,
  },
  {
    id: 2,
    name: "Sponsor Business 2",
    category: "Restaurant / Cafe",
    tagline: "Good food, friendly service, and community support.",
    description:
      "A local business partner helping support tournaments and member activities.",
    services: ["Korean Food", "Catering", "Group Dining"],
    offer: "Ask about member specials.",
    phone: "(000) 000-0000",
    website: "https://example.com",
    address: "Koreatown, Los Angeles",
    icon: "🍽️",
  },
  {
    id: 3,
    name: "Sponsor Business 3",
    category: "Health / Wellness",
    tagline: "Supporting active lifestyles and healthy communities.",
    description:
      "A community supporter helping our players stay active, healthy, and connected.",
    services: ["Wellness Care", "Senior Support", "Health Consultation"],
    phone: "(000) 000-0000",
    address: "Los Angeles, CA",
    icon: "💪",
  },
  {
    id: 4,
    name: "Individual Supporter",
    category: "Personal Supporter",
    tagline: "Supporting table tennis with heart.",
    description:
      "An individual supporter contributing to youth, senior, and community table tennis programs.",
    services: ["Community Support", "Tournament Support", "Youth Development"],
    icon: "⭐",
  },
];

export default function SponsorsPage() {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  const featuredSponsor = sponsors.find((sponsor) => sponsor.featured);
  const otherSponsors = sponsors.filter((sponsor) => !sponsor.featured);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 text-slate-800">
      <Header />

      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute left-8 top-32 text-8xl opacity-10">🏓</div>
        <div className="absolute right-12 top-56 text-9xl opacity-10">📣</div>
        <div className="absolute bottom-24 left-1/3 text-8xl opacity-10">🤝</div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
              Sponsors & Local Partners
            </p>

            <h1 className="text-5xl font-black text-slate-900 md:text-6xl">
              Community Businesses
              <br />
              Supporting Table Tennis
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              We appreciate the businesses and individuals who support Song Jeho
              Table Tennis Academy. Please visit and support our community partners.
            </p>
          </div>

          {featuredSponsor && (
            <button
              onClick={() => setSelectedSponsor(featuredSponsor)}
              className="group mb-14 grid w-full overflow-hidden rounded-[2rem] bg-white text-left shadow-2xl transition duration-300 hover:-translate-y-2 md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex min-h-[340px] items-center justify-center bg-gradient-to-br from-sky-600 to-blue-800 p-10 text-white">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-white/20 text-6xl backdrop-blur-md ring-1 ring-white/30">
                    {featuredSponsor.icon}
                  </div>

                  <p className="rounded-full bg-white/20 px-5 py-2 text-sm font-bold uppercase tracking-widest backdrop-blur">
                    Featured Sponsor
                  </p>
                </div>
              </div>

              <div className="p-10">
                <p className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                  {featuredSponsor.category}
                </p>

                <h2 className="text-4xl font-black text-slate-900">
                  {featuredSponsor.name}
                </h2>

                <p className="mt-4 text-xl font-bold text-sky-700">
                  {featuredSponsor.tagline}
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {featuredSponsor.description}
                </p>

                {featuredSponsor.offer && (
                  <div className="mt-6 rounded-2xl bg-orange-50 p-5">
                    <p className="font-bold text-orange-600">Special Offer</p>
                    <p className="mt-2 text-slate-700">
                      {featuredSponsor.offer}
                    </p>
                  </div>
                )}

                <p className="mt-8 font-bold text-sky-700 group-hover:text-orange-500">
                  View Business Details →
                </p>
              </div>
            </button>
          )}

          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
                Business Directory
              </p>

              <h2 className="text-4xl font-black text-slate-900">
                Our Sponsors
              </h2>
            </div>

            <a
              href="/#contact"
              className="hidden rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700 md:inline-block"
            >
              Become a Sponsor
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {otherSponsors.map((sponsor) => (
              <button
                key={sponsor.id}
                onClick={() => setSelectedSponsor(sponsor)}
                className="group relative overflow-hidden rounded-[2rem] bg-white p-8 text-left shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-100 transition group-hover:scale-125" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-orange-100 transition group-hover:scale-125" />

                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100 to-orange-100 text-4xl shadow-inner">
                  {sponsor.icon}
                </div>

                <p className="relative mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                  {sponsor.category}
                </p>

                <h3 className="relative text-2xl font-black text-slate-900">
                  {sponsor.name}
                </h3>

                <p className="relative mt-3 font-bold text-sky-700">
                  {sponsor.tagline}
                </p>

                <p className="relative mt-4 text-sm leading-6 text-slate-600">
                  {sponsor.description}
                </p>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  {sponsor.services.slice(0, 2).map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <p className="relative mt-6 font-bold text-orange-500">
                  See Details →
                </p>
              </button>
            ))}
          </div>

          <div className="mt-16 overflow-hidden rounded-[2rem] bg-slate-900 p-10 text-center text-white shadow-2xl">
            <div className="mb-5 text-5xl">📣</div>

            <h2 className="text-3xl font-black">
              Promote Your Business While Supporting the Academy
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Sponsors may be featured on this page with business information,
              services, contact links, and special offers for our community.
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
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-10 shadow-2xl">
            <button
              onClick={() => setSelectedSponsor(null)}
              className="absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 font-bold text-white hover:bg-red-500"
            >
              X
            </button>

            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100 to-orange-100 text-6xl">
              {selectedSponsor.icon}
            </div>

            <p className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
              {selectedSponsor.category}
            </p>

            <h2 className="text-4xl font-black text-slate-900">
              {selectedSponsor.name}
            </h2>

            <p className="mt-4 text-xl font-bold text-sky-700">
              {selectedSponsor.tagline}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {selectedSponsor.description}
            </p>

            <div className="mt-8 rounded-3xl bg-slate-50 p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Services
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {selectedSponsor.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {selectedSponsor.offer && (
              <div className="mt-6 rounded-3xl bg-orange-50 p-6">
                <h3 className="text-xl font-bold text-orange-600">
                  Special Offer
                </h3>

                <p className="mt-3 leading-7 text-slate-700">
                  {selectedSponsor.offer}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              {selectedSponsor.phone && (
                <a
                  href={`tel:${selectedSponsor.phone}`}
                  className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                >
                  Call Now
                </a>
              )}

              {selectedSponsor.website && (
                <a
                  href={selectedSponsor.website}
                  target="_blank"
                  className="rounded-full bg-orange-400 px-6 py-3 font-bold text-slate-900 hover:bg-orange-300"
                >
                  Visit Website
                </a>
              )}

              {selectedSponsor.address && (
                <span className="rounded-full bg-slate-100 px-6 py-3 font-bold text-slate-700">
                  {selectedSponsor.address}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}