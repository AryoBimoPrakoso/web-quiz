"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Login Ke App</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded text-black bg-[#ddd]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded text-black bg-[#ddd]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
