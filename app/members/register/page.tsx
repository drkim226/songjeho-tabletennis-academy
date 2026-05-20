"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const membershipTypes = [
  { value: "not_member", label: "Not a Member Yet" },
  { value: "regular", label: "Regular Member" },
  { value: "coach", label: "Coach" },
  { value: "sponsor", label: "Sponsor" },
  { value: "admin", label: "Admin" },
];

const skillLevels = [
  { value: "S", label: "S Level" },
  { value: "A", label: "A Level" },
  { value: "B", label: "B Level" },
  { value: "C", label: "C Level" },
  { value: "D", label: "D Level" },
  { value: "beginner", label: "Beginner" },
  { value: "senior", label: "Senior" },
];

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    membership_type: "not_member",
    skill_level: "beginner",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const needsApproval = ["coach", "sponsor", "admin"].includes(
    formData.membership_type
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name,
          phone: formData.phone,
          membership_type: formData.membership_type,
          skill_level: formData.skill_level,
        },
      },
    });

    if (authError) {
      setLoading(false);
      alert("Auth Error: " + authError.message);
      return;
    }

    const userId = authData.user?.id;

    const { error: dbError } = await supabase.from("members").insert([
      {
        auth_user_id: userId,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        membership_type: formData.membership_type,
        role_approved:
  formData.membership_type === "not_member"
    ? true
    : false,
        skill_level: formData.skill_level,
        skill_level_verified: false,
      },
    ]);

    setLoading(false);

    if (dbError) {
      alert("Database Error: " + dbError.message);
      return;
    }

    alert(
      "Registration completed! Please check your email if confirmation is required."
    );

    router.push("/members/login");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20 text-slate-800">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Member Registration
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Become a Member
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Join Song Jeho Table Tennis Academy and connect with players,
            coaches, tournaments, and community events.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-white p-8 shadow-2xl"
        >
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-sky-600">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-sky-600">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-sky-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-sky-600">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-sky-600">
              Membership Type
            </label>

            <select
              name="membership_type"
              value={formData.membership_type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            >
              {membershipTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {needsApproval && (
              <p className="mt-3 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-700">
                Coach, sponsor, and admin roles require approval before special
                permissions become active.
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-sky-600">
              Skill Level
            </label>

            <select
              name="skill_level"
              value={formData.skill_level}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            >
              {skillLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>

            <p className="mt-3 text-sm text-slate-500">
              Skill level may be verified or adjusted by the academy later.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a
              href="/members/login"
              className="font-bold text-sky-700 hover:text-orange-500"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}