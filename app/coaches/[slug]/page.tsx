import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Coach = {
  id: string;
  name: string;
  korean_name: string | null;
  slug: string;
  role: string | null;
  specialty: string | null;
  style: string | null;
  image: string | null;
  experience: string[] | null;
  elite_career: string[] | null;
  recommended_for: string[] | null;
  video_urls: string[] | null;
  active: boolean;
};

function getYouTubeEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return url;
}

export default async function CoachProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: coach, error } = await supabase
    .from("coaches")
    .select("*")
    .eq("slug", decodeURIComponent(slug))
    .eq("active", true)
    .single();

  if (error || !coach) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-800">
        <section className="px-6 pb-24 pt-32">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold text-slate-900">
              Coach not found
            </h1>

            <Link
              href="/#coaching"
              className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Back to Coaching
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const videos = (coach.video_urls || []).filter(Boolean).slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl h-fit">
            {coach.image && (
              <img
                src={coach.image}
                alt={coach.name}
                className="h-[420px] w-full rounded-3xl object-cover"
              />
            )}
          </div>

          <article className="rounded-3xl bg-white p-10 shadow-xl">
            {coach.role && (
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
                {coach.role}
              </p>
            )}

            <h1 className="text-5xl font-extrabold text-slate-900">
              {coach.name}
            </h1>

            {coach.korean_name && (
              <p className="mt-2 text-2xl font-bold text-slate-500">
                {coach.korean_name}
              </p>
            )}

            {coach.specialty && (
              <p className="mb-8 mt-6 text-xl font-semibold text-sky-700">
                {coach.specialty}
              </p>
            )}

            {coach.style && (
              <p className="mb-8 text-lg leading-8 text-slate-700">
                {coach.style}
              </p>
            )}

            <Link
              href="/#contact"
              className="inline-block rounded-full bg-orange-400 px-8 py-4 font-extrabold text-slate-900 shadow-lg hover:bg-orange-300"
            >
              Ask About Lessons
            </Link>
          </article>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 md:grid-cols-3">
          <InfoCard title="Coaching & Leadership" items={coach.experience || []} />
          <InfoCard title="Elite Career" items={coach.elite_career || []} />
          <InfoCard title="Recommended For" items={coach.recommended_for || []} />
        </div>

        {videos.length > 0 && (
          <div className="mx-auto mt-10 max-w-6xl rounded-3xl bg-white p-10 shadow-xl">
            <h2 className="mb-8 text-3xl font-extrabold text-slate-900">
              Coach Videos
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {videos.map((video) => (
                <div
                  key={video}
                  className="overflow-hidden rounded-3xl bg-slate-100 shadow"
                >
                  <iframe
                    src={getYouTubeEmbedUrl(video)}
                    title="Coach video"
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-6xl">
          <Link
            href="/#coaching"
            className="inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to Coaching
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-3xl bg-white p-10 shadow-xl">
      <h2 className="mb-6 text-3xl font-extrabold text-slate-900">
        {title}
      </h2>

     <ul className="list-disc space-y-4 pl-6 text-lg leading-8 text-slate-700">
  {items.map((item) => (
    <li key={item} className="pl-1">
      {item}
    </li>
  ))}
</ul>
    </div>
  );
}