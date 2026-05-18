export default function News() {
  const newsItems = [
    {
      date: "Jun 2026",
      tag: "Notice",
      title: "Beginner Class Open",
      description:
        "New beginner-friendly training sessions are now available for players who want to build strong fundamentals.",
      href: "/news/beginner-class",
    },
    {
      date: "Every Friday",
      tag: "Event",
      title: "Friday Night Tournament",
      description:
        "Join our weekly friendly tournament every Friday night. Meet players, compete, and enjoy the club atmosphere.",
      href: "/news/friday-tournament",
    },
    {
      date: "Coach Tip",
      tag: "Tip",
      title: "How to Handle Heavy Backspin",
      description:
        "A short table tennis tip about racket angle, timing, and brushing contact against backspin balls.",
      href: "/news/backspin-tip",
    },
  ];

  return (
    <section id="news" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Notice Board
          </p>

          <h3 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Latest News
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Stay updated with academy announcements, class schedules,
            tournaments, and important notices.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl">
          {newsItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group grid gap-4 border-b border-slate-200 bg-white p-6 transition duration-300 last:border-b-0 hover:bg-sky-50 md:grid-cols-[140px_1fr_120px]"
            >
              <div>
                <p className="text-sm font-bold text-slate-400">
                  {item.date}
                </p>

                <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  {item.tag}
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-900 group-hover:text-sky-700">
                  {item.title}
                </h4>

                <p className="mt-2 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center md:justify-end">
                <span className="font-bold text-sky-700 transition group-hover:text-orange-500">
                  Read More →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}