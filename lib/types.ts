export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: MediaType;
  mimeType: string;
  size: number;
  alt: string;
  createdAt: string;
}

export interface ExperienceImage {
  url: string;
  label: string;
  caption: string;
}

export interface SiteContent {
  site: {
    whatsapp: string;
    phone: string;
    address: string;
    email: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    headlineEnd: string;
    subheadline: string;
    ctaLabel: string;
    mediaUrl: string;
    mediaType: MediaType | "";
  };
  experience: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    description: string;
    images: ExperienceImage[];
  };
  poliUmum: {
    eyebrow: string;
    headline: string;
    headlineItalic: string;
    description: string;
    hours: string;
    mediaUrl: string;
    mediaType: MediaType | "";
  };
  updatedAt: string;
}
