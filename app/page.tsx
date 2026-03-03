import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center justify-center">
      <h1 className="text-6xl">hi, this is quiz</h1>
      <div className="flex gap-4">
        <Link
          href="/quiz"
          className="text-xl border rounded-xl px-4 py-2 hover:scale-105 duration-300"
        >
          start
        </Link>
        <Link
          href="/login"
          className="text-xl bg-white text-black rounded-xl px-4 py-2 hover:scale-105 duration-300"
        >
          login
        </Link>
      </div>
    </div>
  );
}
