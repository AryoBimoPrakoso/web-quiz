import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token && req.nextUrl.pathname.startsWith('/quiz')) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/quiz", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quiz/:path*", "/login"],
};
