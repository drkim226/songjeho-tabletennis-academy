import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TournamentGalleryPage() {
  const tournaments = [
    "2026 Spring Tournament",
    "2026 Summer Open",
    "2026 Fall Championship",
    "2026 Year-End Tournament",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Tournament Gallery
          </p>

          <h1 className="mb-6 text-5xl font-extrabold text-slate-900">
            Major Club Tournaments
          </h1>

          <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-600">
            Photos from major tournaments held throughout the year. Each event
            can later include match photos, winners, results, and highlights.
          </p>

          <div className="grid gap-8 md:grid-cols-4">
            {tournaments.map((item) => (
              <div key={item} className="overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-orange-400 to-sky-700 text-white">
                  <span className="text-center text-2xl font-bold">
                    Tournament Photo
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900">{item}</h2>
                  <p className="mt-3 text-sm text-slate-600">
                    Add tournament photos and results later.
                  </p>
                </div>
              </div>
            ))}
          </div>

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