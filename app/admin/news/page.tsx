"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import RichTextEditor from "@/components/RichTextEditor";

type NewsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  active: boolean;
  sort_order: number | null;
  created_at: string;
};

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Could not load news posts: " + error.message);
      setLoading(false);
      return;
    }

    setPosts(data || []);
    setLoading(false);
  };

  const createSlug = (text: string) => {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || `news-${Date.now()}`;
};

  const uploadImage = async (file: File) => {
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `news/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(filePath, file);

    if (uploadError) {
      alert("Image upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(filePath);

    setCoverImage(data.publicUrl);
    setUploading(false);
  };

  const createPost = async () => {
    console.log("CONTENT STATE:", content);

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
  const plainContent = content
  .replace(/<[^>]*>/g, "")
  .replace(/&nbsp;/g, "")
  .replace(/\s/g, "")
  .trim();

console.log("Plain:", plainContent);

if (plainContent.length === 0) {
  alert("Full content is required.");
  return;
}

    const slug = createSlug(title);

    const { error } = await supabase.from("news_posts").insert({
      title: title.trim(),
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      active: true,
      sort_order: posts.length + 1,
    });

    if (error) {
      alert("Create failed: " + error.message);
      return;
    }

    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImage("");

    await loadPosts();
  };

  const toggleActive = async (post: NewsPost) => {
    const { error } = await supabase
      .from("news_posts")
      .update({ active: !post.active })
      .eq("id", post.id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    await loadPosts();
  };

  const deletePost = async (id: string) => {
    const ok = confirm("Delete this news post?");
    if (!ok) return;

    const { error } = await supabase
      .from("news_posts")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    await loadPosts();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
        <p>Loading news posts...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Song Jeho TTA News
          </p>

          <h1 className="text-5xl font-extrabold text-slate-900">
            News Management
          </h1>

          <p className="mt-4 text-slate-600">
            Create and manage homepage news posts.
          </p>
        </div>

        <div className="mb-12 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
            Create News Post
          </h2>

          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="News title"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4"
            />

            <div>
  <label className="mb-2 block font-bold text-sky-700">
    Short Description
  </label>

  <input
    value={excerpt}
    onChange={(e) => setExcerpt(e.target.value)}
    placeholder="Enter a short description for the news"
    className="w-full rounded-2xl border border-slate-200 px-5 py-4 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
  />
</div>

            <div>
  <label className="mb-2 block font-bold text-sky-700">
    Full Content
  </label>

  <RichTextEditor
    content={content}
    onChange={setContent}
  />
</div>

            <div>
              <label className="mb-2 block font-bold text-sky-700">
                Cover Image
              </label>

              <label className="block cursor-pointer rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-sky-500 hover:bg-sky-50">
  <span className="font-medium text-slate-700">
    Select Cover Image
  </span>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) uploadImage(file);
    }}
    className="hidden"
  />
</label>

              {uploading && (
                <p className="mt-3 font-bold text-orange-500">
                  Uploading image...
                </p>
              )}

              {coverImage && (
  <div className="mt-4 flex justify-center">
    <img
      src={coverImage}
      alt="News cover preview"
      className="max-h-[500px] max-w-full rounded-2xl object-contain"
    />
  </div>
)}
            </div>

            <button
              onClick={createPost}
              disabled={uploading}
              className="rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700 disabled:bg-slate-400"
            >
              Create News
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {posts.length === 0 && (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-xl">
              No news posts yet.
            </p>
          )}

          {posts.map((post) => (
            <div key={post.id} className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-slate-500"></p>

                  {post.excerpt && (
                    <p className="mt-4 text-slate-600">{post.excerpt}</p>
                  )}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    post.active
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {post.active ? "Published" : "Hidden"}
                </span>
              </div>

              {post.cover_image && (
                <div className="mt-4 flex justify-center">
  <img
    src={post.cover_image}
    alt={post.title}
    className="max-h-[500px] max-w-full rounded-2xl object-contain"
  />
</div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => toggleActive(post)}
                  className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                >
                  {post.active ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => deletePost(post.id)}
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}