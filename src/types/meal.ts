export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetail extends Meal {
  strInstructions: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  [key: string]: string | null; // For dynamic ingredients and measures
}

export interface RecipeIngredient {
  ingredient: string;
  measure: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
