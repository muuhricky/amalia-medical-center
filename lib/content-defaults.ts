import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  site: {
    whatsapp: "6281234567890",
    phone: "+62 812-3456-7890",
    address: "Jl. Kesehatan No. 88, Jakarta Selatan",
    email: "hello@amaliamedical.id",
  },
  hero: {
    eyebrow: "Klinik Utama · Terakreditasi Paripurna",
    headline: "Layanan Kesehatan Premium,",
    headlineAccent: "Dirancang",
    headlineEnd: "Untuk Anda.",
    subheadline:
      "Amalia Medical Center mendefinisikan ulang pengalaman medis dengan pendekatan modern, nyaman, dan personal.",
    ctaLabel: "Konsultasi Sekarang",
    mediaUrl: "/media/exterior-clinic.jpg",
    mediaType: "image",
  },
  experience: {
    eyebrow: "Pengalaman",
    title: "Fasilitas sekelas",
    titleItalic: "Boutique Hotel",
    description:
      "Kami percaya lingkungan yang tenang dan estetis mempercepat proses penyembuhan. Setiap detail — dari ruang tunggu hingga laboratorium — dirancang untuk memberikan rasa aman dan istimewa.",
    images: [
      {
        url: "/media/lobby-reception.jpg",
        label: "Lobby & Reception",
        caption: "Ruang tunggu yang hangat & teratur",
      },
      {
        url: "/media/radiology-care.jpg",
        label: "Radiologi",
        caption: "Diagnostik modern, perawatan lembut",
      },
      {
        url: "/media/lab-facility.jpg",
        label: "Laboratorium",
        caption: "Teknologi klinis terkini",
      },
    ],
  },
  poliUmum: {
    eyebrow: "Layanan · Poli Umum",
    headline: "Perawatan pertama",
    headlineItalic: "yang terasa personal.",
    description:
      "Poli Umum Amalia Medical Center adalah pintu masuk kenyamanan medis Anda — pemeriksaan menyeluruh, dokter berpengalaman, dan suasana sekelas boutique wellness.",
    hours: "Senin–Sabtu · 08.00–20.00",
    mediaUrl: "/media/doctor-portrait.jpg",
    mediaType: "image",
  },
  updatedAt: new Date().toISOString(),
};
