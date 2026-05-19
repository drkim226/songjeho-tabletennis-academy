"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const membershipTypes = [
  "not_member",
  "regular",
  "coach",
  "sponsor",
  "admin",
];

const skillLevels = [
  "S",
  "A",
  "B",
  "C",
  "D",
  "beginner",
  "senior",
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.from("members").insert([
      {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        membership_type: formData.membership_type,
        skill_level: formData.skill_level,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Registration completed!");

    setFormData({
      full_name: "",
      email: "",
      phone: "",
      membership_type: "not_member",
      skill_level: "beginner",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Become a Member
        </h1>

        <p className="text-gray-400 mb-10">
          Join our table tennis community and connect with players,
          coaches, tournaments, and events.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-zinc-900 p-8 rounded-3xl border border-zinc-800"
        >
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Membership Type
            </label>

            <select
              name="membership_type"
              value={formData.membership_type}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            >
              {membershipTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Skill Level
            </label>

            <select
              name="skill_level"
              value={formData.skill_level}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            >
              {skillLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 transition rounded-xl py-4 font-semibold text-lg"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}