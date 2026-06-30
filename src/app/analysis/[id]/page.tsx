"use client";

import { use, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { generateMockReport } from "@/lib/mockData";
import { Download, Share2, Gauge, Layers, Sparkles, ArrowLeft, Check } from "lucide-react";

export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const report = generateMockReport(id, `${id}.jpg`);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleDownload() {
    const content = `ThreadCounty Fabric Analysis Report
============================================
File: ${report.fileName}
Date: ${new Date(report.uploadedAt).toLocaleString()}

Fabric Type: ${report.fabricType}
Thread Density: ${report.threadDensity} threads/inch
Warp Count: ${report.warpCount}
Weft Count: ${report.weftCount}
Confidence Score: ${report.confidenceScore}%

AI Suggestions:
${report.suggestions.map((s) => `- ${s}`).join("\n")}

Note: This is a mock-generated report for demonstration purposes.
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.fileName.replace(/\.[^.]+$/, "")}_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardShell>
      <Link href="/history" className="inline-flex items-center gap-1.5 text-sm text-brand font-medium mb-6 hover:underline">
        <ArrowLeft size={14} /> Back to history
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <img src={report.imageUrl} alt={report.fileName} className="w-full rounded-2xl object-cover aspect-[4/3]" />
          <p className="text-sm opacity-60 mt-3">{report.fileName} · uploaded {new Date(report.uploadedAt).toLocaleDateString()}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Analysis Result</h1>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">
              {report.status === "completed" ? "Completed" : report.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="card p-4">
              <Layers size={18} className="text-brand mb-2" />
              <p className="text-xl font-bold">{report.threadDensity}</p>
              <p className="text-xs opacity-60">Thread density (per inch)</p>
            </div>
            <div className="card p-4">
              <Gauge size={18} className="text-brand mb-2" />
              <p className="text-xl font-bold">{report.confidenceScore}%</p>
              <p className="text-xs opacity-60">Confidence score</p>
            </div>
            <div className="card p-4">
              <p className="text-xl font-bold">{report.warpCount}</p>
              <p className="text-xs opacity-60">Warp count</p>
            </div>
            <div className="card p-4">
              <p className="text-xl font-bold">{report.weftCount}</p>
              <p className="text-xs opacity-60">Weft count</p>
            </div>
          </div>

          <div className="card p-5 mb-6">
            <p className="text-xs opacity-60 mb-1">Fabric type</p>
            <p className="font-semibold text-lg">{report.fabricType}</p>
          </div>

          <div className="card p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-brand" />
              <h2 className="font-semibold">AI Suggestions</h2>
            </div>
            <ul className="space-y-2">
              {report.suggestions.map((s, i) => (
                <li key={i} className="text-sm opacity-80 flex gap-2">
                  <span className="text-brand">•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button onClick={handleDownload} className="flex-1 py-2.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
              <Download size={16} /> Download report
            </button>
            <button onClick={handleShare} className="flex-1 py-2.5 rounded-full border border-brand/30 font-semibold hover:bg-brand/10 transition-colors flex items-center justify-center gap-2">
              {copied ? <Check size={16} /> : <Share2 size={16} />} {copied ? "Link copied" : "Share report"}
            </button>
          </div>

          <p className="text-xs opacity-50 mt-4">
            * Mock AI results shown for demonstration. Connect a real model via the Report API for production use.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
