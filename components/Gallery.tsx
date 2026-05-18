export default function Gallery() {
  const gallerySections = [
    {
      title: "Club Story & History",
      description:
        "A curated gallery managed by the club, featuring meaningful moments, history, coaches, and memorable club photos.",
      href: "/gallery/history",
      label: "Club Archive",
    },
    {
      title: "Tournament Gallery",
      description:
        "Photos from major club tournaments held throughout the year, including winners, matches, and special events.",
      href: "/gallery/tournaments",
      label: "Events",
    },
    {
      title: "Member Gallery",
      description:
        "A future community space where members can share table tennis memories, practice photos, and club moments.",
      href: "/gallery/members",
      label: "Coming Soon",
    },
  ];

  return (
    <section id="gallery" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Photo Gallery
          </p>

          <h3 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Club Memories, Tournaments, and Member Moments
          </h3>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore the story of Song Jeho Table Tennis Club through meaningful
            photos, tournament highlights, and future member-shared memories.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {gallerySections.map((section) => (
            <a
              key={section.title}
              href={section.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="flex h-64 items-end bg-gradient-to-br from-sky-500 to-blue-700 p-7 transition duration-500 group-hover:scale-105">
                <div>
                  <p className="mb-3 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                    {section.label}
                  </p>

                  <h4 className="text-3xl font-extrabold text-white">
                    {section.title}
                  </h4>
                </div>
              </div>

              <div className="p-7">
                <p className="mb-6 leading-7 text-slate-600">
                  {section.description}
                </p>

                <span className="font-bold text-sky-700 transition group-hover:text-orange-500">
                  View Gallery →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}