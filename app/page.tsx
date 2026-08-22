import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import ExperienceSection from "@/components/ExperienceSection";
import TeamGallery from "@/components/TeamGallery";
import TrustSection from "@/components/TrustSection";
import CTAFooter from "@/components/CTAFooter";
import { getContent } from "@/lib/content";
import { getBuilder } from "@/lib/builder";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, builder] = await Promise.all([getContent(), getBuilder()]);

  const pengalaman =
    builder.sections.find((s) => s.id === "pengalaman")?.blocks || [];
  const tim = builder.sections.find((s) => s.id === "tim")?.blocks || [];
  const galeri = builder.sections.find((s) => s.id === "galeri")?.blocks || [];

  return (
    <main className="relative pb-24">
      <Navbar whatsapp={content.site.whatsapp} />
      <Hero content={content.hero} whatsapp={content.site.whatsapp} />
      <ServicesBento />
      <ExperienceSection content={content.experience} blocks={pengalaman} />
      <TeamGallery teamBlocks={tim} galleryBlocks={galeri} />
      <TrustSection />
      <CTAFooter site={content.site} />
      <FloatingNav whatsapp={content.site.whatsapp} />
    </main>
  );
}
