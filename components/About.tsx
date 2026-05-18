import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src="/images/about_wel.jpg"
            alt="Song Jeho Table Tennis Academy"
            width={900}
            height={700}
            className="h-[420px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/20 p-5 text-white backdrop-blur-md">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-200">
              Welcome
            </p>
            <h3 className="mt-2 text-2xl font-extrabold">
              A Place to Train, Play, and Grow
            </h3>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            About Our Academy
          </p>

          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Friendly Community,
            <br />
            Professional Coaching,
            <br />
            Better Table Tennis.
          </h2>

          <p className="mb-6 text-lg leading-8 text-slate-600">
            Song Jeho Table Tennis Academy is a welcoming place for beginners,
            recreational players, senior players, and competitive athletes.
            Members can enjoy open play, private coaching, and a strong
            Korean-American table tennis community.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <a
  href="#coaching"
  className="block rounded-3xl bg-sky-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  <h4 className="text-xl font-bold text-sky-700">Coaching</h4>

  <p className="mt-2 text-sm text-slate-600">
    Elite-style training for all levels.
  </p>
</a>

            <a
  href="#gallery"
  className="block rounded-3xl bg-orange-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  <h4 className="text-xl font-bold text-orange-600">Community</h4>

  <p className="mt-2 text-sm text-slate-600">
    Friendly members and club culture.
  </p>
</a>

            <a
  href="#membership"
  className="block rounded-3xl bg-slate-100 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  <h4 className="text-xl font-bold text-slate-800">Play</h4>

  <p className="mt-2 text-sm text-slate-600">
    Practice, matches, and tournaments.
  </p>
</a>
          </div>
        </div>
      </div>
    </section>
  );
}