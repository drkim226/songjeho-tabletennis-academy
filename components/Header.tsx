"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="/"
          className="text-2xl font-black text-slate-900 transition hover:text-sky-600"
        >
          Song Jeho Table Tennis Academy
        </a>

        <nav className="hidden gap-8 text-sm font-semibold text-slate-700 md:flex">
          <a href="/#about" className="hover:text-sky-600">
            About
          </a>

          <a href="/#coaching" className="hover:text-sky-600">
            Coaching
          </a>

          <a href="/#gallery" className="hover:text-sky-600">
            Gallery
          </a>

         <a href="/#news" className="hover:text-sky-600">
  News
</a>
          <a href="/sponsors" className="hover:text-sky-600">
            Partners
          </a>

          <a href="/#contact" className="hover:text-sky-600">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}