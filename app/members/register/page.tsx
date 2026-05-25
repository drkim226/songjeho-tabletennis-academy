"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const accountRoles = [
  { value: "Coach", label: "Coach" },
  { value: "Sponsor", label: "Sponsor" },
  { value: "Site Manager", label: "Site Manager" },
  {
    value: "Association Representative",
    label: "Association Representative",
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    membership_type: "Coach",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        role_approved: false,
      },
    ]);

    setLoading(false);

    if (dbError) {
      alert("Database Error: " + dbError.message);
      return;
    }

    alert(
      "Your role application has been submitted. Please wait for administrator approval."
    );

    router.push("/admin");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20 text-slate-800">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Role Registration
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Apply for Site Access
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Select the role that best matches your purpose for using this site.
            All role applications require administrator approval before access is activated.
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
              Account Role
            </label>

            <select
              name="membership_type"
              value={formData.membership_type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-orange-400"
            >
              {accountRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            <p className="mt-3 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-700">
              Coach, Sponsor, Site Manager, and Association Representative roles
              require administrator approval before permissions become active.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Role Application"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a
              href="/admin"
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