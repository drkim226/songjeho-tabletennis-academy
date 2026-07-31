"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

       <Link
  href="/"
  prefetch={true}
  className="text-2xl font-black text-slate-900 transition hover:text-sky-600"
>
  Song Jeho Table Tennis Academy
</Link>

        <nav className="hidden gap-8 text-sm font-semibold text-slate-700 md:flex">

          <Link href="/#about" className="hover:text-sky-600">
            About
          </Link>

          <Link href="/#coaching" className="hover:text-sky-600">
            Coaching
          </Link>

          <Link href="/#gallery" className="hover:text-sky-600">
            Gallery
          </Link>

          <Link href="/#news" className="hover:text-sky-600">
            News
          </Link>

          <Link href="/sponsors" className="hover:text-sky-600">
            Partners
          </Link>

          <Link href="/#contact" className="hover:text-sky-600">
            Contact
          </Link>

        </nav>
      </div>
    </header>
  );
}