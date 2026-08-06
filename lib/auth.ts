import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "amalia_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  return process.env.ADMIN_SECRET || "amalia-dev-secret-change-me";
}

function getPassword() {
  return process.env.ADMIN_PASSWORD || "amaliaadmin";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function verifyPassword(password: string) {
  const expected = getPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  if (!payload.startsWith("admin:")) return false;
  const ts = Number(payload.split(":")[1]);
  if (!Number.isFinite(ts)) return false;
  if (Date.now() - ts > MAX_AGE * 1000) return false;
  return true;
}

export async function setSessionCookie() {
  const token = createSessionToken();
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAuthenticated() {
  const jar = await cookies();
  return isValidSessionToken(jar.get(COOKIE_NAME)?.value);
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}
