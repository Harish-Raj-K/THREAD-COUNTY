"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { mockHistory, FabricReport } from "@/lib/mockData";
import { Search, Trash2, Download, SlidersHorizontal } from "lucide-react";

export default function HistoryPage() {
  const [reports, setReports] = useState<FabricReport[]>(mockHistory);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const fabricTypes = useMemo(() => ["All", ...Array.from(new Set(mockHistory.map((r) => r.fabricType)))], []);

  const filtered = reports.filter((r) => {
    const matchesQuery = r.fileName.toLowerCase().includes(query.toLowerCase()) || r.fabricType.toLowerCase().includes(query.toLowerCase());
    const matchesType = filterType === "All" || r.fabricType === filterType;
    return matchesQuery && matchesType;
  });

  function deleteReport(id: string) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  function downloadReport(r: FabricReport) {
    const content = `ThreadCounty Report\nFile: ${r.fileName}\nFabric Type: ${r.fabricType}\nThread Density: ${r.threadDensity}\nConfidence: ${r.confidenceScore}%`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.fileName}_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analysis history</h1>
        <p className="text-sm opacity-70 mt-1">Search, filter, and manage all your previous fabric analyses.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by file name or fabric type..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand text-sm"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-lg border border-brand/20 bg-background outline-none focus:border-brand text-sm appearance-none"
          >
            {fabricTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center opacity-60 text-sm">No reports match your search.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-brand/5 text-left">
              <tr>
                <th className="p-4 font-semibold">File</th>
                <th className="p-4 font-semibold hidden sm:table-cell">Fabric Type</th>
                <th className="p-4 font-semibold hidden md:table-cell">Confidence</th>
                <th className="p-4 font-semibold hidden md:table-cell">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-brand/10 hover:bg-brand/5">
                  <td className="p-4">
                    <Link href={`/analysis/${r.id}`} className="font-medium hover:text-brand">{r.fileName}</Link>
                  </td>
                  <td className="p-4 hidden sm:table-cell opacity-70">{r.fabricType}</td>
                  <td className="p-4 hidden md:table-cell opacity-70">{r.confidenceScore}%</td>
                  <td className="p-4 hidden md:table-cell opacity-70">{new Date(r.uploadedAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => downloadReport(r)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand/10 text-brand" aria-label="Download">
                        <Download size={15} />
                      </button>
                      <button onClick={() => deleteReport(r.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-red-500" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
