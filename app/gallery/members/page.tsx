import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MemberGalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Member Gallery
          </p>

          <h1 className="mb-6 text-5xl font-extrabold text-slate-900">
            Member Photo Sharing
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-600">
            This feature will allow members to upload and share club memories in
            the future. Member login, photo upload, and approval features will be
            added later with Supabase.
          </p>

          <div className="rounded-3xl bg-sky-50 p-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Coming Soon
            </h2>

            <p className="mt-4 text-slate-600">
              Future feature: member login, photo upload, and gallery approval.
            </p>
          </div>

          <a
            href="/#gallery"
            className="mt-10 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
          >
            Back to Gallery
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}