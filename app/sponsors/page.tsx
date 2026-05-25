"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Sponsor = {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  offer: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  logo_image: string | null;
  banner_image: string | null;
  featured: boolean;
  active: boolean;
  sort_order: number | null;
};

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setSponsors(data || []);
    setLoading(false);
  };

  const featuredSponsor = sponsors.find((sponsor) => sponsor.featured);
  const otherSponsors = sponsors.filter((sponsor) => !sponsor.featured);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        Loading Sponsors...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 text-slate-800">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute left-8 top-32 text-8xl opacity-10">🏓</div>
        <div className="absolute right-12 top-56 text-9xl opacity-10">📣</div>
        <div className="absolute bottom-24 left-1/3 text-8xl opacity-10">🤝</div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
              COMMUNITY SUPPORTERS
            </p>

            <h1 className="text-5xl font-black text-slate-900 md:text-6xl">
             Our Community Partners

            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Supporting the growth of table tennis through
our valued sponsors and community supporters.
            </p>
          </div>

          {featuredSponsor && (
            <button
              onClick={() => setSelectedSponsor(featuredSponsor)}
              className="group mb-14 grid w-full overflow-hidden rounded-[2rem] bg-white text-left shadow-2xl transition duration-300 hover:-translate-y-2 md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex min-h-[340px] items-center justify-center bg-gradient-to-br from-sky-600 to-blue-800 p-10 text-white">
                {featuredSponsor.logo_image ? (
                  <img
                    src={featuredSponsor.logo_image}
                    alt={featuredSponsor.name}
                    className="max-h-56 max-w-full rounded-3xl object-contain"
                  />
                ) : (
                  <div className="text-6xl">🤝</div>
                )}
              </div>

              <div className="p-10">
                <p className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                  Featured Sponsor
                </p>

                <h2 className="text-4xl font-black text-slate-900">
                  {featuredSponsor.name}
                </h2>

                {featuredSponsor.tagline && (
                  <p className="mt-4 text-xl font-bold text-sky-700">
                    {featuredSponsor.tagline}
                  </p>
                )}

                {featuredSponsor.description && (
                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    {featuredSponsor.description}
                  </p>
                )}

                {featuredSponsor.offer && (
                  <div className="mt-6 rounded-2xl bg-orange-50 p-5">
                    <p className="font-bold text-orange-600">Sponsor Spotlight</p>
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

                <div className="relative mb-6 flex h-28 items-center justify-center rounded-3xl bg-white p-4 shadow-inner">
                  {sponsor.logo_image ? (
                    <img
                      src={sponsor.logo_image}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-4xl">🤝</span>
                  )}
                </div>

                <h3 className="relative text-2xl font-black text-slate-900">
                  {sponsor.name}
                </h3>

                {sponsor.tagline && (
                  <p className="relative mt-3 font-bold text-sky-700">
                    {sponsor.tagline}
                  </p>
                )}

                {sponsor.description && (
                  <p className="relative mt-4 text-sm leading-6 text-slate-600">
                    {sponsor.description}
                  </p>
                )}

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
              Sponsors and community partners may be featured on this page to share their information, introduce their mission, and support the growth of our table tennis community.
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

            {(selectedSponsor.logo_image || selectedSponsor.banner_image) && (
              <div className="mb-8 flex justify-center rounded-3xl bg-white p-6">
                <img
                  src={selectedSponsor.banner_image || selectedSponsor.logo_image || ""}
                  alt={selectedSponsor.name}
                  className="max-h-[320px] max-w-full rounded-2xl object-contain"
                />
              </div>
            )}

            <h2 className="text-4xl font-black text-slate-900">
              {selectedSponsor.name}
            </h2>

            {selectedSponsor.tagline && (
              <p className="mt-4 text-xl font-bold text-sky-700">
                {selectedSponsor.tagline}
              </p>
            )}

            {selectedSponsor.description && (
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {selectedSponsor.description}
              </p>
            )}

            {selectedSponsor.offer && (
  <div className="mt-6 rounded-3xl bg-orange-50 p-6">
    <h3 className="text-xl font-bold text-orange-600">
      Sponsor Spotlight
    </h3>

    <p className="mt-3 leading-7 text-slate-700">
      {selectedSponsor.offer}
    </p>
  </div>
)}

           <div className="mt-8 space-y-3 rounded-3xl bg-slate-50 p-6 text-slate-700">
  {selectedSponsor.address && (
    <p>
      <span className="font-bold text-slate-900">Address: </span>
      {selectedSponsor.address}
    </p>
  )}

  {selectedSponsor.phone && (
    <p>
      <span className="font-bold text-slate-900">Phone: </span>
      <a
        href={`tel:${selectedSponsor.phone}`}
        className="text-sky-700 hover:text-orange-500"
      >
        {selectedSponsor.phone}
      </a>
    </p>
  )}

  {selectedSponsor.website && (
    <p>
      <span className="font-bold text-slate-900">Website: </span>
      <a
        href={selectedSponsor.website}
        target="_blank"
        rel="noreferrer"
        className="break-all text-sky-700 hover:text-orange-500"
      >
        {selectedSponsor.website}
      </a>
    </p>
  )}
</div>
          </div>
        </div>
      )}
    </main>
  );
}