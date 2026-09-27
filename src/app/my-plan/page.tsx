"use client";

import { useWorkout } from "@/context/WorkoutContext";
import { Trash2, CheckCircle, Clock, Flame, Star, ChevronRight, Loader2, ChevronDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useWorkout();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const totalExercises = mounted ? plan.length : 0;
  
  const totalMinutes = mounted ? plan.reduce((acc, item) => {
    const num = Number(item.duration) || 0;
    return acc + num;
  }, 0) : 0;

  const totalCalories = mounted ? plan.reduce((acc, item) => {
    const num = Number(item.calories || item.caloriesBurned) || 0;
    return acc + num;
  }, 0) : 0;

  // Memoized sorting to ensure immediate re-rendering when sortBy changes
  const sortedPlan = useMemo(() => {
    return [...plan].sort((a, b) => {
      if (sortBy === "duration") {
        const durA = Number(a.duration) || 0;
        const durB = Number(b.duration) || 0;
        return durA - durB;
      } else if (sortBy === "calories") {
        const calA = Number(a.calories || a.caloriesBurned) || 0;
        const calB = Number(b.calories || b.caloriesBurned) || 0;
        return calA - calB;
      } else if (sortBy === "rating") {
        const rateA = Number(a.rating) || 0;
        const rateB = Number(b.rating) || 0;
        return rateB - rateA; // Highest rating first
      }
      return 0;
    });
  }, [plan, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-24">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">MY PLAN</h1>
        <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Summary Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Exercises</p>
          <p className="text-4xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Minutes</p>
          <p className="text-4xl font-black text-[#ccff00]">{totalMinutes}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Calories</p>
          <p className="text-4xl font-black text-[#ccff00]">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs navigation & Sort filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-4 mb-8">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("today")}
            className={`font-black uppercase text-sm tracking-wider pb-1 transition cursor-pointer relative ${
              activeTab === "today" ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Today&apos;s Plan ({mounted ? plan.length : 0})
            {activeTab === "today" && (
              <span className="absolute -bottom-4 left-0 w-full h-0.5 bg-[#ccff00]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`font-black uppercase text-sm tracking-wider pb-1 transition cursor-pointer relative ${
              activeTab === "saved" ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Saved ({mounted ? saved.length : 0})
            {activeTab === "saved" && (
              <span className="absolute -bottom-4 left-0 w-full h-0.5 bg-[#ccff00]" />
            )}
          </button>
        </div>

        {activeTab === "today" && mounted && plan.length > 0 && (
          <div className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-800 px-4 py-2 rounded-xl self-start sm:self-auto relative">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer appearance-none pr-6 uppercase"
            >
              <option value="duration" className="bg-[#1a1a1a] text-white">Duration</option>
              <option value="calories" className="bg-[#1a1a1a] text-white">Calories</option>
              <option value="rating" className="bg-[#1a1a1a] text-white">Rating</option>
            </select>
            <ChevronDown size={14} className="text-gray-400 pointer-events-none absolute right-3" />
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#ccff00]">
          <Loader2 size={40} className="animate-spin mb-4" />
          <p className="font-bold tracking-widest uppercase text-sm">Loading workouts…</p>
        </div>
      ) : (
        <>
          {activeTab === "today" ? (
            <div>
              {plan.length === 0 ? (
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-4">
                  <h3 className="text-2xl font-black uppercase text-white tracking-wide">NOTHING HERE YET</h3>
                  <p className="text-gray-400 text-sm max-w-sm">Browse the library and add a lift to get today moving.</p>
                  <Link
                    href="/"
                    className="bg-[#ccff00] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#b3e600] transition mt-2 inline-block"
                  >
                    Go to workouts
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedPlan.map((item) => {
                    const itemName = item.name || item.title || "Workout";
                    const itemImage = item.image || item.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";
                    const categoryTag = item.muscleGroups && item.muscleGroups.length > 0 ? item.muscleGroups[0] : "CHEST";
                    const durationText = `${item.duration || 15} min`;
                    const caloriesText = `${item.calories || item.caloriesBurned || 150} kcal`;
                    const ratingText = item.rating || "4.8";

                    return (
                      <div key={item.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-gray-700 transition">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="relative h-16 w-20 sm:h-20 sm:w-24 rounded-xl overflow-hidden shrink-0 bg-gray-900">
                            <img src={itemImage} alt={itemName} className="object-cover w-full h-full" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black uppercase text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded-full">
                                {categoryTag}
                              </span>
                              {item.isDone && (
                                <span className="flex items-center gap-1 text-green-400 text-[10px] font-bold bg-green-950/40 border border-green-800 px-2 py-0.5 rounded-full">
                                  <CheckCircle size={12} /> Done
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-black text-white uppercase tracking-wide">{itemName}</h3>
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mt-1">
                              <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#ccff00]" /> {durationText}</div>
                              <div className="flex items-center gap-1.5"><Flame size={14} className="text-[#ccff00]" /> {caloriesText}</div>
                              <div className="flex items-center gap-1.5"><Star size={14} className="text-[#ccff00] fill-current" /> {ratingText}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                          <Link
                            href={`/workout/${item.id}`}
                            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-bold rounded-xl transition flex items-center gap-1"
                          >
                            View Details <ChevronRight size={14} />
                          </Link>

                          {!item.isDone ? (
                            <button
                              onClick={() => markAsDone(item.id)}
                              className="px-4 py-2 bg-[#ccff00] text-black text-xs font-bold rounded-xl hover:bg-[#b3e600] transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle size={14} /> Mark as Done
                            </button>
                          ) : (
                            <span className="text-xs font-bold text-green-400 bg-green-950/40 border border-green-800 px-3 py-2 rounded-xl">
                              Completed
                            </span>
                          )}

                          <button
                            onClick={() => removeFromPlan(item.id)}
                            className="p-2.5 bg-red-950/40 text-red-400 border border-red-900 rounded-xl hover:bg-red-900/50 transition cursor-pointer"
                            title="Remove from plan"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div>
              {saved.length === 0 ? (
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-16 text-center text-gray-400">
                  <h3 className="text-xl font-black uppercase text-white tracking-wide mb-2">NOTHING SAVED YET</h3>
                  <p className="text-xs">Save your favorite lifts from the library!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {saved.map((item) => {
                    const savedName = item.name || item.title || "Workout";
                    const savedImage = item.image || item.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";
                    const categoryTag = item.muscleGroups && item.muscleGroups.length > 0 ? item.muscleGroups[0] : "CHEST";
                    const durationText = `${item.duration || 15} min`;
                    const caloriesText = `${item.calories || item.caloriesBurned || 150} kcal`;
                    const ratingText = item.rating || "4.8";

                    return (
                      <div key={item.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-20 sm:h-20 sm:w-24 rounded-xl overflow-hidden shrink-0 bg-gray-900">
                            <img src={savedImage} alt={savedName} className="object-cover w-full h-full" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded-full inline-block mb-1">
                              {categoryTag}
                            </span>
                            <h3 className="text-lg font-black text-white uppercase mb-1">{savedName}</h3>
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mt-1">
                              <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#ccff00]" /> {durationText}</div>
                              <div className="flex items-center gap-1.5"><Flame size={14} className="text-[#ccff00]" /> {caloriesText}</div>
                              <div className="flex items-center gap-1.5"><Star size={14} className="text-[#ccff00] fill-current" /> {ratingText}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/workout/${item.id}`}
                            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-bold rounded-xl transition flex items-center gap-1"
                          >
                            View Details <ChevronRight size={14} />
                          </Link>
                          <button
                            onClick={() => removeFromSaved(item.id)}
                            className="p-2.5 bg-red-950/40 text-red-400 border border-red-900 rounded-xl hover:bg-red-900/50 transition cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}