"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/context/WorkoutContext";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6 w-full">
          <p className="text-[#ccff00] font-bold tracking-[0.2em] text-sm uppercase">Workout Library</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[1.1] tracking-tight text-white">
            Train with intent.<br />Log every set.
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <button 
            onClick={() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#ccff00] text-black px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b3e600] transition cursor-pointer"
          >
            BROWSE WORKOUTS <ArrowRight size={20} />
          </button>
        </div>

        {/* Banner Image Container optimized for mobile */}
        <div className="w-full md:flex-1 relative h-80 sm:h-96 md:h-[500px]">
          <Image 
            src="/banner.png" 
            alt="Gym workout banner" 
            fill 
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain" 
          />
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-gray-800">
        <div className="mb-10">
          <h2 className="text-4xl font-black uppercase text-white mb-2">The Library</h2>
          <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#ccff00]">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="font-bold tracking-widest uppercase">Loading Workouts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}