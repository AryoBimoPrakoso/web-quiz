"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const text = await res.text();
    if (!text) {
      console.error("backend ngirim kosong");
      return;
    }
    const result = JSON.parse(text);
    if (res.ok) {
      alert("Berhasil membuat akun");
      console.log("Data user : ", result.userId);
    } else {
      alert("Gagal : " + result.error);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center p-10 border border-[#2d2d2d] rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-[#2d2d2d] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full max-w-sm">
          {/* Input Utama */}
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-[#2d2d2d] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            placeholder="Masukkan password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 rounded"
        >
          Register
        </button>
      </form>
      <p className="flex gap-2">
        Already have an account?
        <Link href="/login" className="underline text-blue-300">
          Login
        </Link>
      </p>
    </div>
  );
}
