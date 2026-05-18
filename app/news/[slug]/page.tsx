import Header from "@/components/Header";
import Footer from "@/components/Footer";

const newsData = {
  "beginner-class": {
    category: "Club Announcement",
    title: "Beginner Class Open",
    date: "June 2026",
    content: [
      "We are excited to announce that beginner-friendly training sessions are now available.",
      "This class is designed for players who want to learn basic footwork, grip, stroke mechanics, serve, receive, and rally control.",
      "New members are welcome. No advanced experience is required.",
    ],
  },
  "friday-tournament": {
    category: "Event / Tournament",
    title: "Friday Night Tournament",
    date: "Every Friday at 7 PM",
    content: [
      "Our weekly Friday Night Tournament is open to club members who want to enjoy friendly competition.",
      "Players will be matched by level whenever possible, so beginners and advanced players can both enjoy the event.",
      "This is a great opportunity to meet other players and improve your match experience.",
    ],
  },
  "backspin-tip": {
    category: "Table Tennis Tip",
    title: "How to Handle Heavy Backspin",
    date: "Coach’s Corner",
    content: [
      "When handling heavy backspin, the key is racket angle, timing, and upward brushing contact.",
      "Do not hit too flat. Open the racket slightly and contact the ball with a smooth upward motion.",
      "For more consistency, focus on thin contact and good body balance after the stroke.",
    ],
  },
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = newsData[slug as keyof typeof newsData];

  if (!news) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-800">
        <Header />

        <section className="px-6 pb-24 pt-32">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold text-slate-900">
              News not found
            </h1>

            <a
              href="/#news"
              className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Back to News
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
        <article className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            {news.category}
          </p>

          <h1 className="mb-4 text-5xl font-extrabold text-slate-900">
            {news.title}
          </h1>

          <p className="mb-10 text-slate-500">
            {news.date}
          </p>

          <div className="space-y-6 text-lg leading-8 text-slate-700">
            {news.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <a
            href="/#news"
            className="mt-10 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to News
          </a>
        </article>
      </section>

      <Footer />
    </main>
  );
}