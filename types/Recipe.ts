
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  steps: CookingStep[];
  tags: string[];
  isSaved?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface CookingStep {
  id: string;
  stepNumber: number;
  instruction: string;
  duration?: number; // in minutes, for timer
  image?: string;
}

export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remainingTime: number;
  isActive: boolean;
  isCompleted: boolean;
}
