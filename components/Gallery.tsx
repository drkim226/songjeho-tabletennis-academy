"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type GallerySection = {
  title: string;
  description: string;
  href: string;
  label: string;
  category: "history" | "tournament";
  overlay: string;
  fallbackGradient: string;
};

export default function Gallery() {
  const [latestImages, setLatestImages] = useState<Record<string, string>>({});

  const gallerySections: GallerySection[] = [
    {
      title: "Club Story & History",
      description:
        "Explore meaningful academy memories, club history, coaches, and special moments that shaped Song Jeho Table Tennis Academy.",
      href: "/gallery/history",
      label: "Club Archive",
      category: "history",
      overlay: "from-sky-600/45 via-blue-500/35 to-indigo-700/45",
      fallbackGradient: "from-sky-500 via-blue-500 to-indigo-700",
    },
    {
      title: "Tournament Gallery",
      description:
        "Browse tournament highlights including exciting matches, champions, and unforgettable events throughout the season.",
      href: "/gallery/tournaments",
      label: "Events",
      category: "tournament",
      overlay: "from-orange-500/45 via-orange-500/35 to-red-500/45",
      fallbackGradient: "from-orange-400 via-orange-500 to-red-500",
    },
  ];

  useEffect(() => {
    loadLatestImages();
  }, []);

  const loadLatestImages = async () => {
    const result: Record<string, string> = {};

    for (const section of gallerySections) {
      const { data } = await supabase
        .from("gallery_images")
        .select("src")
        .eq("category", section.category)
        .eq("active", true)
        .eq("approved", true)
        .eq("visibility", "public")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data?.src) {
        result[section.category] = data.src;
      }
    }

    setLatestImages(result);
  };

  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-slate-50 to-white py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Photo Gallery
          </p>

          <h3 className="text-5xl font-extrabold text-slate-900 md:text-6xl">
            Club Memories & Tournament Highlights
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Explore the story of Song Jeho Table Tennis Academy through
            memorable club moments and exciting tournament experiences.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {gallerySections.map((section) => {
            const image = latestImages[section.category];

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div
                  className={`relative flex h-80 items-end overflow-hidden p-8 ${
                    !image
                      ? `bg-gradient-to-br ${section.fallbackGradient}`
                      : ""
                  }`}
                >
                  {image && (
                    <>
                      <img
                        src={image}
                        alt={section.title}
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-90 blur-[1px] transition duration-700 group-hover:scale-125"
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${section.overlay}`}
                      />
                    </>
                  )}

             <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-8">
  <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-200 drop-shadow">
    {section.label}
  </p>

  <h4 className="max-w-xl text-4xl font-extrabold leading-tight text-white drop-shadow-2xl">
    {section.title}
  </h4>
</div>
                </div>

                <div className="p-8">
                  <p className="mb-8 text-lg leading-8 text-slate-600">
                    {section.description}
                  </p>

                  <span className="text-lg font-bold text-sky-700 transition group-hover:text-orange-500">
                    View Gallery →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}