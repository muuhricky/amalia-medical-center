import Link from "next/link";
import { getContent } from "@/lib/content";
import { getMediaLibrary, formatBytes } from "@/lib/media";
import { FileText, Images, Upload, PanelsTopLeft, ArrowRight } from "lucide-react";

export default async function AdminOverviewPage() {
  const [content, media] = await Promise.all([getContent(), getMediaLibrary()]);
  const images = media.filter((m) => m.type === "image").length;
  const videos = media.filter((m) => m.type === "video").length;
  const totalSize = media.reduce((sum, m) => sum + m.size, 0);

  const cards = [
    {
      label: "Total Media",
      value: String(media.length),
      hint: `${images} gambar · ${videos} video`,
      href: "/admin/media",
      icon: Images,
    },
    {
      label: "Ukuran Library",
      value: formatBytes(totalSize),
      hint: "Semua file terupload",
      href: "/admin/media",
      icon: Upload,
    },
    {
      label: "Konten Terakhir",
      value: new Date(content.updatedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      hint: "Update teks / media page",
      href: "/admin/konten",
      icon: FileText,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-charcoal/50">
          Upload gambar & video, lalu pasang ke section website lewat editor
          konten.
        </p>
      </div>

      <Link
        href="/admin/builder"
        className="group flex flex-col gap-4 rounded-2xl border border-sage/25 bg-gradient-to-br from-sage/10 via-cream to-terracotta/10 p-6 transition hover:border-sage/45 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/15 text-sage">
            <PanelsTopLeft className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Page Builder</h2>
            <p className="mt-1 max-w-lg text-sm text-charcoal/55">
              Drag & drop kotak foto — ganti gambar, zoom, bentuk kotak/bulat,
              dan tulisan tanpa coding.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-xl bg-sage px-4 py-2.5 text-sm font-medium text-cream transition group-hover:bg-sage/90 md:self-center">
          Buka Builder
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-charcoal/8 bg-cream p-6 transition hover:border-sage/30"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40">
                {card.label}
              </p>
              <card.icon className="h-4 w-4 text-sage" />
            </div>
            <p className="mt-4 font-serif text-3xl">{card.value}</p>
            <p className="mt-1 text-sm text-charcoal/45">{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-charcoal/8 bg-cream p-6">
          <h2 className="font-serif text-xl">Alur kerja cepat</h2>
          <ol className="mt-4 space-y-3 text-sm text-charcoal/65">
            <li>
              <span className="font-medium text-charcoal">1.</span> Upload di{" "}
              <Link href="/admin/media" className="text-sage underline">
                Media Library
              </Link>
            </li>
            <li>
              <span className="font-medium text-charcoal">2.</span> Susun visual di{" "}
              <Link href="/admin/builder" className="text-sage underline">
                Page Builder
              </Link>
            </li>
            <li>
              <span className="font-medium text-charcoal">3.</span> Edit teks panjang di{" "}
              <Link href="/admin/konten" className="text-sage underline">
                Konten Website
              </Link>
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-charcoal/8 bg-cream p-6">
          <h2 className="font-serif text-xl">Tips pencarian file</h2>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/65">
            <li>• Pakai nama file jelas: `lobby-reception.jpg`, `poli-umum-hero.mp4`</li>
            <li>• Isi ALT text agar mudah dicari di library</li>
            <li>• Filter Image / Video di Media Library</li>
            <li>• Format: JPG/PNG/WEBP/GIF atau MP4/WEBM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
