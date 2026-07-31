"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Coach = {
  id: string;
  name: string;
  korean_name: string | null;
  slug: string;
  role: string | null;
  specialty: string | null;
  style: string | null;
  image: string | null;
  experience: string[];
  elite_career: string[];
  recommended_for: string[];
  video_urls: string[];
  active: boolean;
  sort_order: number | null;
};

export default function AdminCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [koreanName, setKoreanName] = useState("");
  const [slug, setSlug] = useState("");
  const [role, setRole] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [style, setStyle] = useState("");
  const [experience, setExperience] = useState("");
  const [eliteCareer, setEliteCareer] = useState("");
  const [recommendedFor, setRecommendedFor] = useState("");
  const [video1, setVideo1] = useState("");
  const [video2, setVideo2] = useState("");
  const [video3, setVideo3] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadCoaches();
  }, []);

  const loadCoaches = async () => {
    const { data, error } = await supabase
      .from("coaches")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      alert("Could not load coaches: " + error.message);
      setLoading(false);
      return;
    }

    setCoaches(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setKoreanName("");
    setSlug("");
    setRole("");
    setSpecialty("");
    setStyle("");
    setExperience("");
    setEliteCareer("");
    setRecommendedFor("");
    setVideo1("");
    setVideo2("");
    setVideo3("");
    setImage("");
  };

  const uploadImage = async (file: File) => {
    setUploading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("coach-images")
      .upload(fileName, file);

    if (error) {
      alert("Image upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("coach-images")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);
    setUploading(false);
  };

  const saveCoach = async () => {
    if (!name.trim()) {
      alert("Coach name is required.");
      return;
    }

    if (!slug.trim()) {
      alert("Slug is required.");
      return;
    }

    const coachData = {
      name: name.trim(),
      korean_name: koreanName,
      slug: slug.trim(),
      role,
      specialty,
      style,
      image,
      experience: experience.split("\n").map((x) => x.trim()).filter(Boolean),
      elite_career: eliteCareer.split("\n").map((x) => x.trim()).filter(Boolean),
      recommended_for: recommendedFor
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      video_urls: [video1, video2, video3].map((x) => x.trim()).filter(Boolean),
    };

    if (editingId) {
      const { error } = await supabase
        .from("coaches")
        .update(coachData)
        .eq("id", editingId);

      if (error) {
        alert("Update failed: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("coaches").insert({
        ...coachData,
        active: true,
        sort_order: coaches.length + 1,
      });

      if (error) {
        alert("Create failed: " + error.message);
        return;
      }
    }

    resetForm();
    await loadCoaches();
  };

  const editCoach = (coach: Coach) => {
    setEditingId(coach.id);
    setName(coach.name || "");
    setKoreanName(coach.korean_name || "");
    setSlug(coach.slug || "");
    setRole(coach.role || "");
    setSpecialty(coach.specialty || "");
    setStyle(coach.style || "");
    setExperience((coach.experience || []).join("\n"));
    setEliteCareer((coach.elite_career || []).join("\n"));
    setRecommendedFor((coach.recommended_for || []).join("\n"));
    setVideo1(coach.video_urls?.[0] || "");
    setVideo2(coach.video_urls?.[1] || "");
    setVideo3(coach.video_urls?.[2] || "");
    setImage(coach.image || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = async (coach: Coach) => {
    const { error } = await supabase
      .from("coaches")
      .update({ active: !coach.active })
      .eq("id", coach.id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    await loadCoaches();
  };

  const deleteCoach = async (id: string) => {
    const ok = confirm("Delete this coach?");
    if (!ok) return;

    const { error } = await supabase.from("coaches").delete().eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    await loadCoaches();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <p>Loading coaches...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Admin Coaches
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Coach Management
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Create, edit, and manage coach profiles shown on the academy
            coaching page.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
            {editingId ? "Edit Coach" : "Create Coach"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Coach Name <span className="text-orange-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Coach name"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Korean Name
              </label>
              <input
                value={koreanName}
                onChange={(e) => setKoreanName(e.target.value)}
                placeholder="Korean name"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Slug <span className="text-orange-500">*</span>
              </label>
              <p className="mb-3 text-sm text-slate-500">
                Used for the web address. If unsure, use the coach name in
                lowercase with hyphens.
              </p>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Slug, e.g. song-jeho"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />
            </div>

<div className="mt-10 pt-2">
  <h3 className="text-xl font-bold text-slate-900">
    Coach Details
  </h3>

  <p className="mt-1 text-sm text-slate-500">
    Profile information displayed on the coach page.
  </p>
</div>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Specialty"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <textarea
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="Coach style / introduction"
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Coaching & Leadership - one line each"
              rows={5}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <textarea
              value={eliteCareer}
              onChange={(e) => setEliteCareer(e.target.value)}
              placeholder="Elite Career - one line each"
              rows={5}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <textarea
              value={recommendedFor}
              onChange={(e) => setRecommendedFor(e.target.value)}
              placeholder="Recommended For - one line each"
              rows={5}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={video1}
              onChange={(e) => setVideo1(e.target.value)}
              placeholder="Video URL 1"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={video2}
              onChange={(e) => setVideo2(e.target.value)}
              placeholder="Video URL 2"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={video3}
              onChange={(e) => setVideo3(e.target.value)}
              placeholder="Video URL 3"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <div>
              <label className="mb-2 block font-bold text-sky-700">
                Coach Image
              </label>

              <p className="mb-3 text-sm text-slate-500">
                Recommended: portrait image, 800 × 1000 px or larger.
              </p>

              <label className="block cursor-pointer rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-sky-500 hover:bg-sky-50">
                <span className="font-medium text-slate-700">
                  Click to select coach image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                  }}
                  className="hidden"
                />
              </label>

              {image && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={image}
                    alt="Coach preview"
                    className="max-h-[320px] max-w-full rounded-2xl object-contain"
                  />
                </div>
              )}
            </div>

            {uploading && (
              <p className="font-bold text-orange-500">Uploading image...</p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveCoach}
                disabled={uploading}
                className="rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700 disabled:bg-slate-400"
              >
                {editingId ? "Update Coach" : "Create Coach"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="rounded-full bg-slate-200 px-8 py-4 font-bold text-slate-700 hover:bg-slate-300"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {coaches.length === 0 && (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-xl">
              No coaches yet.
            </p>
          )}

          {coaches.map((coach) => (
            <div key={coach.id} className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {coach.name}
                  </h2>

                  {coach.korean_name && (
                    <p className="mt-1 font-bold text-slate-500">
                      {coach.korean_name}
                    </p>
                  )}

                  {coach.role && (
                    <p className="mt-3 font-bold text-sky-700">
                      {coach.role}
                    </p>
                  )}

                  {coach.specialty && (
                    <p className="mt-3 text-slate-600">
                      {coach.specialty}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    coach.active
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {coach.active ? "Published" : "Hidden"}
                </span>
              </div>

              {coach.image && (
                <div className="mt-5 flex justify-center rounded-2xl bg-white p-4">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="max-h-[180px] max-w-full object-contain"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => toggleActive(coach)}
                  className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                >
                  {coach.active ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => editCoach(coach)}
                  className="rounded-full bg-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCoach(coach.id)}
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}