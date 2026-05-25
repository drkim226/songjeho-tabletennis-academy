
import { supabase } from "@/lib/supabase";

export default async function TournamentGalleryPage() {
  const { data: albums, error } = await supabase
    .from("gallery_albums")
    .select("id, title, slug, description, cover_image, sort_order")
    .eq("category", "tournament")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
     

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
              Tournament Gallery
            </p>

            <h1 className="text-5xl font-extrabold text-slate-900">
              Tournament Albums
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Explore tournament memories, match highlights, and community
              moments from Song Jeho Table Tennis Academy events.
            </p>
          </div>

          {error && (
            <p className="rounded-3xl bg-red-50 p-6 text-red-600">
              Could not load tournament albums.
            </p>
          )}

          {!error && (!albums || albums.length === 0) && (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow">
              No tournament albums have been added yet.
            </p>
          )}

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {albums?.map((album) => (
              <a
                key={album.id}
                href={`/gallery/tournaments/${album.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-[260px] overflow-hidden bg-slate-200">
                  {album.cover_image ? (
                    <img
                      src={album.cover_image}
                      alt={album.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      No Cover Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <h2 className="text-2xl font-bold text-white">
                      {album.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="leading-7 text-slate-600">
                    {album.description || "Tournament photo album."}
                  </p>

                  <div className="mt-6 inline-flex items-center font-bold text-sky-600">
                    View Album →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    
    </main>
  );
}