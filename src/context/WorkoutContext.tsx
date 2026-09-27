"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Workout {
  id: string | number;
  name?: string;
  title?: string;
  equipment?: string;
  duration: string | number;
  calories?: string | number;
  caloriesBurned?: string | number;
  rating?: number | string;
  image?: string;
  imageUrl?: string;
  description?: string;
  muscleGroups?: string[];
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  instructions?: string[];
  isDone?: boolean;
}

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  toastMessage: string | null;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const savedPlan = localStorage.getItem("fitlog_plan");
      if (savedPlan) {
        try { return JSON.parse(savedPlan); } catch { return []; }
      }
    }
    return [];
  });

  const [saved, setSaved] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const savedWorkouts = localStorage.getItem("fitlog_saved");
      if (savedWorkouts) {
        try { return JSON.parse(savedWorkouts); } catch { return []; }
      }
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      showToast("You can only add up to 5 exercises for today's plan!");
      return;
    }
    if (!plan.some((item) => item.id === workout.id)) {
      setPlan([...plan, { ...workout, isDone: false }]);
      showToast("Added to today's plan!");
    } else {
      showToast("Already in today's plan!");
    }
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((item) => item.id !== id));
    showToast("Removed from plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (!saved.some((item) => item.id === workout.id)) {
      setSaved([...saved, workout]);
      showToast("Workout saved successfully!");
    } else {
      showToast("Already in saved workouts!");
    }
  };

  const removeFromSaved = (id: string | number) => {
    setSaved(saved.filter((item) => item.id !== id));
    showToast("Removed from saved!");
  };

  const markAsDone = (id: string | number) => {
    setPlan(
      plan.map((item) => (item.id === id ? { ...item, isDone: true } : item))
    );
    showToast("Workout marked as done!");
  };

  return (
    <WorkoutContext.Provider
      value={{ plan, saved, toastMessage, addToPlan, removeFromPlan, addToSaved, removeFromSaved, markAsDone }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-black uppercase text-xs tracking-wider px-5 py-3 rounded-xl shadow-2xl border border-black/10">
          {toastMessage}
        </div>
      )}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};