import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json(
      { error: "User tidak ditemukan" },
      { status: 400 },
    );

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    return NextResponse.json({
      message: "Login berhasil",
      user: { email: user.email },
    });
  } else {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }
}
