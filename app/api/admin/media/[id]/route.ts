import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteMedia, updateMediaAlt } from "@/lib/media";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const item = await updateMediaAlt(id, String(body.alt || ""));
    return NextResponse.json(item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal update.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteMedia(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal hapus.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
