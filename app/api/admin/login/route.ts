import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// In-memory rate limiter: max 5 attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_ATTEMPTS) return true;
  return false;
}

function clearAttempts(ip: string) {
  attempts.delete(ip);
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { password } = body;

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  clearAttempts(ip);

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("12h")
    .sign(SECRET);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 12,
    path: "/",
  });
  return res;
}
