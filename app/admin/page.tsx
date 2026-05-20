"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  membership_type: string;
  role_approved: boolean;
  skill_level: string;
  skill_level_verified: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/members/login");
      return;
    }

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (adminError) {
      alert("Admin check failed: " + adminError.message);
      router.push("/members/profile");
      return;
    }

    if (!adminUser) {
      alert("Admin access required.");
      router.push("/members/profile");
      return;
    }

    setIsAdmin(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Could not load members: " + error.message);
      console.error(error);
      setLoading(false);
      return;
    }

    setMembers(data || []);
    setLoading(false);
  };

  const updateMember = async (
    id: number,
    field: "role_approved" | "skill_level_verified",
    value: boolean
  ) => {
    const { error } = await supabase
      .from("members")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <p>Loading admin dashboard...</p>
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Admin Dashboard
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Member Management
          </h1>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-2xl">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Type</th>
                <th className="p-4">Level</th>
                <th className="p-4">Role Approved</th>
                <th className="p-4">Level Verified</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-slate-100">
                  <td className="p-4 font-bold">{member.full_name}</td>
                  <td className="p-4">{member.email}</td>
                  <td className="p-4">{member.phone}</td>
                  <td className="p-4">{member.membership_type}</td>
                  <td className="p-4">{member.skill_level}</td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        updateMember(
                          member.id,
                          "role_approved",
                          !member.role_approved
                        )
                      }
                      className={`rounded-full px-4 py-2 font-bold ${
                        member.role_approved
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {member.role_approved ? "Approved" : "Pending"}
                    </button>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        updateMember(
                          member.id,
                          "skill_level_verified",
                          !member.skill_level_verified
                        )
                      }
                      className={`rounded-full px-4 py-2 font-bold ${
                        member.skill_level_verified
                          ? "bg-sky-100 text-sky-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {member.skill_level_verified ? "Verified" : "Not Verified"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}