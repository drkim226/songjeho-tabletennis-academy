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
};

export default function MemberProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin");
      return;
    }

    const { data, error } = await supabase
      .from("members")
      .select("id, full_name, email, phone, membership_type, role_approved")
      .eq("auth_user_id", user.id)
      .single();

    if (error) {
      console.error(error);
      alert("Could not load your dashboard.");
      setLoading(false);
      return;
    }

    setMember(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (!member) return null;

  const isAdmin =
    member.membership_type === "Admin" && member.role_approved === true;

  const isApproved = member.role_approved === true;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            My Dashboard
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Welcome, {member.full_name}
          </h1>

          <p className="mt-4 text-slate-600">
            Manage your account access and role status.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
              Account Information
            </h2>

            <div className="space-y-5">
              <ProfileRow label="Name" value={member.full_name} />
              <ProfileRow label="Email" value={member.email} />
              <ProfileRow label="Phone" value={member.phone || "Not provided"} />
              <ProfileRow label="Account Role" value={member.membership_type} />
              <ProfileRow
                label="Status"
                value={isApproved ? "Approved" : "Pending Approval"}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
              Quick Actions
            </h2>

            <div className="space-y-4">
              <a
                href="/members/edit"
                className="block rounded-2xl bg-sky-50 px-6 py-4 text-center font-bold text-sky-700 hover:bg-sky-100"
              >
                Edit Profile
              </a>

              {isAdmin && (
                <a
                  href="/admin"
                  className="block rounded-2xl bg-slate-900 px-6 py-4 text-center font-bold text-white hover:bg-slate-800"
                >
                  Go to Admin Dashboard
                </a>
              )}

              <button
                onClick={handleLogout}
                className="block w-full rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white hover:bg-orange-600"
              >
                Logout
              </button>
            </div>

            {!isApproved && (
              <p className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-700">
                Your role is waiting for administrator approval. Some features
                may become available after approval.
              </p>
            )}
          </div>
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