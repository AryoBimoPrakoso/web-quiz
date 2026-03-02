"use client";

import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Gagal logout : ", err);
    }
  };
  return (
    <div>
      <button onClick={handleLogout} className="px-2 py-1 bg-red-300">
        buat logout
      </button>
    </div>
  );
}
