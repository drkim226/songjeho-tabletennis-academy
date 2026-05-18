import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const tournaments = [
  {
    title: "2026 Spring Tournament",
    href: "/gallery/tournaments/spring-tournament",
    image: "/images/gallery/1.webp",
    description:
      "Friendly competition and exciting matches from our spring tournament.",
  },
  {
    title: "2026 Summer Open",
    href: "/gallery/tournaments/summer-open",
    image: "/images/gallery/5.webp",
    description:
      "Players from different clubs joined together for our summer open event.",
  },
  {
    title: "2026 Fall Championship",
    href: "/gallery/tournaments/fall-championship",
    image: "/images/gallery/9.webp",
    description:
      "A high-level championship event with strong competition and great memories.",
  },
  {
    title: "2026 Year-End Tournament",
    href: "/gallery/tournaments/year-end-tournament",
    image: "/images/gallery/13.webp",
    description:
      "Celebrating the end of the season with members and supporters together.",
  },
];

export default function TournamentGalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          {/* TITLE */}
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

          {/* GRID */}
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {tournaments.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* IMAGE */}
                <div className="relative h-[260px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <h2 className="text-2xl font-bold text-white">
                      {item.title}
                    </h2>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="leading-7 text-slate-600">
                    {item.description}
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

      <Footer />
    </main>
  );
}