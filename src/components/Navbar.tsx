"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <header className="border-b border-gray-800 bg-[#121212] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      {/* বাম পাশ: আসল logo.png ইমেজ */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
        <div className="relative w-8 h-8">
          <Image 
            src="/logo.png" 
            alt="FitLog Logo" 
            fill 
            sizes="32px"
            className="object-contain" 
          />
        </div>
        <span className="font-bold text-xl tracking-wider text-white">FITLOG</span>
      </Link>

      {/* মাঝখান: লিংকস */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className={`text-sm font-semibold transition ${
            pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`text-sm font-semibold transition ${
            pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </nav>

      {/* ডান পাশ: ব্যাজ/কাউন্টার */}
      <div className="flex items-center gap-3">
        <Link href="/my-plan" className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1.5 rounded-full text-xs font-bold transition hover:bg-[#b3e600] cursor-pointer">
          <span>Plan</span>
          <span className="bg-black text-[#ccff00] rounded-full w-5 h-5 flex items-center justify-center">{plan.length}</span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 border border-gray-600 text-gray-300 px-3 py-1.5 rounded-full text-xs font-bold transition hover:border-gray-400 cursor-pointer">
          <span>Saved</span>
          <span className="bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center">{saved.length}</span>
        </Link>
      </div>
    </header>
  );
}