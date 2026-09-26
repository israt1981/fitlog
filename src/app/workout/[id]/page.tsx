"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Check, Bookmark, Loader2 } from "lucide-react";
import { useWorkout, Workout } from "@/context/WorkoutContext";

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { addToPlan, saveForLater } = useWorkout();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  // একক ওয়ার্কআউটের ডেটা ফেচ করা
  useEffect(() => {
    if (!id) return;
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.error("Failed to fetch workout details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#ccff00]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold tracking-widest uppercase">Loading Workout Details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <button 
          onClick={() => router.push("/")}
          className="bg-[#ccff00] text-black px-6 py-2 rounded-lg font-bold cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const workoutName = workout.name || workout.title;
  const workoutImage = workout.image || workout.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";
  const workoutTags = workout.tags || workout.category || [];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition text-sm font-semibold cursor-pointer"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* বাম সাইড: বড় ছবি */}
        <div className="relative h-96 lg:h-[550px] w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          <Image 
            src={workoutImage} 
            alt={workoutName || "Workout"} 
            fill 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* ডান সাইড: ডিটেইলস ও স্পেকস */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {workoutTags.map((tag: string, index: number) => (
              <span key={index} className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-wide">
            {workoutName}
          </h1>

          <p className="text-gray-300 text-base leading-relaxed">
            A compound press that builds chest thickness, triceps, and pressing power from a stable bench.
          </p>

          {/* Specs Table */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-2 p-4 border-b border-gray-800 text-sm">
              <span className="text-gray-400 font-medium">Equipment</span>
              <span className="font-bold text-white text-right">{workout.equipment}</span>
            </div>
            <div className="grid grid-cols-2 p-4 border-b border-gray-800 text-sm">
              <span className="text-gray-400 font-medium">Difficulty</span>
              <span className="font-bold text-white text-right">Intermediate</span>
            </div>
            <div className="grid grid-cols-2 p-4 border-b border-gray-800 text-sm">
              <span className="text-gray-400 font-medium">Sets & Reps</span>
              <span className="font-bold text-white text-right">4 Sets / 6-8 Reps</span>
            </div>
            <div className="grid grid-cols-2 p-4 border-b border-gray-800 text-sm">
              <span className="text-gray-400 font-medium">Duration</span>
              <span className="font-bold text-white text-right">{workout.duration}</span>
            </div>
            <div className="grid grid-cols-2 p-4 border-b border-gray-800 text-sm">
              <span className="text-gray-400 font-medium">Calories Burn</span>
              <span className="font-bold text-white text-right">{workout.calories}</span>
            </div>
            <div className="grid grid-cols-2 p-4 text-sm">
              <span className="text-gray-400 font-medium">Rating</span>
              <span className="font-bold text-[#ccff00] text-right flex items-center justify-end gap-1">
                <Star size={14} /> {workout.rating}
              </span>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
              <li>Lie on the bench with eyes under the bar and feet planted.</li>
              <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
              <li>Press up in a slight arc until elbows lock without bouncing.</li>
              <li>Keep shoulder blades pinched and a natural arch in the back.</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => addToPlan(workout)}
              className="flex-1 bg-[#ccff00] text-black py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b3e600] transition cursor-pointer"
            >
              <Check size={18} /> Add to today&apos;s plan
            </button>
            <button 
              onClick={() => saveForLater(workout)}
              className="flex-1 bg-gray-800 text-white border border-gray-700 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-700 transition cursor-pointer"
            >
              <Bookmark size={18} /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}