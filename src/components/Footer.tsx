import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#121212] py-8 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* নেভবারের লোগোর সাথে হুবহু মিল রেখে */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="FitLog Logo" 
            width={28} 
            height={28} 
            className="object-contain" 
          />
          <span className="text-white font-black tracking-wider text-lg">FITLOG</span>
        </Link>
        
        <p className="text-gray-400 text-xs sm:text-sm text-center">
          &copy; {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}