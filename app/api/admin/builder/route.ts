import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getBuilder, saveBuilder } from "@/lib/builder";
import type { BuilderData } from "@/lib/builder-types";

export async function GET() {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBuilder();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as BuilderData;
    if (!body?.sections || !Array.isArray(body.sections)) {
      return NextResponse.json(
        { error: "Data builder tidak lengkap." },
        { status: 400 }
      );
    }
    const saved = await saveBuilder(body);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan builder." },
      { status: 500 }
    );
  }
}
