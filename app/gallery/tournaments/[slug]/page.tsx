import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoMasonryGallery from "@/components/PhotoMasonryGallery";
import { supabase } from "@/lib/supabase";

export default async function TournamentAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: album, error: albumError } = await supabase
    .from("gallery_albums")
    .select("id, title, description, slug")
    .eq("category", "tournament")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (albumError || !album) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-800">
        <Header />

        <section className="px-6 pb-24 pt-32">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold text-slate-900">
              Tournament album not found
            </h1>

            <a
              href="/gallery/tournaments"
              className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Back to Tournament Gallery
            </a>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const { data: photos, error: photosError } = await supabase
    .from("gallery_images")
    .select("id, title, src, description, sort_order")
    .eq("category", "tournament")
    .eq("album_id", album.id)
    .eq("active", true)
    .eq("approved", true)
    .eq("visibility", "public")
    .order("sort_order", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Tournament Album
          </p>

          <h1 className="mb-6 text-5xl font-extrabold text-slate-900">
            {album.title}
          </h1>

          <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-600">
            {album.description ||
              "Browse photos from this tournament. Click any photo to view it larger."}
          </p>

          {photosError && (
            <p className="rounded-3xl bg-red-50 p-6 text-red-600">
              Could not load tournament photos.
            </p>
          )}

          {!photosError && (!photos || photos.length === 0) && (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow">
              No photos have been uploaded to this album yet.
            </p>
          )}

          {photos && photos.length > 0 && (
            <PhotoMasonryGallery photos={photos} />
          )}

          <a
            href="/gallery/tournaments"
            className="mt-12 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to Tournament Gallery
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}