import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "logged out" });

  // Gunakan objek response untuk memodifikasi cookie sebelum di-return
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });

  return response;
}
