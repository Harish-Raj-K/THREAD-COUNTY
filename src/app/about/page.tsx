import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Eye, Cpu, Users } from "lucide-react";

const team = [
  { name: "Harish Raj K", role: "Founder & Lead Developer" },
  { name: "Team ThreadCounty", role: "Product & Design" },
  { name: "Team ThreadCounty", role: "AI & Backend" },
];

const timeline = [
  { year: "2025", text: "ThreadCounty concept born from a hackathon idea: instant fabric analysis without lab equipment." },
  { year: "2026", text: "First working prototype built — AI-assisted thread density and weave analysis." },
  { year: "Now", text: "Building toward a production-ready SaaS platform for studios, mills, and QA teams." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <h1 className="text-4xl font-extrabold mb-4">About ThreadCounty</h1>
          <p className="opacity-70 text-lg">
            We&apos;re building the fastest way for designers, mills, and quality teams to understand fabric — no lab required.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20 grid sm:grid-cols-2 gap-6">
          <div className="card p-6">
            <Target className="text-brand mb-3" size={22} />
            <h2 className="font-semibold mb-2">Our Mission</h2>
            <p className="text-sm opacity-70">
              Make professional-grade fabric analysis instantly accessible to anyone with a camera, replacing slow manual inspection with fast, consistent AI-assisted reports.
            </p>
          </div>
          <div className="card p-6">
            <Eye className="text-brand mb-3" size={22} />
            <h2 className="font-semibold mb-2">Our Vision</h2>
            <p className="text-sm opacity-70">
              A world where every textile decision — from sourcing to quality control — is backed by instant, reliable data, not guesswork.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <div className="card p-8 text-center">
            <Cpu className="mx-auto text-brand mb-3" size={26} />
            <h2 className="font-semibold mb-2">Technology we use</h2>
            <p className="text-sm opacity-70 max-w-2xl mx-auto">
              Next.js and TypeScript power our frontend, Tailwind CSS and Framer Motion handle styling and motion, and Supabase provides authentication, database, and storage — all deployed on Vercel.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <div className="text-center mb-10">
            <Users className="mx-auto text-brand mb-3" size={26} />
            <h2 className="text-2xl font-bold">Team</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand/15 text-brand flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {t.name[0]}
                </div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm opacity-60">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24">
          <h2 className="text-2xl font-bold text-center mb-10">Our journey</h2>
          <div className="space-y-6 border-l-2 border-brand/20 pl-6">
            {timeline.map((t, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-brand" />
                <p className="font-semibold text-brand">{t.year}</p>
                <p className="text-sm opacity-70">{t.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
