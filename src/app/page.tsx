"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, ChevronDown, Clock, Flame, Star, ChevronRight } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        const workoutList = Array.isArray(data) ? data : data.workouts || data.data || [];
        setWorkouts(workoutList);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      const durA = Number(a.duration) || 0;
      const durB = Number(b.duration) || 0;
      return durA - durB;
    } else if (sortBy === "calories") {
      const calA = Number(a.calories || a.caloriesBurned) || 0;
      const calB = Number(b.calories || b.caloriesBurned) || 0;
      return calA - calB;
    } else if (sortBy === "rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

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

      {/* The Library Section */}
      <section id="library" className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-black uppercase text-white mb-2">THE LIBRARY</h2>
            <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-800 px-4 py-2 rounded-xl">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
              className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
            >
              <option value="duration" className="bg-[#1a1a1a] text-white">Duration</option>
              <option value="calories" className="bg-[#1a1a1a] text-white">Calories</option>
              <option value="rating" className="bg-[#1a1a1a] text-white">Rating</option>
            </select>
            <ChevronDown size={16} className="text-gray-400 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#ccff00]">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="font-bold tracking-widest uppercase">Loading Workouts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout: Workout) => {
              const workoutName = workout.name || workout.title || "Workout";
              const workoutImage = workout.image || workout.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";
              
              const categoryTag = workout.muscleGroups && workout.muscleGroups.length > 0 
                ? workout.muscleGroups[0] 
                : "CHEST";

              const equipmentLine = workout.equipment || "Barbell, Bench";
              const durationText = `${workout.duration || 15} min`;
              const caloriesText = `${workout.calories || workout.caloriesBurned || 150} kcal`;
              const ratingText = workout.rating || "4.8";

              return (
                <div 
                  key={workout.id} 
                  className="bg-[#1a1a1a] border border-gray-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-gray-700 transition group"
                >
                  <Link href={`/workout/${workout.id}`} className="block relative h-56 w-full bg-gray-900 overflow-hidden cursor-pointer">
                    <Image
                      src={workoutImage}
                      alt={workoutName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[#ccff00] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-gray-800 z-10">
                      {categoryTag}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col grow justify-between space-y-4">
                    <div>
                      <Link href={`/workout/${workout.id}`}>
                        <h3 className="text-xl font-black uppercase text-white tracking-wide mb-1 hover:text-[#ccff00] transition">
                          {workoutName}
                        </h3>
                      </Link>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">
                        {equipmentLine}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/80 text-xs font-bold text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Clock size={15} className="text-[#ccff00]" />
                        <span>{durationText}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame size={15} className="text-[#ccff00]" />
                        <span>{caloriesText}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star size={15} className="text-[#ccff00] fill-current" />
                        <span>{ratingText}</span>
                      </div>
                    </div>

                    <Link
                      href={`/workout/${workout.id}`}
                      className="w-full bg-gray-900 hover:bg-[#ccff00] hover:text-black text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm cursor-pointer"
                    >
                      View Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}