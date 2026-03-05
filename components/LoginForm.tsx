"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (res.ok) {
        router.replace("/quiz");
        console.log("Data user : ", result.user);
      } else {
        alert("Gagal : " + result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center p-10 border border-[#2d2d2d] rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Login Quiz</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
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
          disabled={isLoading}
          className={`bg-blue-500 text-white mt-4 p-2 rounded ${isLoading ? "cursor-progress" : ""}`}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account yet?{" "}
        <Link href="/register" className="underline text-blue-300">
          Register
        </Link>
      </p>
    </div>
  );
}
