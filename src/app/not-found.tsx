import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-[#ccff00] mb-4">
        <Dumbbell size={64} className="animate-bounce" />
      </div>
      <h1 className="text-6xl font-black uppercase tracking-wider text-white mb-2">404</h1>
      <h2 className="text-2xl font-bold uppercase text-gray-300 mb-4">Lift Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8 text-sm">
        The workout you are looking for doesn&apos;t exist or has been moved to another rack.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#b3e600] transition"
      >
        <ArrowLeft size={18} /> Back to Library
      </Link>
    </div>
  );
}