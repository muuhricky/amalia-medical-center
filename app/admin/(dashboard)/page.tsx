import Link from "next/link";
import { getContent } from "@/lib/content";
import { getMediaLibrary, formatBytes } from "@/lib/media";
import { FileText, Images, Upload } from "lucide-react";

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
              <span className="font-medium text-charcoal">1.</span> Buka{" "}
              <Link href="/admin/media" className="text-sage underline">
                Media Library
              </Link>{" "}
              → upload gambar/video
            </li>
            <li>
              <span className="font-medium text-charcoal">2.</span> Buka{" "}
              <Link href="/admin/konten" className="text-sage underline">
                Konten Website
              </Link>{" "}
              → pilih media untuk Hero / Experience / Poli Umum
            </li>
            <li>
              <span className="font-medium text-charcoal">3.</span> Simpan, lalu
              cek tampilan di website publik
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
