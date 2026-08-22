import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getContent } from "@/lib/content";
import { getServicePage, serviceSlugs } from "@/lib/services";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function LayananSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const content = await getContent();
  return <ServiceDetailPage service={service} site={content.site} />;
}
