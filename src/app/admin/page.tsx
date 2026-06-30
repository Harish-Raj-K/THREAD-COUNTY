"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { mockAdminUsers, mockHistory, AdminUser } from "@/lib/mockData";
import { Users, ImageIcon, BarChart3, CreditCard, Trash2, Ban, CheckCircle2 } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [reports, setReports] = useState(mockHistory);

  function toggleStatus(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
  }

  function deleteReport(id: string) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  const totalUploads = users.reduce((sum, u) => sum + u.uploads, 0);
  const planCounts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.plan] = (acc[u.plan] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <p className="text-sm opacity-70 mt-1">Manage users, uploaded images, and platform analytics.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <Users className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs opacity-60">Total users</p>
        </div>
        <div className="card p-5">
          <ImageIcon className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{totalUploads}</p>
          <p className="text-xs opacity-60">Total uploads</p>
        </div>
        <div className="card p-5">
          <BarChart3 className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{reports.length}</p>
          <p className="text-xs opacity-60">Active reports</p>
        </div>
        <div className="card p-5">
          <CreditCard className="text-brand mb-3" size={20} />
          <p className="text-2xl font-bold">{planCounts["Professional"] ?? 0}+{planCounts["Enterprise"] ?? 0}</p>
          <p className="text-xs opacity-60">Paid subscribers</p>
        </div>
      </div>

      {/* Platform statistics by plan */}
      <div className="card p-6 mb-8">
        <h2 className="font-semibold mb-4">Subscription plan distribution</h2>
        <div className="space-y-3">
          {Object.entries(planCounts).map(([plan, count]) => (
            <div key={plan} className="flex items-center gap-3">
              <span className="text-sm w-28 shrink-0">{plan}</span>
              <div className="flex-1 h-2 rounded-full bg-brand/10 overflow-hidden">
                <div className="h-full bg-brand" style={{ width: `${(count / users.length) * 100}%` }} />
              </div>
              <span className="text-sm opacity-60 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="card overflow-hidden mb-8">
        <div className="p-5 border-b border-brand/10">
          <h2 className="font-semibold">Manage users</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-brand/5 text-left">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold hidden sm:table-cell">Email</th>
              <th className="p-4 font-semibold">Plan</th>
              <th className="p-4 font-semibold hidden md:table-cell">Uploads</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-brand/10">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 hidden sm:table-cell opacity-70">{u.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-medium">{u.plan}</span>
                </td>
                <td className="p-4 hidden md:table-cell opacity-70">{u.uploads}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.status === "active" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-500"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => toggleStatus(u.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-brand/10 text-brand" aria-label="Toggle status">
                    {u.status === "active" ? <Ban size={15} /> : <CheckCircle2 size={15} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Uploaded images / reports management */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-brand/10">
          <h2 className="font-semibold">Uploaded images & reports</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-brand/5 text-left">
            <tr>
              <th className="p-4 font-semibold">File</th>
              <th className="p-4 font-semibold hidden sm:table-cell">Fabric Type</th>
              <th className="p-4 font-semibold hidden md:table-cell">Confidence</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t border-brand/10">
                <td className="p-4 font-medium">{r.fileName}</td>
                <td className="p-4 hidden sm:table-cell opacity-70">{r.fabricType}</td>
                <td className="p-4 hidden md:table-cell opacity-70">{r.confidenceScore}%</td>
                <td className="p-4 text-right">
                  <button onClick={() => deleteReport(r.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-red-500/10 text-red-500" aria-label="Delete report">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
