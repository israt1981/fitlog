# FitLog — Train With Intent

FitLog is a dark, no-nonsense gym companion built with **Next.js (App Router)** and **Tailwind CSS**. It allows users to browse a professional workout library, inspect detailed movement breakdowns, and manage their daily training plans with live metrics tracking.

## Features
- **Dynamic Workout Library**: Fetches workouts directly from the FitLog API with category tags, duration, and calories.
- **Detailed Workout View**: Dynamic routing (`/workout/[id]`) showing specifications, instructions, and interactive action buttons.
- **My Plan & Saved Tabs**: LocalStorage-powered global state management to track today's active lifts and saved favorites.
- **Live Metrics**: Automatically calculates total exercises, minutes, and calories for the day.
- **Custom 404 Page**: Handles missing routes with a clean dark-themed UI.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast