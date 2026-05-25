"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ContactMessage = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
};

export default function AdminMessagesPage() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    checkAccessAndLoadMessages();
  }, []);

  const checkAccessAndLoadMessages = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/admin";
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

    const hasAccess =
      !!adminUser ||
      (member?.membership_type === "Admin" && member?.role_approved === true);

    if (!hasAccess) {
      alert("Access denied");
      window.location.href = "/members/profile";
      return;
    }

    await loadMessages();
    setLoading(false);
  };

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Could not load messages: " + error.message);
      return;
    }

    setMessages(data || []);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "read" })
      .eq("id", id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
  };

  const deleteMessage = async (id: string) => {
    const ok = confirm("Delete this message?");
    if (!ok) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <p>Loading messages...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Admin Messages
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Contact Messages
          </h1>

          <p className="mt-4 text-slate-600">
            Messages submitted from the website contact form.
          </p>
        </div>

        {messages.length === 0 ? (
          <p className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-xl">
            No contact messages yet.
          </p>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-3xl bg-white p-6 shadow-xl"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      {msg.subject || "No Subject"}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      From: <span className="font-bold">{msg.name}</span>
                    </p>

                    <p className="text-slate-600">
                      Email:{" "}
                      <a
                        href={`mailto:${msg.email}`}
                        className="font-bold text-sky-700 hover:text-orange-500"
                      >
                        {msg.email}
                      </a>
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      msg.status === "read"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">
                  {msg.message}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {msg.status !== "read" && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
                  >
                    Delete
                  </button>

                  <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    msg.email
  )}&su=${encodeURIComponent(
    `Re: ${msg.subject || "Website Contact Message"}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-800"
>
  Reply in Gmail
</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}