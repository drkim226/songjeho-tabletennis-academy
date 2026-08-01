"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Album = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  cover_image: string | null;
  sort_order: number | null;
  active: boolean;
};

type GalleryImage = {
  id: number;
  category: string;
  album_id: number | null;
  title: string | null;
  description: string | null;
  src: string;
  sort_order: number | null;
  active: boolean;
  approved: boolean;
  visibility: string | null;
  created_at?: string;
};

const galleryCategories = [
  { value: "history", label: "Club Story & History" },
  { value: "tournament", label: "Tournament Gallery" },
];

export default function AdminGalleryPage() {
  const [checkingAccess, setCheckingAccess] = useState(true);

  // Main category and upload album
  const [category, setCategory] = useState("history");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  // New album form
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumSlug, setNewAlbumSlug] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");

  // Album editing
  const [editingAlbumId, setEditingAlbumId] = useState<number | null>(null);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumSlug, setAlbumSlug] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumSortOrder, setAlbumSortOrder] = useState(1);
  const [albumActive, setAlbumActive] = useState(true);

  // Upload form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [uploading, setUploading] = useState(false);

  // Existing image management
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSortOrder, setEditSortOrder] = useState(1);
  const [editActive, setEditActive] = useState(true);
  const [editApproved, setEditApproved] = useState(true);
  const [editVisibility, setEditVisibility] = useState("public");
  const [editAlbumId, setEditAlbumId] = useState("");

  const loadAlbums = useCallback(async () => {
    const { data, error } = await supabase
      .from("gallery_albums")
      .select(
        "id, title, slug, category, description, cover_image, sort_order, active"
      )
      .eq("category", "tournament")
      .order("sort_order", { ascending: true });

    if (error) {
      alert("Could not load albums: " + error.message);
      return;
    }

    setAlbums((data || []) as Album[]);
  }, []);

  const loadImages = useCallback(async () => {
    setLoadingImages(true);

    let query = supabase
      .from("gallery_images")
      .select(
        "id, category, album_id, title, description, src, sort_order, active, approved, visibility, created_at"
      )
      .eq("category", category)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (category === "tournament" && selectedAlbumId) {
      query = query.eq("album_id", Number(selectedAlbumId));
    }

    const { data, error } = await query;

    if (error) {
      alert("Could not load gallery images: " + error.message);
      setLoadingImages(false);
      return;
    }

    setImages((data || []) as GalleryImage[]);
    setLoadingImages(false);
  }, [category, selectedAlbumId]);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        window.location.href = "/admin";
        return;
      }

      const { data, error } = await supabase
        .from("members")
        .select("membership_type, role_approved")
        .eq("auth_user_id", user.id)
        .single();

      const allowedRoles = ["Admin", "Site Manager"];

      if (
        error ||
        !data ||
        !allowedRoles.includes(data.membership_type) ||
        !data.role_approved
      ) {
        alert("Access denied");
        window.location.href = "/members/profile";
        return;
      }

      await loadAlbums();
      setCheckingAccess(false);
    };

    void checkAccess();
  }, [loadAlbums]);

  useEffect(() => {
    if (!checkingAccess) {
      void loadImages();
    }
  }, [checkingAccess, loadImages]);

  const createAlbum = async () => {
    const cleanTitle = newAlbumTitle.trim();
    const cleanSlug = newAlbumSlug.trim();

    if (!cleanTitle || !cleanSlug) {
      alert("Album title and slug are required.");
      return;
    }

    const { data, error } = await supabase
      .from("gallery_albums")
      .insert([
        {
          title: cleanTitle,
          slug: cleanSlug,
          category: "tournament",
          description: newAlbumDescription.trim(),
          cover_image: "",
          sort_order: albums.length + 1,
          active: true,
        },
      ])
      .select(
        "id, title, slug, category, description, cover_image, sort_order, active"
      )
      .single();

    if (error) {
      alert("Album creation failed: " + error.message);
      return;
    }

    alert("Tournament album created!");

    const createdAlbum = data as Album;

    setAlbums((previous) => [...previous, createdAlbum]);
    setSelectedAlbumId(String(createdAlbum.id));

    setNewAlbumTitle("");
    setNewAlbumSlug("");
    setNewAlbumDescription("");
  };

  const startAlbumEdit = (album: Album) => {
    setEditingAlbumId(album.id);
    setAlbumTitle(album.title);
    setAlbumSlug(album.slug);
    setAlbumDescription(album.description || "");
    setAlbumSortOrder(album.sort_order || 1);
    setAlbumActive(album.active);
  };

  const cancelAlbumEdit = () => {
    setEditingAlbumId(null);
    setAlbumTitle("");
    setAlbumSlug("");
    setAlbumDescription("");
    setAlbumSortOrder(1);
    setAlbumActive(true);
  };

  const saveAlbumEdit = async () => {
    if (!editingAlbumId) return;

    if (!albumTitle.trim() || !albumSlug.trim()) {
      alert("Album title and slug are required.");
      return;
    }

    const { error } = await supabase
      .from("gallery_albums")
      .update({
        title: albumTitle.trim(),
        slug: albumSlug.trim(),
        description: albumDescription.trim(),
        sort_order: albumSortOrder,
        active: albumActive,
      })
      .eq("id", editingAlbumId);

    if (error) {
      alert("Album update failed: " + error.message);
      return;
    }

    alert("Album updated.");
    cancelAlbumEdit();
    await loadAlbums();
  };

  const deleteAlbum = async (album: Album) => {
    const relatedImages = images.filter(
      (image) => image.album_id === album.id
    ).length;

    const message =
      relatedImages > 0
        ? `This album currently has ${relatedImages} loaded photo(s). Delete the album? Photos should be deleted or moved first.`
        : `Delete album "${album.title}"?`;

    if (!window.confirm(message)) return;

    const { count, error: countError } = await supabase
      .from("gallery_images")
      .select("id", { count: "exact", head: true })
      .eq("album_id", album.id);

    if (countError) {
      alert("Could not check album photos: " + countError.message);
      return;
    }

    if ((count || 0) > 0) {
      alert(
        "This album still contains photos. Delete or move those photos before deleting the album."
      );
      return;
    }

    const { error } = await supabase
      .from("gallery_albums")
      .delete()
      .eq("id", album.id);

    if (error) {
      alert("Album deletion failed: " + error.message);
      return;
    }

    if (selectedAlbumId === String(album.id)) {
      setSelectedAlbumId("");
    }

    alert("Album deleted.");
    await loadAlbums();
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

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];

      const fileExtension = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${index}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

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

      const { data: publicUrlData } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(filePath);

      if (index === 0) {
        firstUploadedImageUrl = publicUrlData.publicUrl;
      }

      const imageTitle =
        files.length === 1 && title.trim()
          ? title.trim()
          : title.trim()
            ? `${title.trim()} ${index + 1}`
            : `Gallery Photo ${sortOrder + index}`;

      const { error: databaseError } = await supabase
        .from("gallery_images")
        .insert([
          {
            category,
            album_id: targetAlbumId,
            title: imageTitle,
            description: description.trim(),
            src: publicUrlData.publicUrl,
            sort_order: sortOrder + index,
            active: true,
            approved: true,
            visibility: "public",
          },
        ]);

      if (databaseError) {
        alert("DB save failed: " + databaseError.message);
        setUploading(false);
        return;
      }
    }

    if (
      category === "tournament" &&
      targetAlbumId &&
      firstUploadedImageUrl
    ) {
      const selectedAlbum = albums.find(
        (album) => album.id === targetAlbumId
      );

      if (selectedAlbum && !selectedAlbum.cover_image) {
        await supabase
          .from("gallery_albums")
          .update({ cover_image: firstUploadedImageUrl })
          .eq("id", targetAlbumId);
      }
    }

    setUploading(false);
    alert(`${files.length} image(s) uploaded!`);

    setTitle("");
    setDescription("");
    setSortOrder((previous) => previous + files.length);

    await loadAlbums();
    await loadImages();
  };

  const startImageEdit = (image: GalleryImage) => {
    setEditingImageId(image.id);
    setEditTitle(image.title || "");
    setEditDescription(image.description || "");
    setEditSortOrder(image.sort_order || 1);
    setEditActive(image.active);
    setEditApproved(image.approved);
    setEditVisibility(image.visibility || "public");
    setEditAlbumId(image.album_id ? String(image.album_id) : "");

    window.setTimeout(() => {
      document
        .getElementById("image-edit-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const cancelImageEdit = () => {
    setEditingImageId(null);
    setEditTitle("");
    setEditDescription("");
    setEditSortOrder(1);
    setEditActive(true);
    setEditApproved(true);
    setEditVisibility("public");
    setEditAlbumId("");
  };

  const saveImageEdit = async () => {
    if (!editingImageId) return;

    if (category === "tournament" && !editAlbumId) {
      alert("Tournament photos must belong to an album.");
      return;
    }

    const { error } = await supabase
      .from("gallery_images")
      .update({
        title: editTitle.trim(),
        description: editDescription.trim(),
        sort_order: editSortOrder,
        active: editActive,
        approved: editApproved,
        visibility: editVisibility,
        album_id:
          category === "tournament" ? Number(editAlbumId) : null,
      })
      .eq("id", editingImageId);

    if (error) {
      alert("Image update failed: " + error.message);
      return;
    }

    alert("Gallery image updated.");
    cancelImageEdit();
    await loadImages();
  };

  const extractStoragePath = (publicUrl: string) => {
    const marker = "/storage/v1/object/public/gallery-images/";
    const markerIndex = publicUrl.indexOf(marker);

    if (markerIndex === -1) {
      return null;
    }

    return decodeURIComponent(
      publicUrl.substring(markerIndex + marker.length)
    );
  };

  const deleteImage = async (image: GalleryImage) => {
    if (!window.confirm(`Delete "${image.title || "this image"}"?`)) {
      return;
    }

    const storagePath = extractStoragePath(image.src);

    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from("gallery-images")
        .remove([storagePath]);

      if (storageError) {
        const continueDeleting = window.confirm(
          `Storage deletion failed: ${storageError.message}\n\nDelete the database record anyway?`
        );

        if (!continueDeleting) return;
      }
    }

    const { error: databaseError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", image.id);

    if (databaseError) {
      alert("Image deletion failed: " + databaseError.message);
      return;
    }

    if (editingImageId === image.id) {
      cancelImageEdit();
    }

    alert("Gallery image deleted.");
    await loadImages();
    await loadAlbums();
  };

  const useAsAlbumCover = async (image: GalleryImage) => {
    if (!image.album_id) {
      alert("This image does not belong to a tournament album.");
      return;
    }

    const { error } = await supabase
      .from("gallery_albums")
      .update({ cover_image: image.src })
      .eq("id", image.album_id);

    if (error) {
      alert("Cover image update failed: " + error.message);
      return;
    }

    alert("Album cover image updated.");
    await loadAlbums();
  };

  if (checkingAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-xl font-bold">Checking permissions...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Admin Gallery
          </p>

          <h1 className="mb-3 text-4xl font-extrabold text-slate-900">
            Manage Gallery Images
          </h1>

          <p className="mb-8 text-slate-600">
            Upload new photos and edit, publish, hide, move, or delete existing
            gallery images.
          </p>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-bold text-sky-700">
                Gallery Section
              </label>

              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setSelectedAlbumId("");
                  cancelImageEdit();
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
                    onChange={(event) => {
                      setSelectedAlbumId(event.target.value);
                      cancelImageEdit();
                    }}
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                  >
                    <option value="">
                      All tournament albums / Select upload album
                    </option>

                    {albums
                      .filter((album) => album.active)
                      .map((album) => (
                        <option key={album.id} value={album.id}>
                          {album.title}
                        </option>
                      ))}
                  </select>

                  <p className="mt-2 text-sm text-slate-500">
                    Select an album before uploading tournament photos. Leave it
                    blank to view photos from all albums.
                  </p>
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
                      onChange={(event) =>
                        setNewAlbumTitle(event.target.value)
                      }
                    />

                    <input
                      className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                      placeholder="Slug, e.g. spring-tournament"
                      value={newAlbumSlug}
                      onChange={(event) =>
                        setNewAlbumSlug(event.target.value)
                      }
                    />

                    <textarea
                      className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                      placeholder="Album description"
                      value={newAlbumDescription}
                      onChange={(event) =>
                        setNewAlbumDescription(event.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={createAlbum}
                      className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                    >
                      Create Album
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-slate-200 pt-8">
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
                Upload New Images
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-bold text-sky-700">
                    Photo Title
                  </label>

                  <input
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                    placeholder="Optional title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
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
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-bold text-sky-700">
                    Starting Sort Order
                  </label>

                  <input
                    type="number"
                    min={1}
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                    value={sortOrder}
                    onChange={(event) =>
                      setSortOrder(Number(event.target.value))
                    }
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
                    disabled={
                      uploading ||
                      (category === "tournament" && !selectedAlbumId)
                    }
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4 disabled:bg-slate-100"
                    onChange={(event) => {
                      const files = Array.from(event.target.files || []);

                      if (files.length > 0) {
                        void uploadImages(files);
                      }

                      event.currentTarget.value = "";
                    }}
                  />

                  {category === "tournament" && !selectedAlbumId && (
                    <p className="mt-2 text-sm font-semibold text-orange-600">
                      Select a tournament album before uploading.
                    </p>
                  )}
                </div>

                {uploading && (
                  <p className="rounded-2xl bg-orange-50 p-4 font-bold text-orange-600">
                    Uploading images...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {category === "tournament" && (
          <section className="mt-10 rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="mb-6 text-3xl font-extrabold text-slate-900">
              Manage Tournament Albums
            </h2>

            {albums.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-6 text-slate-500">
                No tournament albums have been created.
              </p>
            ) : (
              <div className="space-y-5">
                {albums.map((album) => (
                  <article
                    key={album.id}
                    className="rounded-3xl border border-slate-200 p-6"
                  >
                    {editingAlbumId === album.id ? (
                      <div className="space-y-4">
                        <input
                          value={albumTitle}
                          onChange={(event) =>
                            setAlbumTitle(event.target.value)
                          }
                          placeholder="Album title"
                          className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                        />

                        <input
                          value={albumSlug}
                          onChange={(event) =>
                            setAlbumSlug(event.target.value)
                          }
                          placeholder="Album slug"
                          className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                        />

                        <textarea
                          value={albumDescription}
                          onChange={(event) =>
                            setAlbumDescription(event.target.value)
                          }
                          placeholder="Album description"
                          className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                        />

                        <input
                          type="number"
                          min={1}
                          value={albumSortOrder}
                          onChange={(event) =>
                            setAlbumSortOrder(Number(event.target.value))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-5 py-4"
                        />

                        <label className="flex items-center gap-3 font-bold text-slate-700">
                          <input
                            type="checkbox"
                            checked={albumActive}
                            onChange={(event) =>
                              setAlbumActive(event.target.checked)
                            }
                          />
                          Active album
                        </label>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={saveAlbumEdit}
                            className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                          >
                            Save Album
                          </button>

                          <button
                            type="button"
                            onClick={cancelAlbumEdit}
                            className="rounded-full bg-slate-200 px-6 py-3 font-bold text-slate-700 hover:bg-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5 md:flex-row">
                        <div className="h-32 w-full overflow-hidden rounded-2xl bg-slate-100 md:w-48">
                          {album.cover_image ? (
                            <img
                              src={album.cover_image}
                              alt={album.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                              No cover image
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-extrabold text-slate-900">
                                {album.title}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                /gallery/tournaments/{album.slug}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-4 py-2 text-sm font-bold ${
                                album.active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {album.active ? "Active" : "Hidden"}
                            </span>
                          </div>

                          <p className="mt-4 leading-7 text-slate-600">
                            {album.description || "No album description."}
                          </p>

                          <p className="mt-2 text-sm font-semibold text-slate-500">
                            Sort order: {album.sort_order || 0}
                          </p>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => startAlbumEdit(album)}
                              className="rounded-full bg-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-600"
                            >
                              Edit Album
                            </button>

                            <button
                              type="button"
                              onClick={() => void deleteAlbum(album)}
                              className="rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
                            >
                              Delete Album
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="mt-10 rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Existing Gallery Content
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Edit Existing Images
              </h2>
            </div>

            <button
              type="button"
              onClick={() => void loadImages()}
              className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
            >
              Refresh Images
            </button>
          </div>

          {editingImageId && (
            <div
              id="image-edit-form"
              className="mb-10 scroll-mt-8 rounded-3xl border-2 border-sky-200 bg-sky-50 p-7"
            >
              <h3 className="mb-5 text-2xl font-extrabold text-slate-900">
                Edit Selected Image
              </h3>

              <div className="space-y-4">
                <input
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  placeholder="Photo title"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4"
                />

                <textarea
                  value={editDescription}
                  onChange={(event) =>
                    setEditDescription(event.target.value)
                  }
                  placeholder="Photo description"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4"
                />

                <div>
                  <label className="mb-2 block font-bold text-slate-700">
                    Sort Order
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={editSortOrder}
                    onChange={(event) =>
                      setEditSortOrder(Number(event.target.value))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4"
                  />
                </div>

                {category === "tournament" && (
                  <div>
                    <label className="mb-2 block font-bold text-slate-700">
                      Tournament Album
                    </label>

                    <select
                      value={editAlbumId}
                      onChange={(event) =>
                        setEditAlbumId(event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4"
                    >
                      <option value="">Select album</option>

                      {albums.map((album) => (
                        <option key={album.id} value={album.id}>
                          {album.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="mb-2 block font-bold text-slate-700">
                    Visibility
                  </label>

                  <select
                    value={editVisibility}
                    onChange={(event) =>
                      setEditVisibility(event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4"
                  >
                    <option value="public">Public</option>
                    <option value="members">Members Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editActive}
                      onChange={(event) =>
                        setEditActive(event.target.checked)
                      }
                    />
                    Active
                  </label>

                  <label className="flex items-center gap-3 font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editApproved}
                      onChange={(event) =>
                        setEditApproved(event.target.checked)
                      }
                    />
                    Approved
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={saveImageEdit}
                    className="rounded-full bg-sky-600 px-7 py-3 font-bold text-white hover:bg-sky-700"
                  >
                    Save Image Changes
                  </button>

                  <button
                    type="button"
                    onClick={cancelImageEdit}
                    className="rounded-full bg-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {loadingImages ? (
            <p className="rounded-2xl bg-slate-50 p-6 text-center font-bold text-slate-500">
              Loading gallery images...
            </p>
          ) : images.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
              No images found in this section.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {images.map((image) => {
                const imageAlbum = albums.find(
                  (album) => album.id === image.album_id
                );

                return (
                  <article
                    key={image.id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
                  >
                    <img
                      src={image.src}
                      alt={image.title || "Gallery image"}
                      className="h-64 w-full object-cover"
                    />

                    <div className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900">
                            {image.title || "Untitled Photo"}
                          </h3>

                          {imageAlbum && (
                            <p className="mt-1 text-sm font-bold text-sky-700">
                              Album: {imageAlbum.title}
                            </p>
                          )}
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            image.active &&
                            image.approved &&
                            image.visibility === "public"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {image.active &&
                          image.approved &&
                          image.visibility === "public"
                            ? "Published"
                            : "Not Public"}
                        </span>
                      </div>

                      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-600">
                        {image.description || "No description."}
                      </p>

                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                        <p>
                          <strong>Sort:</strong> {image.sort_order || 0}
                        </p>
                        <p>
                          <strong>Active:</strong>{" "}
                          {image.active ? "Yes" : "No"}
                        </p>
                        <p>
                          <strong>Approved:</strong>{" "}
                          {image.approved ? "Yes" : "No"}
                        </p>
                        <p>
                          <strong>Visibility:</strong>{" "}
                          {image.visibility || "Not set"}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => startImageEdit(image)}
                          className="rounded-full bg-slate-700 px-5 py-2.5 font-bold text-white hover:bg-slate-600"
                        >
                          Edit
                        </button>

                        {image.category === "tournament" &&
                          image.album_id && (
                            <button
                              type="button"
                              onClick={() => void useAsAlbumCover(image)}
                              className="rounded-full bg-orange-500 px-5 py-2.5 font-bold text-white hover:bg-orange-600"
                            >
                              Set as Cover
                            </button>
                          )}

                        <button
                          type="button"
                          onClick={() => void deleteImage(image)}
                          className="rounded-full bg-red-600 px-5 py-2.5 font-bold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}