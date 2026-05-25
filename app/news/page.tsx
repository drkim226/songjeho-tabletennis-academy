import { supabase } from "@/lib/supabase";

export default async function PublicNewsPage() {
  const { data: posts } = await supabase
    .from("news_posts")
    .select("id, created_at, title, slug, excerpt, cover_image")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Notice Board
        </p>

        <h1 className="mb-10 text-5xl font-extrabold text-slate-900">
          Latest News
        </h1>

        <div className="space-y-6">
          {posts?.map((post) => (
            <a
              key={post.id}
              href={`/news/${post.slug}`}
              className="block rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-extrabold text-slate-900">
                {post.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {new Date(post.created_at).toLocaleDateString()}
              </p>

              {post.excerpt && (
                <p className="mt-4 text-slate-600">{post.excerpt}</p>
              )}

              <p className="mt-5 font-bold text-sky-700">Read More →</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}