import Link from "next/link";

const levels = [
  { label: "S", name: "Elite Class" },
  { label: "A", name: "Advanced" },
  { label: "B", name: "Competitive" },
  { label: "C", name: "Intermediate" },
  { label: "D", name: "Developing" },
  { label: "Beginner", name: "New Player" },
];

export default function RatingSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-orange-50 p-8 shadow-[0_20px_60px_rgba(14,165,233,0.08)] md:grid-cols-2 md:p-12">

        {/* Left */}
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            KTTAUSA Official Rating
          </p>

          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Get Your Official Table Tennis Level
          </h2>

          <p className="mb-8 text-lg leading-8 text-slate-600">
            Apply to receive your official S / A / B / C / D / Beginner rating
            certified by KTTAUSA.
          </p>

          <Link
            href="/rating"
            className="inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-sky-700"
          >
            Apply for Official Rating
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center">
          <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-3">

            {levels.map((level) => (
              <div
                key={level.label}
                className="
                  group
                  rounded-3xl
                  border
                  border-sky-100
                  bg-white
                  p-5
                  text-center
                  shadow-md
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-sky-300
                  hover:shadow-xl
                "
              >
                <div
                  className="
                  mx-auto mb-3
                  flex h-16 items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-sky-100
                  to-sky-50
                  px-3
                  text-lg
                  font-extrabold
                  text-sky-700
                  transition
                  group-hover:from-sky-500
                  group-hover:to-sky-600
                  group-hover:text-white
                "
                >
                  {level.label}
                </div>

                <p
                  className="
                  text-sm
                  font-semibold
                  tracking-wide
                  text-slate-500
                  transition
                  group-hover:text-slate-900
                "
                >
                  {level.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}