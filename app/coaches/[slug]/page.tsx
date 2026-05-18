import Header from "@/components/Header";
import Footer from "@/components/Footer";

const coachData = {
  "song-jeho": {
    name: "Jay Song",
    koreanName: "송제호",
    role: "Founder & Head Coach",
    image: "/images/coaches/song-jeho.jpg",
    specialty:
      "Elite Korean training system, fundamentals, footwork, and match strategy",
    style:
      "Coach Song combines the structured Korean elite training system with practical coaching methods for beginners, hobby players, and advanced competitors.",
    experience: [
      "Founder and Head Coach of Song Jeho Table Tennis Academy in Los Angeles",
      "Former President of the LA Chapter of the Korean American Table Tennis Association",
      "Certified USA National Coach",
      "Operates a professional table tennis training center on Olympic Blvd in Los Angeles",
      "Built a coaching system connected with former Korean national and elite players",
      "Provides customized training for beginners, hobby players, and advanced competitors",
    ],
    eliteCareer: [
      "Former elite Korean corporate table tennis player",
      "Played for Cheil Synthetic Fiber Table Tennis Team under Samsung Group",
      "Trained through the traditional Korean elite athlete development system",
      "Has contributed to the Korean-American table tennis community in Los Angeles",
    ],
    recommendedFor: [
      "Beginners who want strong fundamentals",
      "Intermediate players seeking consistency",
      "Advanced hobby players preparing for tournaments",
      "Players interested in Korean-style elite training",
    ],
  },

  "young-moon-jeon": {
    name: "Young Moon Jeon",
    koreanName: "전영문",
    role: "Former President & Senior Advisor",
    image: "/images/coaches/young-moon-jeon.jpg",
    specialty:
      "Korean national team experience, community leadership, and senior mentorship",
    style:
      "Coach Jeon is one of the respected senior leaders in the Korean-American table tennis community. With experience as a former Korean national representative and former President of the Korean American Table Tennis Association, he continues to support the development and unity of Korean-American table tennis in the United States.",
    experience: [
      "Former President of the Korean American Table Tennis Association",
      "Led Korean-American table tennis development and community activities throughout the United States",
      "Supported Southern California and LA regional tournaments and Korean National Sports Festival events",
      "Continued competing in senior events and won senior doubles titles in local Korean-American tournaments",
      "Attended major Korean-American tournaments and events as an honored guest and advisor",
      "Serves as a respected senior mentor within the Korean-American table tennis community",
    ],
    eliteCareer: [
      "Former Korean national table tennis team player",
      "Represented Korea in major Asian international competitions around 1964",
      "Played alongside legendary early Korean table tennis figures",
      "Competed during the foundational era of Korean table tennis before Jangchung Gymnasium was built",
      "Recognized as part of Korea’s early elite national representative generation",
    ],
    recommendedFor: [
      "Players interested in traditional Korean table tennis history",
      "Senior players",
      "Members seeking tournament experience and guidance",
      "Players who value discipline, sportsmanship, and community leadership",
    ],
  },

  "joseph-bae": {
    name: "Joseph Bae",
    koreanName: "배성환",
    role: "Senior Coach",
    image: "/images/coaches/joseph-bae.jpg",
    specialty:
      "Youth development, senior classes, private coaching, and tournament operation",
    style:
      "Coach Bae brings elite Korean player experience and strong leadership in Southern California table tennis. His coaching is well suited for juniors, seniors, and club players who want structured private lessons.",
    experience: [
      "Former President of the LA Korean Table Tennis Association",
      "Former Head Coach and owner of Bae Table Tennis Club in Santa Ana, Orange County",
      "USATT licensed coach with official tournament hosting qualification",
      "Designed and operated a dedicated table tennis facility of approximately 5,000 square feet in Santa Ana in 2011",
      "Organized major local events including Korean senior table tennis tournaments in Southern California",
      "Provided customized private lessons for juniors, seniors, and recreational club players",
    ],
    eliteCareer: [
      "Former Korean youth national team and elite player",
      "Competed as an elite player during middle school, high school, and youth representative years",
      "Developed international experience and orthodox elite-level techniques as a youth national representative",
      "Known for building strong table tennis infrastructure and systematic coaching in the United States",
    ],
    recommendedFor: [
      "Junior players",
      "Senior players",
      "Players who want structured private coaching",
      "Club members who want to improve fundamentals and match skills",
    ],
  },

  "myung-sun-lee": {
    name: "Myung Sun Lee",
    koreanName: "이명선",
    role: "Senior Advisor & Coach",
    image: "/images/coaches/myung-sun-lee.png",
    specialty:
      "Elite playing experience, club leadership, tournament support, and player guidance",
    style:
      "Coach Lee is a respected senior figure in the Korean-American table tennis community. He brings deep elite playing experience from Korea’s early table tennis era and continues to support club development and local table tennis activities.",
    experience: [
      "Vice President of the Los Angeles Korean Table Tennis Association",
      "Supports the growth of Korean-American table tennis in the LA area",
      "Helps organize regular meetings and local tournaments centered around Song Jeho Table Tennis Academy",
      "Supports LA regional team selection and preparation for Korean-American national sports events",
      "Serves as a bridge between senior players, coaches, and younger generations",
    ],
    eliteCareer: [
      "Former Korean youth national representative and elite player",
      "Active during the late 1960s to early 1970s",
      "Represented Korea in the 9th Asian Table Tennis Championships junior division",
      "Won 3rd place in junior boys singles at the Asian Table Tennis Championships",
      "Won 3rd place in the men’s team event at the same tournament era",
      "Played during the foundational period of Korean table tennis alongside legendary Korean players",
    ],
    recommendedFor: [
      "Players interested in traditional Korean elite table tennis",
      "Senior club members",
      "Players seeking match experience and tournament guidance",
      "Members who value history, discipline, and community leadership",
    ],
  },

  "coach-5": {
    name: "Coach 5",
    koreanName: "",
    role: "Assistant Coach",
    image: "/images/coaches/coach-5.png",
    specialty: "Beginner support, practice drills, and player development",
    style:
      "This coach supports players with practical drills, basic technique improvement, and consistent practice habits.",
    experience: [
      "Beginner and intermediate player support",
      "Practice drill guidance",
      "Basic technique and consistency training",
    ],
    eliteCareer: ["Detailed playing and coaching background will be added later."],
    recommendedFor: [
      "Beginners",
      "Practice-focused players",
      "Members who want regular technical feedback",
    ],
  },
};

export default async function CoachProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const coach = coachData[slug as keyof typeof coachData];

  if (!coach) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-800">
        <Header />

        <section className="px-6 pb-24 pt-32">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold text-slate-900">
              Coach not found
            </h1>

            <a
              href="/#coaching"
              className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Back to Coaching
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
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl h-fit">
            <img
              src={coach.image}
              alt={coach.name}
              className="h-[420px] w-full rounded-3xl object-cover"
            />
          </div>

          <article className="rounded-3xl bg-white p-10 shadow-xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              {coach.role}
            </p>

            <h1 className="text-5xl font-extrabold text-slate-900">
              {coach.name}
            </h1>

            {coach.koreanName && (
              <p className="mt-2 text-2xl font-bold text-slate-500">
                {coach.koreanName}
              </p>
            )}

            <p className="mb-8 mt-6 text-xl font-semibold text-sky-700">
              {coach.specialty}
            </p>

            <p className="mb-8 text-lg leading-8 text-slate-700">
              {coach.style}
            </p>

            <a
              href="/#contact"
              className="inline-block rounded-full bg-orange-400 px-8 py-4 font-extrabold text-slate-900 shadow-lg hover:bg-orange-300"
            >
              Ask About Lessons
            </a>
          </article>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <h2 className="mb-6 text-3xl font-extrabold text-slate-900">
              Coaching & Leadership
            </h2>

            <ul className="space-y-4 text-lg text-slate-700">
              {coach.experience.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <h2 className="mb-6 text-3xl font-extrabold text-slate-900">
              Elite Career
            </h2>

            <ul className="space-y-4 text-lg text-slate-700">
              {coach.eliteCareer.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <h2 className="mb-6 text-3xl font-extrabold text-slate-900">
              Recommended For
            </h2>

            <ul className="space-y-4 text-lg text-slate-700">
              {coach.recommendedFor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <a
            href="/#coaching"
            className="inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to Coaching
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}