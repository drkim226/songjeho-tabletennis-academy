"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type RatingApplication = {
  id: string;
  created_at: string;
  member_id: number;
  full_name: string;
  email: string;
  phone: string;
  association: string;
  requested_level: string;
  playing_experience: string;
  tournament_experience: string;
  message: string;
  photo_urls: string[] | null;
  status: string;
  admin_note: string;
};

export default function AdminRatingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<RatingApplication[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin");
      return;
    }

    const { data: adminUser } = await supabase
  .from("admin_users")
  .select("id")
  .eq("auth_user_id", user.id)
  .maybeSingle();

const { data: member } = await supabase
  .from("members")
  .select("membership_type, role_approved")
  .eq("auth_user_id", user.id)
  .maybeSingle();

const allowedRoles = ["Admin", "Association Representative"];

const hasAccess =
  !!adminUser ||
  (!!member &&
    allowedRoles.includes(member.membership_type) &&
    member.role_approved === true);

if (!hasAccess) {
  alert("Access denied");
  router.replace("/members/profile");
  return;
}

    const { data, error } = await supabase
      .from("rating_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Could not load rating applications: " + error.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  };

  const updateStatus = async (
    app: RatingApplication,
    status: "approved" | "rejected"
  ) => {
    const { error } = await supabase
      .from("rating_applications")
      .update({ status })
      .eq("id", app.id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    setApplications((prev) =>
      prev.map((item) => (item.id === app.id ? { ...item, status } : item))
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <p>Checking access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Rating Management
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Rating Applications
          </h1>
        </div>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {app.full_name}
                  </h2>
                  <p className="text-slate-600">{app.email}</p>
                  <p className="text-slate-600">{app.phone || "N/A"}</p>
                  <p className="text-slate-600">
                    {app.association || "No affiliation"}
                  </p>
                </div>

                <div className="rounded-full bg-slate-100 px-5 py-2 font-bold">
                  {app.status}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Info label="Requested Level" value={app.requested_level} />
                <Info label="Playing Experience" value={app.playing_experience} />
                <Info
                  label="Tournament Experience"
                  value={app.tournament_experience}
                />
                <Info label="Submitted" value={app.created_at} />
              </div>

              {app.photo_urls && app.photo_urls.length > 0 && (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="mb-3 font-bold text-sky-600">
                    Identification Photos
                  </p>

                  <div className="grid gap-3 md:grid-cols-3">
                    {app.photo_urls.map((url, index) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                      >
                        <img
                          src={url}
                          alt={`Identification photo ${index + 1}`}
                          className="h-40 w-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {app.message && (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="mb-1 font-bold text-sky-600">Message</p>
                  <p>{app.message}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => updateStatus(app, "approved")}
                  className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app, "rejected")}
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <p className="rounded-3xl bg-white p-8 text-center shadow-xl">
              No rating applications yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="mb-1 text-sm font-bold uppercase tracking-widest text-sky-600">
        {label}
      </p>
      <p className="text-slate-800">{value || "N/A"}</p>
    </div>
  );
}