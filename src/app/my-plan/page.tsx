"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Trash2, Check, ArrowRight, Loader2 } from "lucide-react";
import { useWorkout, Workout } from "@/context/WorkoutContext";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#ccff00]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold tracking-widest uppercase">Loading workouts...</p>
      </div>
    );
  }

  const currentList = activeTab === "today" ? plan : saved;

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, curr) => acc + parseInt(String(curr.duration)) || 0, 0);
  const totalCalories = plan.reduce((acc, curr) => acc + parseInt(String(curr.calories)) || 0, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase text-white mb-2">My Plan</h1>
        <p className="text-gray-400 text-sm md:text-base">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Exercises</p>
          <p className="text-4xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Minutes</p>
          <p className="text-4xl font-black text-white">{totalMinutes}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Calories</p>
          <p className="text-4xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-8">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-5 py-2 rounded-lg font-bold text-sm transition cursor-pointer ${
            activeTab === "today"
              ? "bg-[#ccff00] text-black"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Today&apos;s Plan ({plan.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-5 py-2 rounded-lg font-bold text-sm transition cursor-pointer ${
            activeTab === "saved"
              ? "bg-[#ccff00] text-black"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {currentList.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center space-y-4">
          <h3 className="text-2xl font-black uppercase text-white tracking-wide">Nothing Here Yet</h3>
          <p className="text-gray-400 text-sm max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#b3e600] transition mt-2"
          >
            Go to workouts <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item: Workout) => {
            const itemName = item.name || item.title;
            const itemImage = item.image || item.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";

            return (
              <div
                key={item.id}
                className={`bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition ${
                  item.isDone ? "opacity-60 bg-gray-900/50" : ""
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                    <Image src={itemImage} alt={itemName || "Workout"} fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold uppercase tracking-wide text-white ${item.isDone ? "line-through text-gray-400" : ""}`}>
                      {itemName}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2">{item.equipment}</p>
                    
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#ccff00]">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame size={14} />
                        <span>{item.calories}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Star size={14} className="text-[#ccff00]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-bold transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      disabled={item.isDone}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        item.isDone
                          ? "bg-green-900/40 text-green-400 border border-green-800 cursor-not-allowed"
                          : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
                      }`}
                    >
                      <Check size={14} /> {item.isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => (activeTab === "today" ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition cursor-pointer"
                    title="Remove"
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
  );
}