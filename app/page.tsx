import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import ExperienceSection from "@/components/ExperienceSection";
import CTAFooter from "@/components/CTAFooter";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <main className="relative pb-24">
      <Navbar whatsapp={content.site.whatsapp} />
      <Hero content={content.hero} whatsapp={content.site.whatsapp} />
      <ServicesBento />
      <ExperienceSection content={content.experience} />
      <CTAFooter site={content.site} />
      <FloatingNav whatsapp={content.site.whatsapp} />
    </main>
  );
}
