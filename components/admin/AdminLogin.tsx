"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";

export default function AdminLogin() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }
    // Session is now in cookies; server-side guard will let us through.
    router.replace("/admin");
    router.refresh();
  }

  if (!supabase)
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-muted">
        Supabase is not configured. Set env vars and reload.
      </div>
    );

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border-warm-2 bg-surface p-7 shadow-sm"
      >
        <h1 className="font-serif text-2xl font-bold text-brand-blue">
          Admin Login
        </h1>
        <p className="mt-1 text-sm text-faint">
          Akhil Bharti Group of Institutes
        </p>
        <label className="mt-5 block text-sm font-medium text-brand-blue">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border-warm-2 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
          required
        />
        <label className="mt-4 block text-sm font-medium text-brand-blue">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border-warm-2 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
          required
        />
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-lg bg-brand-blue py-2.5 text-sm font-bold text-white hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
