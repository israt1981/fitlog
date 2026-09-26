import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-auto py-8 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#ccff00]">
          <Dumbbell size={20} />
          <span className="font-bold tracking-wider text-white">FITLOG</span>
        </div>
        <p className="text-gray-500 text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}