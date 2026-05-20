"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [memberId, setMemberId] = useState<number | null>(null);
  const [authUserId, setAuthUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/members/login");
      return;
    }

    setAuthUserId(user.id);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    if (error) {
      alert("Could not load profile.");
      return;
    }

    setMemberId(data.id);
    setFullName(data.full_name || "");
    setPhone(data.phone || "");
    setSkillLevel(data.skill_level || "beginner");
    setAvatarUrl(data.avatar_url || "");
    setLoading(false);
  };

  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `${authUserId}/avatar.${fileExt}`;

    const { error } = await supabase.storage
      .from("member-avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
      return;
    }

    const { data } = supabase.storage
      .from("member-avatars")
      .getPublicUrl(filePath);

    setAvatarUrl(data.publicUrl);
  };

  const saveProfile = async () => {
    if (!memberId) return;

    setSaving(true);

    const { error } = await supabase
      .from("members")
      .update({
        full_name: fullName,
        phone,
        skill_level: skillLevel,
        avatar_url: avatarUrl,
      })
      .eq("id", memberId);

    setSaving(false);

    if (error) {
      alert("Save failed: " + error.message);
      return;
    }

    alert("Profile updated!");
    router.push("/members/profile");
  };

  if (loading) {
    return <main className="p-10">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20 text-slate-800">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="mb-8 text-4xl font-extrabold text-slate-900">
          Edit Profile
        </h1>

        <div className="mb-8">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="mb-4 h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-slate-200 text-slate-500">
              No Photo
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAvatar(file);
            }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-bold text-sky-600">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-sky-600">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-sky-600">
              Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4"
            >
              <option value="S">S Level</option>
              <option value="A">A Level</option>
              <option value="B">B Level</option>
              <option value="C">C Level</option>
              <option value="D">D Level</option>
              <option value="beginner">Beginner</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </main>
  );
}