"use client";

import { useEffect, useState } from "react";
import { Check, ImageIcon, Video, X } from "lucide-react";
import type { MediaItem } from "@/lib/types";

interface MediaPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
  filter?: "image" | "video" | "all";
}

export default function MediaPicker({
  open,
  onClose,
  onSelect,
  filter = "all",
}: MediaPickerProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((data) => setMedia(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  const list = media.filter((m) =>
    filter === "all" ? true : m.type === filter
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/50"
        onClick={onClose}
        aria-label="Tutup"
      />
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-charcoal/8 px-5 py-4">
          <div>
            <h3 className="font-serif text-xl">Pilih Media</h3>
            <p className="text-xs text-charcoal/45">
              Klik file untuk dipakai di konten
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-charcoal/10 p-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <p className="text-sm text-charcoal/45">Memuat media...</p>
          ) : list.length === 0 ? (
            <div className="rounded-xl border border-dashed border-charcoal/15 px-6 py-12 text-center">
              <p className="text-sm text-charcoal/50">
                Belum ada media. Upload dulu di Media Library.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {list.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group relative overflow-hidden rounded-xl border border-charcoal/8 bg-white text-left transition hover:border-sage/40"
                >
                  <div className="aspect-square bg-charcoal/5">
                    {item.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Video className="h-8 w-8 text-charcoal/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-2">
                    {item.type === "image" ? (
                      <ImageIcon className="h-3 w-3 text-sage" />
                    ) : (
                      <Video className="h-3 w-3 text-terracotta" />
                    )}
                    <p className="truncate text-[11px] text-charcoal/60">
                      {item.originalName}
                    </p>
                  </div>
                  <span className="absolute right-2 top-2 hidden rounded-full bg-sage p-1 text-cream group-hover:block">
                    <Check className="h-3 w-3" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
