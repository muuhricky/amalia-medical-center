import { NextResponse } from "next/server";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password || "");

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Password salah." },
        { status: 401 }
      );
    }

    await setSessionCookie();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal login." }, { status: 500 });
  }
}
