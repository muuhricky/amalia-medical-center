"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Circle,
  GripVertical,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Square,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";
import type {
  BlockShape,
  BlockSize,
  BuilderBlock,
  BuilderData,
  BuilderSection,
} from "@/lib/builder-types";
import { SHAPE_CLASS, newBlockId } from "@/lib/builder-types";

const SHAPES: { id: BlockShape; label: string; icon: typeof Square }[] = [
  { id: "rounded", label: "Kotak lengkung", icon: Square },
  { id: "square", label: "Kotak tegas", icon: Square },
  { id: "circle", label: "Bulat", icon: Circle },
];

const SIZES: { id: BlockSize; label: string }[] = [
  { id: "s", label: "Kecil" },
  { id: "m", label: "Sedang" },
  { id: "l", label: "Lebar" },
  { id: "xl", label: "Penuh" },
];

function spanClass(size: BlockSize) {
  if (size === "xl") return "col-span-2 md:col-span-3";
  if (size === "l") return "col-span-2";
  return "col-span-1";
}

function BlockPreview({
  block,
  selected,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  block: BuilderBlock;
  selected: boolean;
  onSelect: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}) {
  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      onClick={onSelect}
      className={`group relative aspect-[4/3] overflow-hidden border-2 bg-charcoal/5 text-left transition ${SHAPE_CLASS[block.shape]} ${spanClass(block.size)} ${
        selected
          ? "border-sage ring-2 ring-sage/25"
          : "border-transparent hover:border-charcoal/15"
      }`}
    >
      <span className="absolute left-2 top-2 z-20 rounded-md bg-charcoal/55 p-1 text-cream opacity-70">
        <GripVertical className="h-3.5 w-3.5" />
      </span>
      {block.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.imageUrl}
          alt={block.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: `${block.posX}% ${block.posY}%`,
            transform: `scale(${block.zoom / 100})`,
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-charcoal/30">
          <ImagePlus className="h-8 w-8" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        <p className="truncate text-sm font-medium text-cream">{block.title || "Tanpa judul"}</p>
        <p className="truncate text-[11px] text-cream/70">{block.subtitle}</p>
      </div>
    </button>
  );
}

export default function PageBuilder() {
  const [data, setData] = useState<BuilderData | null>(null);
  const [sectionId, setSectionId] = useState("pengalaman");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  useEffect(() => {
    fetch("/api/admin/builder")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        if (json?.sections?.[0]?.id) setSectionId(json.sections[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  const section = data?.sections.find((s) => s.id === sectionId) || null;
  const selected =
    section?.blocks.find((b) => b.id === selectedId) || null;

  const updateSection = useCallback(
    (fn: (s: BuilderSection) => BuilderSection) => {
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === sectionId ? fn(s) : s
          ),
        };
      });
    },
    [sectionId]
  );

  const patchBlock = (patch: Partial<BuilderBlock>) => {
    if (!selectedId) return;
    updateSection((s) => ({
      ...s,
      blocks: s.blocks.map((b) =>
        b.id === selectedId ? { ...b, ...patch } : b
      ),
    }));
  };

  const reorder = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    updateSection((s) => {
      const blocks = [...s.blocks];
      const from = blocks.findIndex((b) => b.id === dragId);
      const to = blocks.findIndex((b) => b.id === targetId);
      if (from < 0 || to < 0) return s;
      const [item] = blocks.splice(from, 1);
      blocks.splice(to, 0, item);
      return { ...s, blocks };
    });
    setDragId(null);
  };

  const addBlock = () => {
    const block: BuilderBlock = {
      id: newBlockId(),
      imageUrl: "",
      title: "Judul baru",
      subtitle: "Keterangan singkat",
      shape: "rounded",
      size: "m",
      zoom: 100,
      posX: 50,
      posY: 50,
    };
    updateSection((s) => ({ ...s, blocks: [...s.blocks, block] }));
    setSelectedId(block.id);
  };

  const removeBlock = () => {
    if (!selectedId) return;
    updateSection((s) => ({
      ...s,
      blocks: s.blocks.filter((b) => b.id !== selectedId),
    }));
    setSelectedId(null);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setToast(null);
    try {
      const res = await fetch("/api/admin/builder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      const saved = await res.json();
      setData(saved);
      setToast({ type: "ok", text: "Builder tersimpan. Cek website publik." });
    } catch {
      setToast({ type: "err", text: "Gagal menyimpan. Coba lagi." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center gap-2 text-sm text-charcoal/50">
        <Loader2 className="h-4 w-4 animate-spin" /> Memuat builder...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Page Builder</h1>
          <p className="mt-2 max-w-xl text-sm text-charcoal/50">
            Geser kotak untuk urutan, pilih lalu atur gambar, zoom, bentuk, dan
            tulisan — tanpa coding.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sage px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-sage/90 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Simpan Builder
        </button>
      </div>

      {toast && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
            toast.type === "ok"
              ? "bg-sage/15 text-sage"
              : "bg-terracotta/15 text-terracotta"
          }`}
        >
          {toast.type === "ok" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {toast.text}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {data.sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSectionId(s.id);
              setSelectedId(null);
            }}
            className={`rounded-full px-4 py-2 text-sm transition ${
              sectionId === s.id
                ? "bg-charcoal text-cream"
                : "border border-charcoal/10 bg-cream text-charcoal/65 hover:border-charcoal/25"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-charcoal/8 bg-cream p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40">
                Kanvas
              </p>
              <p className="mt-1 text-sm text-charcoal/55">{section?.hint}</p>
            </div>
            <button
              type="button"
              onClick={addBlock}
              className="inline-flex items-center gap-1.5 rounded-xl border border-charcoal/10 px-3 py-2 text-xs font-medium hover:border-sage/40 hover:text-sage"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah kotak
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {section?.blocks.map((block) => (
              <BlockPreview
                key={block.id}
                block={block}
                selected={selectedId === block.id}
                onSelect={() => setSelectedId(block.id)}
                onDragStart={() => setDragId(block.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => reorder(block.id)}
              />
            ))}
            {!section?.blocks.length && (
              <div className="col-span-full rounded-xl border border-dashed border-charcoal/15 px-6 py-16 text-center text-sm text-charcoal/45">
                Belum ada kotak. Klik “Tambah kotak”.
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-charcoal/8 bg-cream p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40">
            Panel edit
          </p>
          {!selected ? (
            <p className="mt-4 text-sm text-charcoal/50">
              Klik salah satu kotak di kanvas untuk mengedit.
            </p>
          ) : (
            <div className="mt-4 space-y-5">
              <div>
                <p className="mb-2 text-xs font-medium text-charcoal/50">Gambar</p>
                <div className="relative aspect-video overflow-hidden rounded-xl bg-charcoal/5">
                  {selected.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selected.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{
                        objectPosition: `${selected.posX}% ${selected.posY}%`,
                        transform: `scale(${selected.zoom / 100})`,
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-charcoal/30">
                      <ImagePlus className="h-7 w-7" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="mt-2 w-full rounded-xl border border-charcoal/10 py-2 text-sm hover:border-sage/40 hover:text-sage"
                >
                  Ganti gambar
                </button>
              </div>

              <label className="block">
                <span className="text-xs font-medium text-charcoal/50">
                  Zoom ({selected.zoom}%)
                </span>
                <input
                  type="range"
                  min={80}
                  max={180}
                  value={selected.zoom}
                  onChange={(e) =>
                    patchBlock({ zoom: Number(e.target.value) })
                  }
                  className="mt-2 w-full accent-sage"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-charcoal/50">
                  Geser horizontal
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={selected.posX}
                  onChange={(e) =>
                    patchBlock({ posX: Number(e.target.value) })
                  }
                  className="mt-2 w-full accent-sage"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-charcoal/50">
                  Geser vertikal
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={selected.posY}
                  onChange={(e) =>
                    patchBlock({ posY: Number(e.target.value) })
                  }
                  className="mt-2 w-full accent-sage"
                />
              </label>

              <div>
                <p className="mb-2 text-xs font-medium text-charcoal/50">
                  Bentuk kotak
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => patchBlock({ shape: s.id })}
                      className={`rounded-xl border px-2 py-2 text-[11px] ${
                        selected.shape === s.id
                          ? "border-sage bg-sage/10 text-sage"
                          : "border-charcoal/10 text-charcoal/60"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-charcoal/50">
                  Ukuran kotak
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => patchBlock({ size: s.id })}
                      className={`rounded-lg border px-1 py-2 text-[11px] ${
                        selected.size === s.id
                          ? "border-sage bg-sage/10 text-sage"
                          : "border-charcoal/10 text-charcoal/60"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-xs font-medium text-charcoal/50">
                  Judul / nama
                </span>
                <input
                  type="text"
                  value={selected.title}
                  onChange={(e) => patchBlock({ title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-charcoal/10 bg-white px-3 py-2 text-sm outline-none focus:border-sage/50"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-charcoal/50">
                  Keterangan
                </span>
                <textarea
                  value={selected.subtitle}
                  onChange={(e) => patchBlock({ subtitle: e.target.value })}
                  rows={2}
                  className="mt-1.5 w-full resize-none rounded-xl border border-charcoal/10 bg-white px-3 py-2 text-sm outline-none focus:border-sage/50"
                />
              </label>

              <button
                type="button"
                onClick={removeBlock}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-terracotta/25 py-2 text-sm text-terracotta hover:bg-terracotta/10"
              >
                <Trash2 className="h-4 w-4" />
                Hapus kotak
              </button>
            </div>
          )}
        </aside>
      </div>

      <MediaPicker
        open={pickerOpen}
        filter="image"
        onClose={() => setPickerOpen(false)}
        onSelect={(item) => {
          patchBlock({ imageUrl: item.url });
          setPickerOpen(false);
        }}
      />
    </div>
  );
}
