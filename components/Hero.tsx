import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/club-main2.jpg"
        alt="Song Jeho Table Tennis Club"
        fill
        priority
        className="hero-zoom object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/90 via-sky-800/60 to-sky-500/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-white/10" />

      <div className="float-soft absolute left-10 top-28 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="float-soft absolute bottom-20 right-10 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl" />

      <div className="pingpong-fly absolute right-16 top-36 z-20">
  <img
    src="/images/nittaku-ball.png"
    alt="Ping Pong Ball"
    className="h-20 w-20 drop-shadow-2xl"
  />
</div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24">
        <div className="float-soft max-w-3xl rounded-[2rem] bg-white/15 p-8 text-white shadow-2xl backdrop-blur-md md:p-12">

          <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-orange-300">
            Friendly • Competitive • Community
          </p>

          <h2 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
            Play Better.
            <br />
            Train Smarter.
            <br />
            Enjoy Together.
          </h2>

          <p className="mb-8 max-w-2xl text-lg leading-8 text-sky-50 md:text-xl">
            A bright and welcoming table tennis community where players train,
            compete, and grow together.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">

            <a
              href="#membership"
              className="rounded-full bg-orange-400 px-8 py-4 text-center font-extrabold text-slate-900 shadow-lg transition duration-300 hover:scale-105 hover:bg-orange-300 hover:shadow-2xl"
            >
              Join Membership
            </a>

            <a
              href="#schedule"
              className="rounded-full border border-white/50 bg-white/10 px-8 py-4 text-center font-extrabold text-white transition duration-300 hover:scale-105 hover:bg-white hover:text-slate-900 hover:shadow-2xl"
            >
              View Schedule
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}