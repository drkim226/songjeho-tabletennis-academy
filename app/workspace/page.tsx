"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type MenuItem = {
  title: string;
  description: string;
  href: string;

};

const menuItems: MenuItem[] = [
  {
    title: "News",
    description: "Manage homepage news and news detail pages.",
    href: "/admin/news",
    
  },
  {
    title: "Partners",
    description: "Manage sponsors, partners, and community supporters.",
    href: "/admin/sponsors",
   
  },
  {
    title: "Coaches",
    description: "Manage coach section and coach profile pages.",
    href: "/admin/coaches",
    
  },
  {
    title: "Gallery",
    description: "Manage History and Tournament gallery photos.",
    href: "/admin/gallery",
  
  },
  {
    title: "Messages",
    description: "Review and manage Contact Us messages.",
    href: "/admin/messages",
   
  },
  {
    title: "Rating",
    description: "Review official rating applications.",
    href: "/admin/rating",
  
  },
  {
    title: "Members / Roles",
    description: "Manage user access, roles, and approvals.",
    href: "/admin",

  },
];

export default function WorkspacePage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
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

    setIsAdmin(!!adminUser);
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading workspace...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Management Workspace
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            Site Management Center
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Choose a section below to manage academy content, applications,
            messages, and user access.
          </p>

          {isAdmin && (
            <p className="mt-4 font-bold text-sky-700">
              Admin access: all management sections are available.
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
           
            <h2 className="border-l-4 border-orange-500 pl-4 text-2xl font-extrabold text-slate-900 transition group-hover:border-sky-600 group-hover:text-sky-700">
                {item.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {item.description}
              </p>

              <p className="mt-6 font-bold text-orange-500">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}