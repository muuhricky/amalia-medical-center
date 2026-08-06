import PoliUmumPageClient from "@/components/PoliUmumPageClient";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PoliUmumPage() {
  const content = await getContent();
  return <PoliUmumPageClient content={content} />;
}
