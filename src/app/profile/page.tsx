"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/authContext";
import { Camera, Save, Lock, Trash2, History as HistoryIcon, Check } from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile, signOut } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? "");
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete() {
    await signOut();
    router.push("/");
  }

  return (
    <DashboardShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile settings</h1>
        <p className="text-sm opacity-70 mt-1">Manage your account information and security.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="card p-6">
            <h2 className="font-semibold mb-5">Update profile</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-brand/15 text-brand flex items-center justify-center font-bold text-2xl">
                  {name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <button type="button" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center">
                  <Camera size={12} />
                </button>
              </div>
              <div className="text-sm opacity-60">Upload a profile picture (JPG/PNG, max 2MB)</div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Email</label>
                <input value={user?.email ?? ""} disabled className="w-full px-3 py-2.5 rounded-lg border border-brand/10 bg-brand/5 outline-none opacity-60" />
              </div>
            </div>

            <button type="submit" className="mt-5 px-5 py-2.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center gap-2 text-sm">
              {saved ? <Check size={15} /> : <Save size={15} />} {saved ? "Saved" : "Save changes"}
            </button>
          </form>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lock size={16} className="text-brand" />
              <h2 className="font-semibold">Change password</h2>
            </div>
            <div className="space-y-4">
              <input type="password" placeholder="Current password" className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand" />
              <input type="password" placeholder="New password" className="w-full px-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand" />
            </div>
            <button className="mt-5 px-5 py-2.5 rounded-full border border-brand/30 font-semibold hover:bg-brand/10 transition-colors text-sm">
              Update password
            </button>
          </div>

          <div className="card p-6 border-red-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 size={16} className="text-red-500" />
              <h2 className="font-semibold text-red-500">Delete account</h2>
            </div>
            <p className="text-sm opacity-70 mb-4">This permanently deletes your account and all associated data after a 14-day grace period.</p>
            {showDeleteConfirm ? (
              <div className="flex gap-3">
                <button onClick={handleDelete} className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold">Confirm delete</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-full border border-brand/20 text-sm font-semibold">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 rounded-full border border-red-500/40 text-red-500 text-sm font-semibold hover:bg-red-500/10">
                Delete my account
              </button>
            )}
          </div>
        </div>

        <div className="card p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <HistoryIcon size={16} className="text-brand" />
            <h2 className="font-semibold">Recent activity</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="opacity-70">Logged in just now</li>
            <li className="opacity-70">Updated profile name</li>
            <li className="opacity-70">Uploaded 2 fabric images</li>
            <li className="opacity-70">Downloaded a report</li>
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}
