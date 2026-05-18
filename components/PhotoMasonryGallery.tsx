"use client";

import { useState } from "react";

type Photo = {
  id: number;
  title: string;
  src: string;
  description: string;
};

export default function PhotoMasonryGallery({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="h-48 overflow-hidden rounded-3xl bg-slate-200 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 z-[110] rounded-full bg-white px-4 py-2 font-bold text-black hover:bg-red-500 hover:text-white"
          >
            X
          </button>

          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="max-h-[88vh] max-w-[92vw] rounded-3xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}