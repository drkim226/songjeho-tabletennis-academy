import { supabase } from "@/lib/supabase";

type NewsPost = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
};

export default async function News() {
  const { data: newsItems, error } = await supabase
    .from("news_posts")
    .select("id, created_at, title, slug, excerpt, cover_image")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <section id="news" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Notice Board
          </p>

          <h3 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Latest News
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Stay updated with academy announcements, class schedules,
            tournaments, and important notices.
          </p>
        </div>

        {error && (
          <p className="rounded-3xl bg-red-50 p-6 text-center font-semibold text-red-600">
            Could not load news posts.
          </p>
        )}

        {!error && (!newsItems || newsItems.length === 0) && (
          <p className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500 shadow">
            No news posts yet.
          </p>
        )}

        {!error && newsItems && newsItems.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl">
            {newsItems.map((item) => (
              <a
                key={item.id}
                href={`/news/${item.slug}`}
                className="group grid gap-4 border-b border-slate-200 bg-white p-6 transition duration-300 last:border-b-0 hover:bg-sky-50 md:grid-cols-[140px_1fr_120px]"
              >
                <div>
                  <p className="text-sm font-bold text-slate-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                    News
                  </span>
                </div>

                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 group-hover:text-sky-700">
                    {item.title}
                  </h4>

                  <p className="mt-2 leading-7 text-slate-600">
                    {item.excerpt || ""}
                  </p>
                </div>

                <div className="flex items-center md:justify-end">
                  <span className="font-bold text-sky-700 transition group-hover:text-orange-500">
                    Read More →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}