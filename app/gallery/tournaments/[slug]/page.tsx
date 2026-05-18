import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoMasonryGallery from "@/components/PhotoMasonryGallery";

const tournamentAlbums = {
  "spring-tournament": {
    title: "2026 Spring Tournament",
    photos: [
      { id: 1, title: "Photo 1", src: "/images/gallery/1.webp", description: "" },
      { id: 2, title: "Photo 2", src: "/images/gallery/2.webp", description: "" },
      { id: 3, title: "Photo 3", src: "/images/gallery/3.webp", description: "" },
      { id: 4, title: "Photo 4", src: "/images/gallery/4.webp", description: "" },
      { id: 5, title: "Photo 5", src: "/images/gallery/5.webp", description: "" },
    ],
  },

  "summer-open": {
    title: "2026 Summer Open",
    photos: [
      { id: 1, title: "Photo 1", src: "/images/gallery/6.webp", description: "" },
      { id: 2, title: "Photo 2", src: "/images/gallery/7.webp", description: "" },
      { id: 3, title: "Photo 3", src: "/images/gallery/8.webp", description: "" },
      { id: 4, title: "Photo 4", src: "/images/gallery/9.webp", description: "" },
    ],
  },

  "fall-championship": {
    title: "2026 Fall Championship",
    photos: [
      { id: 1, title: "Photo 1", src: "/images/gallery/10.webp", description: "" },
      { id: 2, title: "Photo 2", src: "/images/gallery/11.webp", description: "" },
      { id: 3, title: "Photo 3", src: "/images/gallery/12.webp", description: "" },
    ],
  },

  "year-end-tournament": {
    title: "2026 Year-End Tournament",
    photos: [
      { id: 1, title: "Photo 1", src: "/images/gallery/13.webp", description: "" },
    ],
  },
};

export default async function TournamentAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = tournamentAlbums[slug as keyof typeof tournamentAlbums];

  if (!album) {
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
            Browse photos from this tournament. Click any photo to view it larger.
          </p>

          <PhotoMasonryGallery photos={album.photos} />

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