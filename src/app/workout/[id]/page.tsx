"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useWorkout, Workout } from "@/context/WorkoutContext";
import { CheckCircle, BookmarkPlus, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function WorkoutDetails() {
  const params = useParams();
  const id = params?.id;
  const { addToPlan, addToSaved, plan, saved } = useWorkout();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchWorkoutDetails = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        const item = data.workout || data.data || data;
        setWorkout(item);
      } catch (error) {
        console.error("Failed to fetch workout details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-[#ccff00]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold tracking-widest uppercase">Loading Workout Details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-white">
        <h2 className="text-2xl font-black mb-4">Workout not found</h2>
        <Link href="/" className="text-[#ccff00] underline font-bold">Back to Home</Link>
      </div>
    );
  }

  const workoutName = workout.name || workout.title || "Workout";
  const workoutImage = workout.image || workout.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";
  const muscleGroups = workout.muscleGroups || ["Chest", "Arms"];

  const isAlreadyInPlan = plan.some((item) => String(item.id) === String(workout.id));
  const isAlreadySaved = saved.some((item) => String(item.id) === String(workout.id));

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-24">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ccff00] transition mb-8 text-sm font-bold">
        <ArrowLeft size={16} /> Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side — Visual/Media (5 cols) */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] w-full rounded-3xl overflow-hidden bg-gray-900 border border-gray-800">
          <Image
            src={workoutImage}
            alt={workoutName}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right Side — Info & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-3">
              {workoutName}
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {workout.description || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
            </p>

            {/* Category tags pills */}
            <div className="flex flex-wrap gap-2">
              {muscleGroups.map((tag, idx) => (
                <span key={idx} className="bg-[#ccff00] text-black text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Specs table/panel matching the design */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-800">
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">EQUIPMENT</span>
              <span className="text-white font-bold">{workout.equipment || "Barbell, Bench"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">DIFFICULTY</span>
              <span className="text-white font-bold">{workout.difficulty || "Intermediate"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">SETS</span>
              <span className="text-white font-bold">{workout.sets || 4}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">REPS</span>
              <span className="text-white font-bold">{workout.reps || "6-8"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">DURATION</span>
              <span className="text-white font-bold">{workout.duration} min</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">CALORIES</span>
              <span className="text-white font-bold">{workout.calories || workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider">RATING</span>
              <span className="text-white font-bold">{workout.rating || 4.8}</span>
            </div>
          </div>

          {/* Instructions section */}
          {Array.isArray(workout.instructions) && workout.instructions.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3">INSTRUCTIONS</h3>
              <ol className="space-y-2 text-xs sm:text-sm text-gray-300">
                {workout.instructions.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="text-white font-bold shrink-0">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isAlreadyInPlan}
              className={`w-full sm:flex-1 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                isAlreadyInPlan 
                  ? "bg-green-950/40 border border-green-800 text-green-400 cursor-not-allowed" 
                  : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
              }`}
            >
              {isAlreadyInPlan ? <><CheckCircle size={18} /> Added to Today&apos;s Plan</> : <><CheckCircle size={18} /> Add to today&apos;s plan</>}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isAlreadySaved}
              className={`w-full sm:w-auto px-6 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer border ${
                isAlreadySaved 
                  ? "bg-gray-900 border-gray-700 text-gray-400 cursor-not-allowed" 
                  : "bg-[#1a1a1a] border-gray-800 text-white hover:border-gray-600"
              }`}
            >
              <BookmarkPlus size={18} /> {isAlreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}