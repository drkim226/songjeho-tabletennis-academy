"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  membership_type: string;
  role_approved: boolean;
};

const roleOptions = [
  "Coach",
  "Sponsor",
  "Site Manager",
  "Association Representative",
];

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
  setChecking(true);

  try {
    const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

if (!user) {
  setIsAdmin(false);
  setChecking(false);
  return;
}

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (adminError) throw adminError;

    const { data: member, error: memberError } = await supabase
      .from("members")
      .select("membership_type, role_approved")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (memberError) throw memberError;

    const adminAccess =
      !!adminUser ||
      (member?.membership_type === "Admin" && member?.role_approved === true);

    if (!adminAccess) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }

    setIsAdmin(true);
    await loadMembers();
  } catch (err) {
    console.error("Admin check failed:", err);
    setIsAdmin(false);
  } finally {
    setChecking(false);
  }
};

  const loadMembers = async () => {
    const { data, error } = await supabase
      .from("members")
      .select("id, full_name, email, phone, membership_type, role_approved")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Could not load accounts: " + error.message);
      return;
    }

    setMembers(data || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoginLoading(true);

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    await checkAdmin();
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Please check your connection or Supabase settings.");
  } finally {
    setLoginLoading(false);
  }
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setMembers([]);
  };

  const updateMember = async (
    id: number,
    updates: Partial<Pick<Member, "membership_type" | "role_approved">>
  ) => {
    const { error } = await supabase
      .from("members")
      .update(updates)
      .eq("id", id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <p>Checking admin access...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20 text-slate-800">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-2xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              Admin Access
            </p>

            <h1 className="mb-3 text-4xl font-extrabold text-slate-900">
              Login Required
            </h1>

            <p className="text-slate-500">
              Please sign in with an approved admin account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-2xl bg-sky-600 py-4 text-lg font-bold text-white hover:bg-sky-700 disabled:opacity-50"
            >
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Need access?{" "}
            <a
              href="/members/register"
              className="font-bold text-sky-700 hover:text-orange-500"
            >
              Apply for Site Access
            </a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              Admin Dashboard
            </p>

            <h1 className="text-5xl font-extrabold text-slate-900">
              Account Role Management
            </h1>

            <a
  href="/workspace"
  className="mt-6 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
>
  Open Workspace
</a>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
          >
            Logout
          </button>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-2xl">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Account Role</th>
                <th className="p-4">Approval</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => {
                const isProtectedAdmin = member.membership_type === "Admin";

                return (
                  <tr key={member.id} className="border-b border-slate-100">
                    <td className="p-4 font-bold">{member.full_name}</td>
                    <td className="p-4">{member.email}</td>
                    <td className="p-4">{member.phone || "N/A"}</td>

                    <td className="p-4">
                      {isProtectedAdmin ? (
                        <span className="rounded-full bg-slate-900 px-4 py-2 font-bold text-white">
                          Admin
                        </span>
                      ) : (
                        <select
                          value={member.membership_type}
                          onChange={(e) =>
                            updateMember(member.id, {
                              membership_type: e.target.value,
                              role_approved: false,
                            })
                          }
                          className="rounded-xl border border-slate-300 px-4 py-3"
                        >
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="p-4">
                      {isProtectedAdmin ? (
                        <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
                          Approved
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            updateMember(member.id, {
                              role_approved: !member.role_approved,
                            })
                          }
                          className={`rounded-full px-4 py-2 font-bold ${
                            member.role_approved
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {member.role_approved ? "Approved" : "Pending"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}