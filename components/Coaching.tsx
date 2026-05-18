export default function Coaching() {
  const coaches = [
    {
      name: "Jay Song",
      koreanName: "송제호",
      role: "Founder & Head Coach",
      specialty: "Elite Korean training system, fundamentals, footwork",
      href: "/coaches/song-jeho",
      image: "/images/coaches/song-jeho.jpg",
    },
    {
      name: "Young Moon Jeon",
      koreanName: "전영문",
      role: "Former President & Senior Advisor",
      specialty: "National team experience, leadership, and mentorship",
      href: "/coaches/young-moon-jeon",
      image: "/images/coaches/young-moon-jeon.jpg",
    },
    {
      name: "Myung Sun Lee",
      koreanName: "이명선",
      role: "Senior Advisor & Coach",
      specialty: "Elite experience, club leadership, tournament guidance",
      href: "/coaches/myung-sun-lee",
      image: "/images/coaches/myung-sun-lee.png",
    },
    {
      name: "Joseph Bae",
      koreanName: "배성환",
      role: "Senior Coach",
      specialty: "Youth training, senior classes, private coaching",
      href: "/coaches/joseph-bae",
      image: "/images/coaches/joseph-bae.jpg",
    },
    
    {
      name: "Coach 5",
      koreanName: "",
      role: "Assistant Coach",
      specialty: "Beginner support, practice drills, and player development",
      href: "/coaches/coach-5",
      image: "/images/coaches/coach-5.png",
    },
  ];

  return (
    <section id="coaching" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Coaching Program
          </p>

          <h3 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Private Lessons & Elite Coaching
          </h3>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Song Jeho Table Tennis Academy offers private coaching with experienced
            Korean elite players and senior coaches. Lesson sessions may be added
            to membership plans.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="group overflow-hidden rounded-3xl bg-slate-50 shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="h-40 overflow-hidden bg-slate-200">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h5 className="text-xl font-bold text-slate-900">
                  {coach.name}
                </h5>

                {coach.koreanName && (
                  <p className="mt-1 text-base font-bold text-slate-500">
                    {coach.koreanName}
                  </p>
                )}

                <p className="mt-2 text-sm font-semibold text-sky-700">
                  {coach.role}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {coach.specialty}
                </p>

                <a
                  href={coach.href}
                  className="mt-5 inline-block font-bold text-sky-700 transition hover:text-orange-500"
                >
                  View Profile →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}