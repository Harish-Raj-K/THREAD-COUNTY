"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, AtSign, Link2, Globe, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Get in touch</h1>
          <p className="opacity-70 mb-8">Have a question, partnership idea, or feedback? We&apos;d love to hear from you.</p>

          <div className="space-y-4 mb-8">
            <a href="mailto:hello@threadcounty.com" className="flex items-center gap-3 text-sm hover:text-brand">
              <Mail size={18} className="text-brand" /> hello@threadcounty.com
            </a>
          </div>

          <div className="flex gap-3">
            <a href="#" aria-label="Twitter / X" className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center hover:bg-brand/20 text-brand"><AtSign size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center hover:bg-brand/20 text-brand"><Link2 size={16} /></a>
            <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center hover:bg-brand/20 text-brand"><Globe size={16} /></a>
          </div>

          <div className="card p-4 mt-8 aspect-video flex items-center justify-center text-sm opacity-50">
            Google Maps embed placeholder
          </div>
        </div>

        <div className="card p-6">
          {sent ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto mb-3 text-brand" size={36} />
              <p className="font-semibold mb-1">Message sent!</p>
              <p className="text-sm opacity-70">We&apos;ll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Send message
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
