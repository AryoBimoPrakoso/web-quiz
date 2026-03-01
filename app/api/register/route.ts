import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const userExist = await User.findOne({ email });
    if (userExist)
      return NextResponse.json({ error: "Email sudah ada" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return NextResponse.json({
      message: "User berhasil dibuat",
      userId: newUser._id,
      email: newUser.email
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
