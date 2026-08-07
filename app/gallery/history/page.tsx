
import PhotoMasonryGallery from "@/components/PhotoMasonryGallery";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HistoryGalleryPage() {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, title, src, description")
    .eq("category", "history")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  const photos =
    !error && data && data.length > 0
      ? data
      : [
          {
            id: 1,
            title: "Opening Day",
            src: "/images/gallery/1.webp",
            description: "A meaningful academy memory.",
          },
        ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
  

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Club Archive
          </p>

          <h1 className="mb-6 text-5xl font-extrabold text-slate-900">
            Club Story & History
          </h1>

          <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-600">
            A curated photo archive managed by Song Jeho Table Tennis Academy.
          </p>

          <PhotoMasonryGallery photos={photos} />

          <a
            href="/#gallery"
            className="mt-12 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to Gallery
          </a>
        </div>
      </section>

     
    </main>
  );
}