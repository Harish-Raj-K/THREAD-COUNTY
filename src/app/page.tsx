import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Upload, ScanSearch, FileBarChart, ShieldCheck, Zap, Globe2,
  ArrowRight, CheckCircle2, Star,
} from "lucide-react";
import { testimonials, faqData } from "@/lib/mockData";

const features = [
  { icon: ScanSearch, title: "AI Fabric Analysis", desc: "Upload a photo and get thread density, warp/weft counts, and fabric type in seconds." },
  { icon: FileBarChart, title: "Downloadable Reports", desc: "Every analysis generates a shareable, professional PDF report for your records or clients." },
  { icon: ShieldCheck, title: "Secure by Design", desc: "Supabase-backed authentication and row-level security keep your uploads and data private." },
  { icon: Zap, title: "Fast Processing", desc: "Optimized pipeline returns results in seconds, not minutes — no lab equipment required." },
  { icon: Globe2, title: "Access Anywhere", desc: "Fully responsive web app — analyze fabric from your desktop, tablet, or phone." },
  { icon: Upload, title: "Bulk-Friendly Uploads", desc: "Drag-and-drop multiple samples with live progress and instant validation." },
];

const benefits = [
  "Cut manual fabric inspection time by up to 70%",
  "Standardize quality reports across your whole team",
  "No specialized lab equipment required",
  "Track every analysis in a searchable history",
];

const workflow = [
  { step: "01", title: "Create an account", desc: "Sign up in seconds and verify your email to get started." },
  { step: "02", title: "Upload a fabric image", desc: "Drag and drop a JPG, PNG, or JPEG photo of your fabric sample." },
  { step: "03", title: "Get instant AI analysis", desc: "Receive thread density, warp/weft counts, fabric type, and confidence score." },
  { step: "04", title: "Download & share", desc: "Export a polished report as PDF or share a link with your team or client." },
];

const stats = [
  { value: "12,000+", label: "Fabric samples analyzed" },
  { value: "94.2%", label: "Average confidence score" },
  { value: "3.1s", label: "Average analysis time" },
  { value: "500+", label: "Studios & mills onboard" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--brand)_0%,_transparent_45%)] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand/10 text-brand mb-6">
            <Star size={14} /> Now with instant AI fabric reports
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Know your fabric in <span className="gradient-text">seconds</span>, not hours
          </h1>
          <p className="mt-6 text-lg opacity-75 max-w-2xl mx-auto">
            ThreadCounty uses AI to analyze fabric photos and instantly report thread density, warp &amp; weft counts, fabric type, and a confidence score — no lab required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-7 py-3.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors inline-flex items-center justify-center gap-2">
              Start free <ArrowRight size={18} />
            </Link>
            <Link href="/upload" className="px-7 py-3.5 rounded-full border border-brand/30 font-semibold hover:bg-brand/10 transition-colors inline-flex items-center justify-center gap-2">
              Try a sample analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Product overview / preview card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 mb-20">
        <div className="card p-3 shadow-2xl shadow-brand/10">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand/15 to-accent/15 aspect-video flex items-center justify-center">
            <div className="text-center px-6">
              <ScanSearch size={48} className="mx-auto mb-4 text-brand" />
              <p className="font-semibold">Live dashboard preview</p>
              <p className="text-sm opacity-60 mt-1">Upload → AI Analysis → Report, all in one flow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="card p-6 text-center">
              <p className="text-3xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-sm opacity-70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to analyze fabric</h2>
          <p className="mt-3 opacity-70">A complete toolkit for designers, mills, and QA teams.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-brand" />
              </div>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm opacity-70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why teams switch to ThreadCounty</h2>
          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 className="text-brand shrink-0 mt-0.5" size={20} />
                <p className="opacity-80">{b}</p>
              </div>
            ))}
          </div>
          <Link href="/signup" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors">
            Get started free <ArrowRight size={16} />
          </Link>
        </div>
        <div className="card p-8 aspect-square flex items-center justify-center bg-gradient-to-br from-brand/10 to-accent/10">
          <FileBarChart size={96} className="text-brand opacity-60" />
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
          <p className="mt-3 opacity-70">From photo to report in four simple steps.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflow.map((w) => (
            <div key={w.step} className="card p-6">
              <span className="text-3xl font-extrabold text-brand/30">{w.step}</span>
              <h3 className="font-semibold mt-3 mb-1.5">{w.title}</h3>
              <p className="text-sm opacity-70">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Loved by designers & mills</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 mb-3 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm opacity-80 mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs opacity-60">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqData[0].items.concat(faqData[1].items).map((item) => (
            <details key={item.q} className="card p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {item.q}
                <span className="text-brand group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm opacity-70 mt-3">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-brand font-semibold hover:underline">View all FAQs →</Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <div className="card p-10 sm:p-16 text-center bg-gradient-to-br from-brand/10 to-accent/10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to see your fabric differently?</h2>
          <p className="opacity-70 max-w-xl mx-auto mb-8">
            Join hundreds of studios and mills using ThreadCounty to standardize fabric analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-7 py-3.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors">
              Create your account
            </Link>
            <Link href="/contact" className="px-7 py-3.5 rounded-full border border-brand/30 font-semibold hover:bg-brand/10 transition-colors">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
