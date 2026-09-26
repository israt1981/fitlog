"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// Workout টাইপ ডিক্লেয়ারেশন
export interface Workout {
  id: string | number;
  name?: string;
  title?: string;
  equipment: string;
  duration: number | string;
  calories: number | string;
  rating: number | string;
  image?: string;
  imageUrl?: string;
  tags?: string[];
  category?: string[];
  isDone?: boolean;
}

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage থেকে ডেটা আনা
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    setIsLoaded(true);
  }, []);

  // ডেটা চেঞ্জ হলে LocalStorage আপডেট করা
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Cap of 5 lifts reached!");
      return;
    }
    setPlan([...plan, { ...workout, isDone: false }]);
    toast.success("Added to today's plan!");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Removed from plan");
  };

  const saveForLater = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later!");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.success("Removed from saved");
  };

  const markAsDone = (id: string | number) => {
    setPlan(
      plan.map((w) => (w.id === id ? { ...w, isDone: true } : w))
    );
    toast.success("Marked as done!");
  };

  return (
    <WorkoutContext.Provider value={{ plan, saved, addToPlan, removeFromPlan, saveForLater, removeFromSaved, markAsDone }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
};