"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/authContext";
import { mockHistory } from "@/lib/mockData";
import { Upload, FileText, HardDrive, Clock, Sparkles, ArrowRight } from "lucide-react";

const quickActions = [
  { href: "/upload", label: "New Upload", icon: Upload },
  { href: "/history", label: "View History", icon: FileText },
  { href: "/pricing", label: "Upgrade Plan", icon: Sparkles },
];

const activity = [
  { text: "Uploaded denim_swatch.png", time: "2 hours ago" },
  { text: "Downloaded report for cotton_sample_01.jpg", time: "Yesterday" },
  { text: "Upgraded to Professional plan", time: "3 days ago" },
  { text: "Uploaded linen_blend_03.jpg", time: "5 days ago" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const totalUploads = mockHistory.length + 12;
  const storageUsedMB = 184;
  const storageLimitMB = 500;

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
        <p className="text-sm opacity-70 mt-1">Here&apos;s what&apos;s happening with your fabric analyses.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <FileText className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{totalUploads}</p>
          <p className="text-xs opacity-60">Total uploads</p>
        </div>
        <div className="card p-5">
          <Sparkles className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{mockHistory.length}</p>
          <p className="text-xs opacity-60">Recent reports</p>
        </div>
        <div className="card p-5">
          <HardDrive className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{storageUsedMB} MB</p>
          <p className="text-xs opacity-60">of {storageLimitMB} MB used</p>
          <div className="h-1.5 rounded-full bg-brand/10 mt-2 overflow-hidden">
            <div className="h-full bg-brand" style={{ width: `${(storageUsedMB / storageLimitMB) * 100}%` }} />
          </div>
        </div>
        <div className="card p-5">
          <Clock className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">Free</p>
          <p className="text-xs opacity-60">Current plan</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent reports */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent reports</h2>
            <Link href="/history" className="text-sm text-brand font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {mockHistory.slice(0, 4).map((r) => (
              <Link key={r.id} href={`/analysis/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-brand/5 transition-colors">
                <div>
                  <p className="text-sm font-medium">{r.fileName}</p>
                  <p className="text-xs opacity-60">{r.fabricType} · {r.confidenceScore}% confidence</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-brand/10 text-brand font-medium">Completed</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions + activity */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="font-semibold mb-4">Quick actions</h2>
            <div className="space-y-2">
              {quickActions.map((a) => (
                <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-lg border border-brand/15 hover:bg-brand/5 transition-colors text-sm font-medium">
                  <a.icon size={16} className="text-brand" /> {a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold mb-4">Activity timeline</h2>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                  <div>
                    <p className="opacity-80">{a.text}</p>
                    <p className="text-xs opacity-50">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
