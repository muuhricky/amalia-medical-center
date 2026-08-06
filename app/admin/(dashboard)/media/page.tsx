"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Copy,
  ImageIcon,
  Search,
  Trash2,
  Upload,
  Video,
  Check,
} from "lucide-react";
import type { MediaItem } from "@/lib/types";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadFiles = async (files: FileList | File[]) => {
    setError("");
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        form.append("alt", file.name.replace(/\.[^.]+$/, ""));
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload gagal");
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus media ini?")) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.ok) setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const copyUrl = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = useMemo(() => {
    return media.filter((m) => {
      const matchType = filter === "all" || m.type === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        m.originalName.toLowerCase().includes(q) ||
        m.alt.toLowerCase().includes(q) ||
        m.filename.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [media, filter, query]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Media Library</h1>
          <p className="mt-2 text-sm text-charcoal/50">
            Upload, cari, dan salin URL gambar/video untuk website.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/90">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload File"}
          <input
            type="file"
            accept="image/*,video/mp4,video/webm,video/quicktime"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              if (e.target.files?.length) uploadFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border border-dashed px-6 py-10 text-center transition ${
          dragOver
            ? "border-sage bg-sage/10"
            : "border-charcoal/15 bg-cream"
        }`}
      >
        <p className="text-sm text-charcoal/55">
          Seret & lepas file ke sini, atau klik Upload File
        </p>
        <p className="mt-1 text-xs text-charcoal/35">
          Gambar max 10MB · Video max 80MB · JPG, PNG, WEBP, GIF, MP4, WEBM
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama file atau ALT..."
            className="w-full rounded-xl border border-charcoal/10 bg-cream py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sage/40"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "image", "video"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition ${
                filter === f
                  ? "bg-charcoal text-cream"
                  : "bg-cream text-charcoal/55 border border-charcoal/10"
              }`}
            >
              {f === "all" ? "Semua" : f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-charcoal/45">Memuat library...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-charcoal/8 bg-cream px-6 py-16 text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-charcoal/25" />
          <p className="mt-3 text-sm text-charcoal/50">
            Belum ada media yang cocok.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-charcoal/8 bg-cream"
            >
              <div className="aspect-video bg-charcoal/5">
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {item.originalName}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-charcoal/40">
                      {item.type === "image" ? (
                        <ImageIcon className="h-3 w-3" />
                      ) : (
                        <Video className="h-3 w-3" />
                      )}
                      {formatBytes(item.size)} ·{" "}
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
                <p className="truncate rounded-lg bg-charcoal/5 px-2 py-1.5 font-mono text-[11px] text-charcoal/50">
                  {item.url}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url, item.id)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-charcoal/10 px-3 py-2 text-xs font-medium transition hover:border-sage/40"
                  >
                    {copied === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-sage" /> Disalin
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Salin URL
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="inline-flex items-center justify-center rounded-full border border-red-200 px-3 py-2 text-xs text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
