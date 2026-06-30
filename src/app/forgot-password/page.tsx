"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.resetPasswordForEmail(email);
    } else {
      await new Promise((r) => setTimeout(r, 800));
    }
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="card w-full max-w-md p-8">
          {sent ? (
            <div className="text-center py-6">
              <CheckCircle2 className="mx-auto mb-3 text-brand" size={36} />
              <h1 className="text-xl font-bold mb-2">Check your inbox</h1>
              <p className="text-sm opacity-70">
                If an account exists for <span className="font-medium">{email}</span>, we&apos;ve sent a password reset link.
              </p>
              <Link href="/login" className="inline-block mt-6 text-brand font-semibold hover:underline">Back to login</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-1">Reset your password</h1>
              <p className="text-sm opacity-70 mb-6">Enter your email and we&apos;ll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Send reset link
                </button>
              </form>
              <p className="text-sm text-center opacity-70 mt-6">
                Remembered your password?{" "}
                <Link href="/login" className="text-brand font-semibold hover:underline">Log in</Link>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
