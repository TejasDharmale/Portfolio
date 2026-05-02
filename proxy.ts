import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (not /admin/login or /api/admin/login)
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !pathname.startsWith("/api/admin")
  ) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      await jwtVerify(token, SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
