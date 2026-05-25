export default function Gallery() {
  const gallerySections = [
    {
      title: "Club Story & History",
      description:
        "Explore meaningful academy memories, club history, coaches, and special moments that shaped Song Jeho Table Tennis Academy.",
      href: "/gallery/history",
      label: "Club Archive",
      gradient: "from-sky-500 via-blue-500 to-indigo-700",
    },
    {
      title: "Tournament Gallery",
      description:
        "Browse tournament highlights including exciting matches, champions, and unforgettable events throughout the season.",
      href: "/gallery/tournaments",
      label: "Events",
      gradient: "from-orange-400 via-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-slate-50 to-white py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-16 text-center">

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Photo Gallery
          </p>

          <h3 className="text-5xl font-extrabold text-slate-900 md:text-6xl">
            Club Memories & Tournament Highlights
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Explore the story of Song Jeho Table Tennis Academy through
            memorable club moments and exciting tournament experiences.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-10 md:grid-cols-2">

          {gallerySections.map((section) => (

            <a
              key={section.title}
              href={section.href}
              className="
                group
                overflow-hidden
                rounded-[2rem]
                bg-white
                shadow-xl
                transition-all
                duration-500
                hover:-translate-y-3
                hover:shadow-2xl
              "
            >

              {/* Top Banner */}

              <div
                className={`
                  relative
                  flex
                  h-80
                  items-end
                  bg-gradient-to-br
                  ${section.gradient}
                  p-8
                  transition-all
                  duration-700
                  group-hover:scale-105
                `}
              >

                <div>

                  <p className="
                    mb-4
                    inline-block
                    rounded-full
                    bg-white/20
                    px-5
                    py-2
                    text-sm
                    font-bold
                    text-white
                    backdrop-blur
                  ">
                    {section.label}
                  </p>

                  <h4 className="text-4xl font-extrabold text-white">
                    {section.title}
                  </h4>

                </div>

              </div>

              {/* Bottom */}

              <div className="p-8">

                <p className="mb-8 text-lg leading-8 text-slate-600">
                  {section.description}
                </p>

                <span
                  className="
                    text-lg
                    font-bold
                    text-sky-700
                    transition
                    group-hover:text-orange-500
                  "
                >
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