"use client";

import { useState } from "react";

type Photo = {
  id: number;
  title: string | null;
  src: string;
  description: string | null;
  sort_order?: number | null;
};

export default function PhotoMasonryGallery({ photos }: { photos: Photo[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto =
    selectedIndex !== null ? photos[selectedIndex] : null;

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
  if (selectedIndex === null) return;
  if (selectedIndex === 0) return;

  setSelectedIndex(selectedIndex - 1);
};

const showNext = () => {
  if (selectedIndex === null) return;
  if (selectedIndex === photos.length - 1) return;

  setSelectedIndex(selectedIndex + 1);
};

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={photo.src}
              alt={photo.title || "Gallery photo"}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6">
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-900 shadow-xl hover:bg-orange-400"
          >
            X
          </button>

          <button
            onClick={showPrevious}
            className="absolute left-6 top-1/2 z-[110] flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-4xl font-black text-slate-900 shadow-xl transition hover:scale-110 hover:bg-sky-500 hover:text-white"
          >
            ‹
          </button>

          <button
            onClick={showNext}
            className="absolute right-6 top-1/2 z-[110] flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-4xl font-black text-slate-900 shadow-xl transition hover:scale-110 hover:bg-sky-500 hover:text-white"
          >
            ›
          </button>

          <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title || "Selected gallery photo"}
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}