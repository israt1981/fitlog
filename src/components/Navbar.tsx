"use client";

import Link from "next/link";
import Image from "next/image";
import { useWorkout } from "@/context/WorkoutContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { plan, saved } = useWorkout();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const planCount = mounted ? plan.length : 0;
  const savedCount = mounted ? saved.length : 0;

  return (
    <nav className="w-full border-b border-gray-800 bg-[#0d0d0d] sticky top-0 z-50">
      <div className="w-full px-4 sm:px-8 md:px-12 h-20 flex items-center justify-between">
        {/* Left Side: logo.png + FITLOG text */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="FITLOG Logo" 
              width={36} 
              height={36} 
              className="object-contain h-9 w-auto"
              priority
            />
            <span className="text-xl font-black tracking-tight text-white uppercase">FITLOG</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden sm:flex items-center justify-center gap-8 text-sm font-bold uppercase tracking-wider absolute left-1/2 -translate-x-1/2">
          <Link 
            href="/" 
            className={`transition ${pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
          >
            Workouts
          </Link>
          <Link 
            href="/my-plan" 
            className={`transition ${pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Side: Plan & Saved Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/my-plan"
            className="bg-[#ccff00] text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-[#b3e600] transition cursor-pointer shadow-md"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="bg-[#1a1a1a] border border-gray-800 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:border-gray-700 transition cursor-pointer"
          >
            <span className="text-gray-400">Saved</span>
            <span className="bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}