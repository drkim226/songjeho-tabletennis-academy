import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoMasonryGallery from "@/components/PhotoMasonryGallery";

export default function HistoryGalleryPage() {
  const photos = [
    {
      id: 1,
      title: "Opening Day",
      src: "/images/gallery/1.webp",
      description: "A meaningful academy memory.",
    },
    {
      id: 2,
      title: "Coach & Members",
      src: "/images/gallery/2.webp",
      description: "Coaches and members together.",
    },
    {
      id: 3,
      title: "Training Moment",
      src: "/images/gallery/3.webp",
      description: "Daily training culture.",
    },
    {
      id: 4,
      title: "Club Event",
      src: "/images/gallery/4.webp",
      description: "Special academy event.",
    },
    {
      id: 5,
      title: "Community Day",
      src: "/images/gallery/5.webp",
      description: "Members enjoying table tennis.",
    },
    {
      id: 6,
      title: "Academy Memory",
      src: "/images/gallery/6.webp",
      description: "A special club moment.",
    },
    {
      id: 7,
      title: "Academy Memory",
      src: "/images/gallery/7.webp",
      description: "A special club moment.",
    },
    {
      id: 8,
      title: "Academy Memory",
      src: "/images/gallery/8.webp",
      description: "A special club moment.",
    },
    {
      id: 9,
      title: "Academy Memory",
      src: "/images/gallery/9.webp",
      description: "A special club moment.",
    },
    {
      id: 10,
      title: "Academy Memory",
      src: "/images/gallery/10.webp",
      description: "A special club moment.",
    },
    {
      id: 11,
      title: "Academy Memory",
      src: "/images/gallery/11.webp",
      description: "A special club moment.",
    },
    {
      id: 12,
      title: "Academy Memory",
      src: "/images/gallery/12.webp",
      description: "A special club moment.",
    },
    {
      id: 13,
      title: "Academy Memory",
      src: "/images/gallery/13.webp",
      description: "A special club moment.",
    },

  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

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
            Photos will later be loaded from the database and displayed in a
            stylish masonry gallery.
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

      <Footer />
    </main>
  );
}