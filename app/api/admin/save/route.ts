import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getStore } from "@netlify/blobs";
import { writeFileSync } from "fs";
import { join } from "path";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const ALLOWED = [
  "profile",
  "education",
  "experience",
  "projects",
  "publications",
  "skills",
  "recommendations",
];

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section, data } = await req.json();

  if (!ALLOWED.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const json = JSON.stringify(data, null, 2);

  // In production: save to Netlify Blobs
  if (process.env.NODE_ENV === "production") {
    const store = getStore("portfolio-content");
    await store.set(section, json);
  } else {
    // In development: write directly to content/ JSON files
    const filePath = join(process.cwd(), "content", `${section}.json`);
    writeFileSync(filePath, json, "utf-8");
  }

  return NextResponse.json({ ok: true });
}
