import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const ALLOWED_SECTIONS = [
  "profile",
  "education",
  "experience",
  "projects",
  "publications",
  "skills",
  "recommendations",
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    // Production: try Netlify Blobs first
    if (process.env.NODE_ENV === "production") {
      try {
        const { getStore } = await import("@netlify/blobs");
        const store = getStore("portfolio-content");
        const raw = await store.get(section, { type: "text" });
        if (raw) {
          return NextResponse.json(JSON.parse(raw), {
            headers: { "Cache-Control": "no-store" },
          });
        }
      } catch {
        // fall through to file
      }
    }

    const filePath = join(process.cwd(), "content", `${section}.json`);
    const raw = readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(raw), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}
