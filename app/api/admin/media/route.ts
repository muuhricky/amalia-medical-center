import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getMediaLibrary, saveUploadedFile } from "@/lib/media";

export async function GET() {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const media = await getMediaLibrary();
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const alt = String(form.get("alt") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    const item = await saveUploadedFile(file, alt);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload gagal.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
