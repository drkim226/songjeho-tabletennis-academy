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

export default function MemberProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/members/login");
        return;
      }

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();

      if (error) {
        console.error(error);
        alert("Could not load member profile.");
        setLoading(false);
        return;
      }

      setMember(data);
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/members/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!member) {
    return null;
  }

  const isAdmin =
    member.membership_type === "admin" && member.role_approved === true;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Member Profile
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Welcome, {member.full_name}
          </h1>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <div className="space-y-6 text-lg">
            <ProfileRow label="Name" value={member.full_name} />
            <ProfileRow label="Email" value={member.email} />
            <ProfileRow label="Phone" value={member.phone || "Not provided"} />
            <ProfileRow label="Membership Type" value={`[${member.membership_type}]`} />
            <ProfileRow
              label="Role Approved"
              value={
  member.membership_type === "not_member"
    ? "Approved"
    : member.role_approved
    ? "Approved"
    : "Pending"
}
            />
            <ProfileRow label="Skill Level" value={member.skill_level} />
            <ProfileRow
              label="Skill Level Verified"
              value={member.skill_level_verified ? "Verified" : "Not verified yet"}
            />
          </div>

          {isAdmin && (
            <a
              href="/admin"
              className="mt-8 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Go to Admin Dashboard
            </a>
          )}

          <button
            onClick={handleLogout}
            className="mt-8 block rounded-full bg-orange-500 px-8 py-4 font-bold text-white hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <p className="mb-1 text-sm font-bold uppercase tracking-widest text-sky-600">
        {label}
      </p>
      <p className="text-slate-800">{value}</p>
    </div>
  );
}