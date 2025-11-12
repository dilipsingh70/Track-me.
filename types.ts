export interface SetEntry {
  id: string;
  reps: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: SetEntry[];
  bodyPart: string;
  imageUrl?: string; // Can be a URL or a base64 data string
  isCustom?: boolean;
}

export interface WorkoutSession {
  date: string;
  exercises: Exercise[];
}

export type View = 'logger' | 'calendar' | 'progress' | 'plans';

export interface PredefinedExercise {
    name: string;
    imageUrl: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  bodyPart: string;
  exercises: Omit<Exercise, 'id' | 'sets'>[];
}

export type WorkoutSplit = {
  [day: string]: string[]; // e.g., { 'Monday': ['Chest', 'Triceps'] }
};