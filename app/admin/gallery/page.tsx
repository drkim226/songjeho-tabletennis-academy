"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Album = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
};

const galleryCategories = [
  { value: "history", label: "Club Story & History" },
  { value: "tournament", label: "Tournament Gallery" },
];

export default function AdminGalleryPage() {
  const [category, setCategory] = useState("history");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumSlug, setNewAlbumSlug] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    const { data, error } = await supabase
      .from("gallery_albums")
      .select("id, title, slug, description, cover_image")
      .eq("category", "tournament")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      alert("Could not load albums: " + error.message);
      return;
    }

    setAlbums(data || []);
  };

  const createAlbum = async () => {
    if (!newAlbumTitle || !newAlbumSlug) {
      alert("Album title and slug are required.");
      return;
    }

    const { data, error } = await supabase
      .from("gallery_albums")
      .insert([
        {
          title: newAlbumTitle,
          slug: newAlbumSlug,
          category: "tournament",
          description: newAlbumDescription,
          cover_image: "",
          sort_order: albums.length + 1,
          active: true,
        },
      ])
      .select("id, title, slug, description, cover_image")
      .single();

    if (error) {
      alert("Album creation failed: " + error.message);
      return;
    }

    alert("Tournament album created!");

    setAlbums((prev) => [...prev, data]);
    setSelectedAlbumId(String(data.id));

    setNewAlbumTitle("");
    setNewAlbumSlug("");
    setNewAlbumDescription("");
  };

  const uploadImages = async (files: File[]) => {
    if (category === "tournament" && !selectedAlbumId) {
      alert("Please select a tournament album first.");
      return;
    }

    const targetAlbumId =
      category === "tournament" ? Number(selectedAlbumId) : null;

    setUploading(true);

    let firstUploadedImageUrl = "";

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${i}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const folder =
        category === "tournament"
          ? `tournament/${targetAlbumId}`
          : "history";

      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, file);

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(filePath);

      if (i === 0) {
        firstUploadedImageUrl = data.publicUrl;
      }

      const { error: dbError } = await supabase.from("gallery_images").insert([
        {
          category,
          album_id: targetAlbumId,
          title: title || `Gallery Photo ${sortOrder + i}`,
          description,
          src: data.publicUrl,
          sort_order: sortOrder + i,
          active: true,
          approved: true,
          visibility: "public",
        },
      ]);

      if (dbError) {
        alert("DB save failed: " + dbError.message);
        setUploading(false);
        return;
      }
    }

    if (category === "tournament" && targetAlbumId && firstUploadedImageUrl) {
      const selectedAlbum = albums.find((album) => album.id === targetAlbumId);

      if (selectedAlbum && !selectedAlbum.cover_image) {
        await supabase
          .from("gallery_albums")
          .update({ cover_image: firstUploadedImageUrl })
          .eq("id", targetAlbumId);

        setAlbums((prev) =>
          prev.map((album) =>
            album.id === targetAlbumId
              ? { ...album, cover_image: firstUploadedImageUrl }
              : album
          )
        );
      }
    }

    setUploading(false);
    alert(`${files.length} image(s) uploaded!`);

    setTitle("");
    setDescription("");
    setSortOrder(sortOrder + files.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20 text-slate-800">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Admin Gallery Upload
        </p>

        <h1 className="mb-8 text-4xl font-extrabold text-slate-900">
          Manage Gallery Images
        </h1>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-bold text-sky-700">
              Gallery Section
            </label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedAlbumId("");
              }}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            >
              {galleryCategories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {category === "tournament" && (
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
                Tournament Album
              </h2>

              <div className="mb-6">
                <label className="mb-2 block font-bold text-sky-700">
                  Select Existing Album
                </label>

                <select
                  value={selectedAlbumId}
                  onChange={(e) => setSelectedAlbumId(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                >
                  <option value="">Select tournament album</option>

                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  Create New Tournament Album
                </h3>

                <div className="space-y-4">
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                    placeholder="Album title, e.g. 2026 Spring Tournament"
                    value={newAlbumTitle}
                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                  />

                  <input
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                    placeholder="Slug, e.g. spring-tournament"
                    value={newAlbumSlug}
                    onChange={(e) => setNewAlbumSlug(e.target.value)}
                  />

                  <textarea
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                    placeholder="Album description"
                    value={newAlbumDescription}
                    onChange={(e) => setNewAlbumDescription(e.target.value)}
                  />

                  <button
                    onClick={createAlbum}
                    className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                  >
                    Create Album
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block font-bold text-sky-700">
              Photo Title
            </label>

            <input
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              placeholder="Optional title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-sky-700">
              Description
            </label>

            <textarea
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-sky-700">
              Starting Sort Order
            </label>

            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-sky-700">
              Image Files
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) uploadImages(files);
              }}
            />
          </div>

          {uploading && (
            <p className="rounded-2xl bg-orange-50 p-4 font-bold text-orange-600">
              Uploading images...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}