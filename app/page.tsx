import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center justify-center">
      <h1 className="text-6xl">hi, this is quiz</h1>
      <div className="flex gap-4">
        <Link
          href="/quiz"
          className="text-2xl border rounded-xl px-2 py-1 hover:scale-105 duration-300"
        >
          start
        </Link>
        <Link
          href="/login"
          className="text-2xl bg-foreground text-background rounded-xl px-2 py-1 hover:scale-105 duration-300"
        >
          login
        </Link>
      </div>
    </div>
  );
}
