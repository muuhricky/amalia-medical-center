import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    if (!body?.site || !body?.hero || !body?.experience || !body?.poliUmum) {
      return NextResponse.json({ error: "Data konten tidak lengkap." }, { status: 400 });
    }
    const saved = await saveContent(body);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan konten." }, { status: 500 });
  }
}
