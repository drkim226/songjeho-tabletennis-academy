"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkingSession, setCheckingSession] = useState(true);
  const [recoverySession, setRecoverySession] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      const hashParams = new URLSearchParams(
        window.location.hash.replace(/^#/, "")
      );

      const urlError = hashParams.get("error_description");

      if (urlError) {
        if (mounted) {
          setErrorMessage(decodeURIComponent(urlError.replace(/\+/g, " ")));
          setCheckingSession(false);
        }

        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted && session) {
        setRecoverySession(true);
        setCheckingSession(false);
      }
    };

    void checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" || session) {
        setRecoverySession(true);
        setCheckingSession(false);
        setErrorMessage("");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setSaving(false);
      return;
    }

    setMessage("Password updated successfully.");

    await supabase.auth.signOut();

    window.setTimeout(() => {
      router.replace("/admin");
    }, 1500);
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <p className="text-lg font-bold text-slate-500">
          Verifying password reset link...
        </p>
      </main>
    );
  }

  if (!recoverySession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Password Recovery
          </p>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Reset link unavailable
          </h1>

          <p className="mt-5 leading-7 text-red-600">
            {errorMessage ||
              "This password reset link is invalid, expired, or has already been used."}
          </p>

          <a
            href="/admin"
            className="mt-8 inline-block rounded-full bg-sky-600 px-7 py-4 font-bold text-white hover:bg-sky-700"
          >
            Return to Admin Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 py-20">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Account Security
        </p>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Create New Password
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Enter a new password for your administrator account.
        </p>

        <form onSubmit={updatePassword} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-slate-700"
            >
              New Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-sky-500"
              placeholder="At least 8 characters"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-bold text-slate-700"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-sky-500"
              placeholder="Enter the new password again"
              required
            />
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 p-4 font-semibold text-red-600">
              {errorMessage}
            </p>
          )}

          {message && (
            <p className="rounded-2xl bg-green-50 p-4 font-semibold text-green-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-2xl bg-sky-600 px-6 py-4 text-lg font-extrabold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {saving ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
}