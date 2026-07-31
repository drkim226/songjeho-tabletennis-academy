"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Sponsor = {
  id: string;
  created_at: string;
  name: string;
  tagline: string | null;
  description: string | null;
  offer: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  logo_image: string | null;
  featured: boolean;
  active: boolean;
  sort_order: number | null;
};

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      alert("Could not load sponsors: " + error.message);
      setLoading(false);
      return;
    }

    setSponsors(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setTagline("");
    setDescription("");
    setOffer("");
    setPhone("");
    setEmail("");
    setWebsite("");
    setAddress("");
    setLogoImage("");
    setFeatured(false);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `main/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("sponsor-images")
      .upload(filePath, file);

    if (uploadError) {
      alert("Image upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("sponsor-images")
      .getPublicUrl(filePath);

    setLogoImage(data.publicUrl);
    setUploading(false);
  };

  const saveSponsor = async () => {
    if (!name.trim()) {
      alert("Partner name is required.");
      return;
    }

    const sponsorData = {
      name: name.trim(),
      tagline,
      description,
      offer,
      phone,
      email,
      website,
      address,
      logo_image: logoImage,
      featured,
    };

    if (editingId) {
      const { error } = await supabase
        .from("sponsors")
        .update(sponsorData)
        .eq("id", editingId);

      if (error) {
        alert("Update failed: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("sponsors").insert({
        ...sponsorData,
        active: true,
        sort_order: sponsors.length + 1,
      });

      if (error) {
        alert("Create failed: " + error.message);
        return;
      }
    }

    resetForm();
    await loadSponsors();
  };

  const startEdit = (sponsor: Sponsor) => {
    setEditingId(sponsor.id);
    setName(sponsor.name || "");
    setTagline(sponsor.tagline || "");
    setDescription(sponsor.description || "");
    setOffer(sponsor.offer || "");
    setPhone(sponsor.phone || "");
    setEmail(sponsor.email || "");
    setWebsite(sponsor.website || "");
    setAddress(sponsor.address || "");
    setLogoImage(sponsor.logo_image || "");
    setFeatured(sponsor.featured || false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = async (sponsor: Sponsor) => {
    const { error } = await supabase
      .from("sponsors")
      .update({ active: !sponsor.active })
      .eq("id", sponsor.id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    await loadSponsors();
  };

  const toggleFeatured = async (sponsor: Sponsor) => {
    const { error } = await supabase
      .from("sponsors")
      .update({ featured: !sponsor.featured })
      .eq("id", sponsor.id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    await loadSponsors();
  };

  const deleteSponsor = async (id: string) => {
    const ok = confirm("Delete this partner?");
    if (!ok) return;

    const { error } = await supabase.from("sponsors").delete().eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    await loadSponsors();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <p>Loading sponsors...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Admin Partners
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Partner Management
          </h1>

          <p className="mt-4 text-slate-600">
            Create and manage community partners shown on the Partners page.
          </p>
        </div>

        <div className="mb-12 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
            {editingId ? "Edit Partner" : "Create Partner"}
          </h2>

          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Partner name"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short tagline"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Partner Introduction"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website URL"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <div>
              <label className="mb-2 block font-bold text-sky-700">
                Main Image
              </label>

             

              <label className="block cursor-pointer rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-sky-500 hover:bg-sky-50">
                <span className="font-medium text-slate-700">
                  Click to select main image
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

              {logoImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={logoImage}
                    alt="Main image preview"
                    className="max-h-[260px] max-w-full rounded-2xl object-contain"
                  />
                </div>
              )}
            </div>

            {uploading && (
              <p className="font-bold text-orange-500">Uploading image...</p>
            )}

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 hover:bg-sky-50">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span className="font-bold text-slate-700">
                Featured Partner
              </span>
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveSponsor}
                disabled={uploading}
                className="rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700 disabled:bg-slate-400"
              >
                {editingId ? "Update Sponsor" : "Create Partner"}
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
          {sponsors.length === 0 && (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-xl">
              No partners yet.
            </p>
          )}

          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {sponsor.name}
                  </h2>

                  {sponsor.tagline && (
                    <p className="mt-3 font-bold text-sky-700">
                      {sponsor.tagline}
                    </p>
                  )}

                  {sponsor.description && (
                    <p className="mt-3 text-slate-600">
                      {sponsor.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      sponsor.active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {sponsor.active ? "Published" : "Hidden"}
                  </span>

                  {sponsor.featured && (
                    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {sponsor.logo_image && (
                <div className="mt-5 flex justify-center rounded-2xl bg-white p-4">
                  <img
                    src={sponsor.logo_image}
                    alt={sponsor.name}
                    className="max-h-[180px] max-w-full object-contain"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => toggleActive(sponsor)}
                  className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                >
                  {sponsor.active ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => toggleFeatured(sponsor)}
                  className="rounded-full bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-800"
                >
                  {sponsor.featured ? "Remove Featured" : "Make Featured"}
                </button>

                <button
                  onClick={() => startEdit(sponsor)}
                  className="rounded-full bg-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSponsor(sponsor.id)}
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