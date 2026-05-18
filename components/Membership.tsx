export default function Membership() {
  return (
    <section id="membership" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Membership & Lessons
          </p>

          <h3 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Flexible Options
            <br />
            For Every Player
          </h3>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Choose daily play, monthly membership, private lessons, or a popular
            membership plus lesson package.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-6 inline-block rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
              Daily Pass
            </div>

            <h4 className="text-3xl font-extrabold text-slate-900">$17</h4>

            <p className="mt-3 text-slate-600">
              Up to 2 hours of open play access.
            </p>

            <ul className="mt-8 space-y-3 text-slate-700">
              <li>• Open play access</li>
              <li>• Beginner friendly</li>
              <li>• Community atmosphere</li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-6 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
              Membership
            </div>

            <h4 className="text-3xl font-extrabold text-slate-900">
              $120 / month
            </h4>

            <p className="mt-3 text-slate-600">
              Regular membership for frequent players.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <p className="font-semibold text-slate-700">3 Months — $300</p>
              <p className="mt-2 font-semibold text-slate-700">
                6 Months — $550
              </p>
            </div>

            <ul className="mt-8 space-y-3 text-slate-700">
              <li>• Regular practice access</li>
              <li>• Friendly club environment</li>
              <li>• Suitable for all skill levels</li>
            </ul>
          </div>

          <div className="relative rounded-[2rem] bg-white p-8 shadow-xl ring-2 ring-orange-300 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute -top-4 left-8 rounded-full bg-orange-400 px-5 py-2 text-sm font-extrabold text-white shadow-lg">
              Popular
            </div>

            <div className="mb-6 mt-3 inline-block rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">
              Membership + Lesson
            </div>

            <h4 className="text-3xl font-extrabold text-slate-900">
              $260
            </h4>

            <p className="mt-3 text-slate-600">
              Membership with lesson sessions included.
            </p>

            <div className="mt-6 space-y-3 rounded-2xl bg-orange-50 p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  4 Sessions
                </span>
                <span className="font-bold text-slate-900">$260</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  8 Sessions
                </span>
                <span className="font-bold text-slate-900">$400</span>
              </div>
            </div>

            <ul className="mt-8 space-y-3 text-slate-700">
              <li>• Recommended for regular learners</li>
              <li>• Membership plus coaching</li>
              <li>• Great value for improvement</li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-6 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
              Lesson Only
            </div>

            <h4 className="text-3xl font-extrabold text-slate-900">
              30 Minutes
            </h4>

            <p className="mt-3 text-slate-600">
              Private coaching sessions without membership package.
            </p>

            <div className="mt-6 space-y-3 rounded-2xl bg-slate-100 p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">1 Session</span>
                <span className="font-bold text-slate-900">$60</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">4 Sessions</span>
                <span className="font-bold text-slate-900">$180</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">8 Sessions</span>
                <span className="font-bold text-slate-900">$350</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">16 Sessions</span>
                <span className="font-bold text-slate-900">$650</span>
              </div>
            </div>

            <a
              href="#coaching"
              className="mt-8 inline-block rounded-full bg-sky-600 px-6 py-3 font-bold text-white transition hover:bg-sky-700"
            >
              Meet Our Coaches
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}