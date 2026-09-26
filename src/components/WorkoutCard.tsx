import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  // API থেকে আসা ডেটার key গুলো ঠিকমতো ম্যাপ করা হচ্ছে
  const workoutName = workout.name || workout.title;
  const workoutImage = workout.image || workout.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";
  const workoutTags = workout.tags || workout.category || [];

  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] transition duration-300 border border-gray-800 hover:border-gray-600 cursor-pointer h-full flex flex-col">
        {/* ছবি */}
        <div className="relative h-48 w-full bg-gray-800">
          <Image
            src={workoutImage}
            alt={workoutName || "Workout image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* কনটেন্ট */}
        <div className="p-5 flex flex-col grow">
          {/* ক্যাটাগরি ট্যাগস */}
          <div className="flex flex-wrap gap-2 mb-3">
            {workoutTags.map((tag, index) => (
              <span key={index} className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                {tag}
              </span>
            ))}
          </div>

          {/* টাইটেল এবং ইকুইপমেন্ট */}
          <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">{workoutName}</h3>
          <p className="text-gray-400 text-sm mb-4">{workout.equipment}</p>

          {/* স্ট্যাটস */}
          <div className="mt-auto flex items-center gap-4 text-xs font-semibold text-[#ccff00]">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{workout.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={14} />
              <span>{workout.calories}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-300">
              <Star size={14} className="text-[#ccff00]" />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}