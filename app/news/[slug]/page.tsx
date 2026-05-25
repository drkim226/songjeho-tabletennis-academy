import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", decodeURIComponent(slug))
    .eq("active", true)
    .single();

  if (error || !post) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="text-4xl font-extrabold text-slate-900">
              News post not found
            </h1>

            <a
              href="/#news"
              className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Back to News
            </a>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <article className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Song Jeho TTA News
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            {post.title}
          </h1>

          <p className="mt-4 text-slate-500">
            {new Date(post.created_at).toLocaleDateString()}
          </p>

          {post.cover_image && (
            <div className="mt-8 flex justify-center">
  <img
    src={post.cover_image}
    alt={post.title}
    className="max-h-[700px] max-w-full rounded-3xl object-contain"
  />
</div>
          )}

          {post.excerpt && (
            <p className="mt-8 text-xl font-semibold leading-8 text-slate-700">
              {post.excerpt}
            </p>
          )}

          {post.content && (
  <div
    className="mt-8 text-lg leading-6 text-slate-700
      [&_h1]:my-2 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:leading-tight
      [&_h2]:my-2 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight
      [&_p]:my-1
      [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-8
      [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-8
      [&_li]:my-0 [&_li]:pl-1
      [&_strong]:font-extrabold
      [&_em]:italic"
    dangerouslySetInnerHTML={{ __html: post.content }}
  />
)}

          <a
            href="/#news"
            className="mt-10 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to News
          </a>
        </article>
      </main>

      <Footer />
    </>
  );
}