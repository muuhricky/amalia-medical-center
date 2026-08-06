"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Save, X } from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";
import type { MediaItem, SiteContent } from "@/lib/types";

type Tab = "site" | "hero" | "experience" | "poliUmum";

const tabs: { id: Tab; label: string }[] = [
  { id: "site", label: "Kontak & WA" },
  { id: "hero", label: "Hero" },
  { id: "experience", label: "Experience" },
  { id: "poliUmum", label: "Poli Umum" },
];

export default function AdminKontenPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<
    | "hero"
    | "poliUmum"
    | "experience-0"
    | "experience-1"
    | "experience-2"
    | null
  >(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => setContent(data));
  }, []);

  const openPicker = (
    target: "hero" | "poliUmum" | "experience-0" | "experience-1" | "experience-2"
  ) => {
    setPickerTarget(target);
    setPickerOpen(true);
  };

  const onSelectMedia = (item: MediaItem) => {
    if (!content || !pickerTarget) return;
    if (pickerTarget === "hero") {
      setContent({
        ...content,
        hero: {
          ...content.hero,
          mediaUrl: item.url,
          mediaType: item.type,
        },
      });
    } else if (pickerTarget === "poliUmum") {
      setContent({
        ...content,
        poliUmum: {
          ...content.poliUmum,
          mediaUrl: item.url,
          mediaType: item.type,
        },
      });
    } else {
      const index = Number(pickerTarget.split("-")[1]);
      const images = [...content.experience.images];
      images[index] = { ...images[index], url: item.url };
      setContent({
        ...content,
        experience: { ...content.experience, images },
      });
    }
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal simpan");
      setContent(data);
      setMessage("Konten berhasil disimpan.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal simpan");
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return <p className="text-sm text-charcoal/45">Memuat konten...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Konten Website</h1>
          <p className="mt-2 text-sm text-charcoal/50">
            Edit teks dan pasang media dari library ke setiap section.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/90 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      {message && (
        <p className="rounded-xl bg-sage/15 px-4 py-3 text-sm text-sage">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              tab === t.id
                ? "bg-charcoal text-cream"
                : "border border-charcoal/10 bg-cream text-charcoal/55"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 rounded-2xl border border-charcoal/8 bg-cream p-6">
        {tab === "site" && (
          <>
            <Field
              label="Nomor WhatsApp (format 62...)"
              value={content.site.whatsapp}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, whatsapp: v } })
              }
            />
            <Field
              label="Telepon tampilan"
              value={content.site.phone}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, phone: v } })
              }
            />
            <Field
              label="Alamat"
              value={content.site.address}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, address: v } })
              }
            />
            <Field
              label="Email"
              value={content.site.email}
              onChange={(v) =>
                setContent({ ...content, site: { ...content.site, email: v } })
              }
            />
          </>
        )}

        {tab === "hero" && (
          <>
            <Field
              label="Eyebrow"
              value={content.hero.eyebrow}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, eyebrow: v } })
              }
            />
            <Field
              label="Headline (awal)"
              value={content.hero.headline}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, headline: v } })
              }
            />
            <Field
              label="Headline accent (italic)"
              value={content.hero.headlineAccent}
              onChange={(v) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, headlineAccent: v },
                })
              }
            />
            <Field
              label="Headline (akhir)"
              value={content.hero.headlineEnd}
              onChange={(v) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, headlineEnd: v },
                })
              }
            />
            <TextArea
              label="Subheadline"
              value={content.hero.subheadline}
              onChange={(v) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, subheadline: v },
                })
              }
            />
            <Field
              label="Teks tombol CTA"
              value={content.hero.ctaLabel}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, ctaLabel: v } })
              }
            />
            <MediaField
              label="Media Hero (opsional gambar/video)"
              url={content.hero.mediaUrl}
              type={content.hero.mediaType}
              onPick={() => openPicker("hero")}
              onClear={() =>
                setContent({
                  ...content,
                  hero: { ...content.hero, mediaUrl: "", mediaType: "" },
                })
              }
            />
          </>
        )}

        {tab === "experience" && (
          <>
            <Field
              label="Eyebrow"
              value={content.experience.eyebrow}
              onChange={(v) =>
                setContent({
                  ...content,
                  experience: { ...content.experience, eyebrow: v },
                })
              }
            />
            <Field
              label="Judul"
              value={content.experience.title}
              onChange={(v) =>
                setContent({
                  ...content,
                  experience: { ...content.experience, title: v },
                })
              }
            />
            <Field
              label="Judul italic"
              value={content.experience.titleItalic}
              onChange={(v) =>
                setContent({
                  ...content,
                  experience: { ...content.experience, titleItalic: v },
                })
              }
            />
            <TextArea
              label="Deskripsi"
              value={content.experience.description}
              onChange={(v) =>
                setContent({
                  ...content,
                  experience: { ...content.experience, description: v },
                })
              }
            />
            {content.experience.images.map((img, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-charcoal/8 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-charcoal/40">
                  Gambar {i + 1}
                </p>
                <Field
                  label="Label"
                  value={img.label}
                  onChange={(v) => {
                    const images = [...content.experience.images];
                    images[i] = { ...images[i], label: v };
                    setContent({
                      ...content,
                      experience: { ...content.experience, images },
                    });
                  }}
                />
                <Field
                  label="Caption"
                  value={img.caption}
                  onChange={(v) => {
                    const images = [...content.experience.images];
                    images[i] = { ...images[i], caption: v };
                    setContent({
                      ...content,
                      experience: { ...content.experience, images },
                    });
                  }}
                />
                <MediaField
                  label="File gambar"
                  url={img.url}
                  type={img.url ? "image" : ""}
                  onPick={() =>
                    openPicker(
                      `experience-${i}` as
                        | "experience-0"
                        | "experience-1"
                        | "experience-2"
                    )
                  }
                  onClear={() => {
                    const images = [...content.experience.images];
                    images[i] = { ...images[i], url: "" };
                    setContent({
                      ...content,
                      experience: { ...content.experience, images },
                    });
                  }}
                />
              </div>
            ))}
          </>
        )}

        {tab === "poliUmum" && (
          <>
            <Field
              label="Eyebrow"
              value={content.poliUmum.eyebrow}
              onChange={(v) =>
                setContent({
                  ...content,
                  poliUmum: { ...content.poliUmum, eyebrow: v },
                })
              }
            />
            <Field
              label="Headline"
              value={content.poliUmum.headline}
              onChange={(v) =>
                setContent({
                  ...content,
                  poliUmum: { ...content.poliUmum, headline: v },
                })
              }
            />
            <Field
              label="Headline italic"
              value={content.poliUmum.headlineItalic}
              onChange={(v) =>
                setContent({
                  ...content,
                  poliUmum: { ...content.poliUmum, headlineItalic: v },
                })
              }
            />
            <TextArea
              label="Deskripsi"
              value={content.poliUmum.description}
              onChange={(v) =>
                setContent({
                  ...content,
                  poliUmum: { ...content.poliUmum, description: v },
                })
              }
            />
            <Field
              label="Jam operasional"
              value={content.poliUmum.hours}
              onChange={(v) =>
                setContent({
                  ...content,
                  poliUmum: { ...content.poliUmum, hours: v },
                })
              }
            />
            <MediaField
              label="Media halaman Poli Umum"
              url={content.poliUmum.mediaUrl}
              type={content.poliUmum.mediaType}
              onPick={() => openPicker("poliUmum")}
              onClear={() =>
                setContent({
                  ...content,
                  poliUmum: {
                    ...content.poliUmum,
                    mediaUrl: "",
                    mediaType: "",
                  },
                })
              }
            />
          </>
        )}
      </div>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onSelectMedia}
        filter={
          pickerTarget?.startsWith("experience")
            ? "image"
            : "all"
        }
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/40">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-sage/40"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/40">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-sage/40"
      />
    </label>
  );
}

function MediaField({
  label,
  url,
  type,
  onPick,
  onClear,
}: {
  label: string;
  url: string;
  type: string;
  onPick: () => void;
  onClear: () => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-charcoal/40">
        {label}
      </p>
      {url ? (
        <div className="overflow-hidden rounded-xl border border-charcoal/10">
          <div className="aspect-video bg-charcoal/5">
            {type === "video" ? (
              <video src={url} className="h-full w-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <p className="truncate font-mono text-[11px] text-charcoal/45">
              {url}
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={onPick}
                className="rounded-full border border-charcoal/10 px-3 py-1 text-xs"
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={onClear}
                className="rounded-full border border-red-200 px-2 py-1 text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onPick}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-charcoal/15 px-4 py-8 text-sm text-charcoal/50 transition hover:border-sage/40 hover:text-sage"
        >
          <ImagePlus className="h-4 w-4" />
          Pilih dari Media Library
        </button>
      )}
    </div>
  );
}
