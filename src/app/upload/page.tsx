"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { UploadCloud, X, FileImage, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_MB = 10;

type QueuedFile = {
  file: File;
  previewUrl: string;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  error?: string;
};

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return "Only JPG, JPEG, and PNG files are allowed.";
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return `File must be under ${MAX_SIZE_MB}MB.`;
    return null;
  };

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: QueuedFile[] = Array.from(fileList).map((file) => {
      const error = validateFile(file);
      return {
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: error ? "error" : "queued",
        error: error ?? undefined,
      };
    });
    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((qf, idx) => {
      if (qf.status === "error") return;
      simulateUpload(files.length + idx);
    });
  }, [files.length]);

  function simulateUpload(index: number) {
    setFiles((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], status: "uploading" };
      return next;
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      setFiles((prev) => {
        const next = [...prev];
        if (!next[index]) return prev;
        if (progress >= 100) {
          next[index] = { ...next[index], progress: 100, status: "done" };
          clearInterval(interval);
        } else {
          next[index] = { ...next[index], progress };
        }
        return next;
      });
    }, 300);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  const completedCount = files.filter((f) => f.status === "done").length;

  return (
    <DashboardShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload fabric image</h1>
        <p className="text-sm opacity-70 mt-1">Drag and drop, or browse to upload JPG, JPEG, or PNG images up to {MAX_SIZE_MB}MB.</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`card border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${
          dragging ? "border-brand bg-brand/5" : "border-brand/20 hover:border-brand/40"
        }`}
      >
        <UploadCloud size={40} className="mx-auto mb-4 text-brand" />
        <p className="font-semibold mb-1">Drag & drop your fabric image here</p>
        <p className="text-sm opacity-60">or click to browse from your device</p>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((qf, i) => (
            <div key={i} className="card p-4">
              <div className="relative">
                <img src={qf.previewUrl} alt={qf.file.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <FileImage size={14} className="text-brand shrink-0" />
                <span className="truncate">{qf.file.name}</span>
              </div>
              <p className="text-xs opacity-50 mb-2">{(qf.file.size / 1024 / 1024).toFixed(2)} MB</p>

              {qf.status === "error" && (
                <div className="flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle size={14} /> {qf.error}
                </div>
              )}
              {(qf.status === "uploading" || qf.status === "queued") && (
                <div className="h-1.5 rounded-full bg-brand/10 overflow-hidden">
                  <div className="h-full bg-brand transition-all" style={{ width: `${qf.progress}%` }} />
                </div>
              )}
              {qf.status === "done" && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                  <CheckCircle2 size={14} /> Upload complete
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {completedCount > 0 && (
        <button
          onClick={() => router.push(`/analysis/rep-1001`)}
          className="mt-8 px-6 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center gap-2"
        >
          <Loader2 size={16} className="animate-pulse" /> Run AI analysis on {completedCount} image{completedCount > 1 ? "s" : ""}
        </button>
      )}
    </DashboardShell>
  );
}
