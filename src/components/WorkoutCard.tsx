import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, ChevronRight } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const workoutName = workout.name || workout.title || "Workout";
  const workoutImage = workout.image || workout.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-gray-700 transition group">
      <div className="relative h-56 w-full bg-gray-900 overflow-hidden">
        <Image
          src={workoutImage}
          alt={workoutName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[#ccff00] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-gray-800">
          {workout.equipment || "Bodyweight"}
        </span>
      </div>

      <div className="p-6 flex flex-col grow justify-between space-y-4">
        <div>
          <h3 className="text-xl font-black uppercase text-white tracking-wide mb-2">
            {workoutName}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2">
            {workout.description || "Execute with proper form, keep your core braced, and push through each repetition with intention."}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800/80 text-xs font-bold text-gray-300">
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-[#ccff00]" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame size={15} className="text-[#ccff00]" />
            <span>{workout.calories}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={15} className="text-[#ccff00] fill-current" />
            <span>{workout.rating}</span>
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
}