"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Coach = {
  id: string;
  name: string;
  korean_name?: string;
  role?: string;
  specialty?: string;
  slug: string;
  image: string | null;
  active: boolean;
  sort_order?: number;
};

export default function Coaching() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadCoaches();
  }, []);

  async function loadCoaches() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("coaches")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });

   if (error) throw error;

console.log("COACHES DATA:", data);

setCoaches(data || []);
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="coaching" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Coaching Program
          </p>

          <h3 className="text-4xl font-extrabold text-slate-900 md:text-6xl">
            Private Lessons & Elite Coaching
          </h3>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Song Jeho Table Tennis Academy offers private coaching with experienced Korean elite players and senior coaches. Lesson sessions may be added to membership plans.
          </p>
        </div>

        {loading && (
          <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
            Loading coaches...
          </div>
        )}

        {error && (
          <div className="rounded-3xl bg-red-50 p-8 text-red-600">
            Could not load coaches.
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-5">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="group overflow-hidden rounded-3xl bg-slate-50 shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
               <Link
  href={`/coaches/${coach.slug}`}
  className="block h-40 overflow-hidden bg-slate-200"
>
  <img
    src={coach.image || "/images/coaches/coach-5.png"}
    alt={coach.name}
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
</Link>

                <div className="p-5">
                  <h5 className="text-xl font-bold text-slate-900">
                    {coach.name}
                  </h5>

                  {coach.korean_name && (
                    <p className="mt-1 text-base font-bold text-slate-500">
                      {coach.korean_name}
                    </p>
                  )}

                  {coach.role && (
                    <p className="mt-2 text-sm font-semibold text-sky-700">
                      {coach.role}
                    </p>
                  )}

                  {coach.specialty && (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {coach.specialty}
                    </p>
                  )}

                  <Link
                    href={`/coaches/${coach.slug}`}
                    className="mt-5 inline-block font-bold text-sky-700 transition hover:text-orange-500"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}