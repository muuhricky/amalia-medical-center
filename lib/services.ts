export type ServiceSectionKind = "people" | "packages" | "equipment" | "list";

export type ServiceIconName =
  | "stethoscope"
  | "heart-pulse"
  | "microscope"
  | "syringe"
  | "activity"
  | "building"
  | "user"
  | "clipboard"
  | "shield";

export interface ServicePerson {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export interface ServicePackage {
  title: string;
  subtitle: string;
  points: string[];
}

export interface ServiceEquipment {
  name: string;
  desc: string;
}

export interface ServicePageContent {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  description: string;
  hours: string;
  waMessage: string;
  accent: string;
  heroNote: string;
  highlights: { icon: ServiceIconName; title: string; desc: string }[];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionTitleItalic: string;
  sectionIntro: string;
  sectionKind: ServiceSectionKind;
  people?: ServicePerson[];
  packages?: ServicePackage[];
  equipment?: ServiceEquipment[];
  listItems?: string[];
  ctaTitle: string;
  ctaDesc: string;
}

export const servicePages: Record<string, ServicePageContent> = {
  "dokter-spesialis": {
    slug: "dokter-spesialis",
    title: "Dokter Spesialis",
    eyebrow: "Layanan · Dokter Spesialis",
    headline: "Keahlian spesialis,",
    headlineItalic: "arah yang jelas.",
    description:
      "Tim spesialis Amalia Medical Center siap mendampingi penanganan yang membutuhkan fokus lebih dalam — dari radiologi, laboratorium klinik, hingga penyakit dalam.",
    hours: "Senin–Sabtu · sesuai jadwal praktik",
    waMessage:
      "Halo Amalia Medical Center, saya ingin konsultasi Dokter Spesialis",
    accent: "from-terracotta/25 via-terracotta-soft/20 to-cream",
    heroNote:
      "Tiga penanggung jawab spesialis di bawah ini akan dilengkapi biografi lengkap seiring pembaruan konten.",
    highlights: [
      {
        icon: "heart-pulse",
        title: "Rujukan Tepat",
        desc: "Diarahkan ke spesialis yang sesuai keluhan dan hasil pemeriksaan awal.",
      },
      {
        icon: "shield",
        title: "Standar Klinis",
        desc: "Penanganan mengikuti protokol mutu klinik yang terakreditasi.",
      },
      {
        icon: "user",
        title: "Pendampingan Personal",
        desc: "Komunikasi yang jelas antara dokter, pasien, dan keluarga.",
      },
      {
        icon: "clipboard",
        title: "Integrasi Penunjang",
        desc: "Hasil lab, radiologi, dan catatan klinik saling terhubung.",
      },
    ],
    sectionEyebrow: "Tim Spesialis",
    sectionTitle: "Kenali penanggung jawab",
    sectionTitleItalic: "spesialis kami",
    sectionIntro:
      "Template biografi singkat — nanti bisa dilengkapi foto, riwayat, dan jadwal praktik masing-masing dokter.",
    sectionKind: "people",
    people: [
      {
        name: "dr. Nurfathanah, Sp.PD",
        role: "Spesialis Penyakit Dalam · Penanggung Jawab Klinik",
        bio: "Fokus pada penanganan penyakit dalam dan koordinasi layanan klinis secara menyeluruh. Biografi lengkap menyusul.",
        imageUrl: "/media/dr-nurfathanah.jpg",
      },
      {
        name: "dr. Hasan Amin, Sp.Rad",
        role: "Spesialis Radiologi · Penanggung Jawab Radiologi",
        bio: "Mengawasi layanan pencitraan diagnostik agar hasil akurat dan prosedur tetap nyaman bagi pasien. Biografi lengkap menyusul.",
        imageUrl: "/media/dr-hasan.jpg",
      },
      {
        name: "dr. Rahmat Anshori, Sp.PK",
        role: "Spesialis Patologi Klinik · Penanggung Jawab Laboratorium",
        bio: "Menjaga mutu hasil laboratorium dan interpretasi klinis untuk mendukung keputusan medis. Biografi lengkap menyusul.",
        imageUrl: "/media/dr-rahmat.jpg",
      },
    ],
    ctaTitle: "Butuh konsultasi spesialis?",
    ctaDesc:
      "Hubungi kami via WhatsApp — kami bantu cocokkan jadwal dengan dokter yang tepat.",
  },

  "medical-check-up": {
    slug: "medical-check-up",
    title: "Medical Check Up",
    eyebrow: "Layanan · Medical Check Up",
    headline: "Pemeriksaan yang rapi,",
    headlineItalic: "hasil yang jelas.",
    description:
      "Paket MCU untuk kebutuhan pribadi maupun perusahaan — tersedia layanan walk-in di klinik dan MCU on-site di lokasi Anda.",
    hours: "Senin–Sabtu · 08.00–20.00",
    waMessage:
      "Halo Amalia Medical Center, saya ingin info paket Medical Check Up",
    accent: "from-sage-light/35 via-sage/15 to-cream",
    heroNote:
      "Pilih skema yang paling sesuai: datang langsung ke klinik, atau kami datang ke perusahaan Anda.",
    highlights: [
      {
        icon: "clipboard",
        title: "Paket Fleksibel",
        desc: "Dari skrining dasar hingga paket lengkap sesuai kebutuhan.",
      },
      {
        icon: "building",
        title: "Walk-in & On-Site",
        desc: "Datang ke klinik atau jadwalkan pemeriksaan di lokasi kerja.",
      },
      {
        icon: "microscope",
        title: "Hasil Terintegrasi",
        desc: "Lab dan penunjang dalam satu alur agar lebih cepat.",
      },
      {
        icon: "shield",
        title: "Standar Mutu",
        desc: "Prosedur mengikuti standar klinik dan kesehatan kerja.",
      },
    ],
    sectionEyebrow: "Pilihan Paket",
    sectionTitle: "MCU sesuai kebutuhan",
    sectionTitleItalic: "Anda",
    sectionIntro:
      "Template paket — nanti bisa dilengkapi harga, isi pemeriksaan, dan durasi masing-masing.",
    sectionKind: "packages",
    packages: [
      {
        title: "MCU Walk-in",
        subtitle: "Datang langsung ke klinik",
        points: [
          "Pendaftaran & alur pemeriksaan di AMC",
          "Paket dasar hingga lengkap (custom)",
          "Hasil dapat dikonsultasikan dengan dokter",
        ],
      },
      {
        title: "MCU On-Site",
        subtitle: "Tim kami datang ke lokasi Anda",
        points: [
          "Cocok untuk perusahaan & kelompok karyawan",
          "Penjadwalan fleksibel di tempat kerja",
          "Didampingi penanggung jawab MCU On-Site",
        ],
      },
      {
        title: "MCU Perusahaan",
        subtitle: "Program berkala / pre-employment",
        points: [
          "Disusun sesuai kebutuhan HRD",
          "Laporan hasil yang rapi untuk administrasi",
          "Dapat digabung dengan Hiperkes",
        ],
      },
    ],
    ctaTitle: "Mau tanya paket MCU?",
    ctaDesc:
      "Ceritakan kebutuhan Anda — walk-in atau on-site — kami bantu rekomendasikan paketnya.",
  },

  vaksinasi: {
    slug: "vaksinasi",
    title: "Vaksinasi",
    eyebrow: "Layanan · Vaksinasi",
    headline: "Imunisasi aman,",
    headlineItalic: "prosedur jelas.",
    description:
      "Layanan vaksinasi untuk dewasa, kebutuhan perjalanan, dan persyaratan pekerjaan — dengan penyimpanan serta prosedur sesuai standar.",
    hours: "Senin–Sabtu · 08.00–20.00",
    waMessage: "Halo Amalia Medical Center, saya ingin info layanan Vaksinasi",
    accent: "from-sage/25 via-sage-mist to-cream",
    heroNote:
      "Konsultasikan jenis vaksin yang Anda butuhkan sebelum penjadwalan.",
    highlights: [
      {
        icon: "syringe",
        title: "Standar Keamanan",
        desc: "Penyimpanan dan pemberian vaksin mengikuti protokol yang berlaku.",
      },
      {
        icon: "user",
        title: "Didampingi Dokter",
        desc: "Skrining singkat sebelum vaksinasi untuk kenyamanan Anda.",
      },
      {
        icon: "clipboard",
        title: "Catatan Imunisasi",
        desc: "Dokumentasi yang rapi untuk keperluan pribadi maupun kerja.",
      },
      {
        icon: "shield",
        title: "Edukasi Pasca Vaksin",
        desc: "Penjelasan reaksi yang mungkin muncul dan cara mengatasinya.",
      },
    ],
    sectionEyebrow: "Cakupan Layanan",
    sectionTitle: "Jenis vaksinasi",
    sectionTitleItalic: "yang tersedia",
    sectionIntro:
      "Daftar awal — nanti bisa dilengkapi jenis vaksin, jadwal, dan ketersediaan stok.",
    sectionKind: "list",
    listItems: [
      "Vaksinasi dewasa (umum)",
      "Vaksinasi untuk persyaratan kerja",
      "Vaksinasi perjalanan / travel",
      "Konsultasi pilihan vaksin",
      "Dokumentasi & sertifikat (jika dibutuhkan)",
      "Edukasi efek samping ringan",
    ],
    ctaTitle: "Siap jadwalkan vaksinasi?",
    ctaDesc:
      "Hubungi kami untuk cek ketersediaan vaksin dan slot waktu yang nyaman.",
  },

  "pemeriksaan-penunjang": {
    slug: "pemeriksaan-penunjang",
    title: "Pemeriksaan Penunjang",
    eyebrow: "Layanan · Pemeriksaan Penunjang",
    headline: "Alat diagnostik,",
    headlineItalic: "satu atap.",
    description:
      "Fasilitas penunjang di dalam klinik membantu mempercepat diagnosis — tanpa perlu berpindah ke banyak tempat.",
    hours: "Senin–Sabtu · 08.00–20.00",
    waMessage:
      "Halo Amalia Medical Center, saya ingin info Pemeriksaan Penunjang",
    accent: "from-charcoal/8 via-sage/15 to-cream",
    heroNote:
      "Berikut ringkasan peralatan yang akan ditampilkan lebih detail seiring update konten.",
    highlights: [
      {
        icon: "microscope",
        title: "Dalam Satu Klinik",
        desc: "Pemeriksaan penunjang terintegrasi dengan layanan dokter.",
      },
      {
        icon: "activity",
        title: "Hasil Lebih Cepat",
        desc: "Alur yang ringkas dari permintaan hingga pembacaan hasil.",
      },
      {
        icon: "shield",
        title: "Prosedur Nyaman",
        desc: "Petugas menjelaskan setiap langkah sebelum pemeriksaan.",
      },
      {
        icon: "clipboard",
        title: "Didukung Spesialis",
        desc: "Radiologi dan laboratorium diawasi penanggung jawab terkait.",
      },
    ],
    sectionEyebrow: "Fasilitas Alat",
    sectionTitle: "Peralatan yang tersedia",
    sectionTitleItalic: "di klinik",
    sectionIntro:
      "Template daftar alat — nanti bisa ditambah foto, spesifikasi, dan alur pemeriksaan.",
    sectionKind: "equipment",
    equipment: [
      {
        name: "Rontgen",
        desc: "Pencitraan diagnostik untuk mendukung evaluasi klinis.",
      },
      {
        name: "USG",
        desc: "Pemeriksaan ultrasonografi sesuai indikasi dokter.",
      },
      {
        name: "Treadmill",
        desc: "Uji beban / kebugaran sesuai kebutuhan MCU & klinis.",
      },
      {
        name: "Laboratorium",
        desc: "Analisa sampel dengan peralatan klinis modern.",
      },
      {
        name: "Elektrokardiografi (EKG)",
        desc: "Pemeriksaan aktivitas listrik jantung.",
      },
      {
        name: "Peralatan pendukung lain",
        desc: "Fasilitas tambahan sesuai layanan yang berjalan di klinik.",
      },
    ],
    ctaTitle: "Butuh pemeriksaan penunjang?",
    ctaDesc:
      "Tanyakan ketersediaan alat dan jadwal — kami bantu arahkan prosedurnya.",
  },

  "pemeriksaan-tenaga-kerja": {
    slug: "pemeriksaan-tenaga-kerja",
    title: "Pemeriksaan Kesehatan Tenaga Kerja",
    eyebrow: "Layanan · Kesehatan Tenaga Kerja",
    headline: "Hiperkes & MCU kerja,",
    headlineItalic: "siap untuk industri.",
    description:
      "Layanan pemeriksaan kesehatan kerja untuk pre-employment, periodic check, dan kebutuhan perusahaan — termasuk skema on-site.",
    hours: "Senin–Sabtu · sesuai perjanjian",
    waMessage:
      "Halo Amalia Medical Center, saya ingin info Pemeriksaan Kesehatan Tenaga Kerja",
    accent: "from-terracotta-soft/40 via-peach to-cream",
    heroNote:
      "Cocok untuk HRD, kontraktor, dan penempatan kerja yang membutuhkan hasil resmi.",
    highlights: [
      {
        icon: "building",
        title: "Siap Perusahaan",
        desc: "Alur dan laporan disusun agar mudah dipakai administrasi HRD.",
      },
      {
        icon: "activity",
        title: "On-Site Available",
        desc: "Pemeriksaan dapat dijadwalkan di lokasi kerja Anda.",
      },
      {
        icon: "shield",
        title: "Standar Hiperkes",
        desc: "Mengacu pada kebutuhan kesehatan kerja yang berlaku.",
      },
      {
        icon: "clipboard",
        title: "Paket Dapat Disusun",
        desc: "Isi pemeriksaan menyesuaikan jenis pekerjaan dan risiko.",
      },
    ],
    sectionEyebrow: "Skema Layanan",
    sectionTitle: "Pilihan pemeriksaan",
    sectionTitleItalic: "tenaga kerja",
    sectionIntro:
      "Template paket — nanti bisa dilengkapi form, daftar uji, dan contoh laporan.",
    sectionKind: "packages",
    packages: [
      {
        title: "Pre-Employment Medical Check",
        subtitle: "Sebelum karyawan mulai bekerja",
        points: [
          "Skrining sesuai kebutuhan posisi",
          "Dokumen hasil untuk onboarding",
          "Dapat digabung vaksinasi bila diperlukan",
        ],
      },
      {
        title: "Periodic / Annual Check",
        subtitle: "Pemantauan kesehatan berkala",
        points: [
          "Jadwal rutin untuk karyawan",
          "Laporan ringkas untuk manajemen",
          "Rekomendasi follow-up bila ada temuan",
        ],
      },
      {
        title: "MCU / Hiperkes On-Site",
        subtitle: "Tim datang ke lokasi perusahaan",
        points: [
          "Efisien untuk jumlah peserta banyak",
          "Didampingi penanggung jawab MCU On-Site",
          "Koordinasi HRD dari awal hingga hasil",
        ],
      },
    ],
    ctaTitle: "Mau diskusikan kebutuhan HRD?",
    ctaDesc:
      "Kirim perkiraan jumlah peserta dan jenis pekerjaan — kami bantu susun paketnya.",
  },
};

export function getServicePage(slug: string) {
  return servicePages[slug] ?? null;
}

export const serviceSlugs = Object.keys(servicePages);

/** Map homepage card id → detail slug */
export const serviceCardRoutes: Record<
  string,
  { href: string; accentFrom: string; accentTo: string }
> = {
  "poli-umum": {
    href: "/layanan/poli-umum",
    accentFrom: "rgba(63,154,90,0.35)",
    accentTo: "rgba(247,245,240,1)",
  },
  spesialis: {
    href: "/layanan/dokter-spesialis",
    accentFrom: "rgba(224,138,60,0.35)",
    accentTo: "rgba(247,245,240,1)",
  },
  mcu: {
    href: "/layanan/medical-check-up",
    accentFrom: "rgba(168,208,180,0.45)",
    accentTo: "rgba(247,245,240,1)",
  },
  vaksinasi: {
    href: "/layanan/vaksinasi",
    accentFrom: "rgba(63,154,90,0.28)",
    accentTo: "rgba(247,245,240,1)",
  },
  penunjang: {
    href: "/layanan/pemeriksaan-penunjang",
    accentFrom: "rgba(26,26,26,0.12)",
    accentTo: "rgba(247,245,240,1)",
  },
  hiperkes: {
    href: "/layanan/pemeriksaan-tenaga-kerja",
    accentFrom: "rgba(243,210,176,0.55)",
    accentTo: "rgba(247,245,240,1)",
  },
};
