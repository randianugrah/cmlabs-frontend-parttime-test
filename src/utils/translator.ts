import {
  CATEGORY_TRANSLATIONS,
  AREA_TRANSLATIONS,
  INGREDIENT_TRANSLATIONS,
  TAG_TRANSLATIONS
} from '../data/translations';
import { MealDetail, RecipeIngredient } from '../types/meal';
import staticCategories from '../data/static/categories.json';
import staticAreas from '../data/static/areas.json';
import staticIngredients from '../data/static/ingredients.json';
import featuredMeals from '../data/static/featured_meals.json';

export const translateCategory = (category: string, lang: string = 'ID'): string => {
  if (lang === 'EN') return category;
  const staticMatch = staticCategories.find(c => c.name.toLowerCase() === category.toLowerCase() || c.id === category);
  if (staticMatch) return staticMatch.name;
  return CATEGORY_TRANSLATIONS[category] || category;
};

export const translateTag = (tag: string, lang: string = 'ID'): string => {
  if (lang === 'EN') return tag;
  return TAG_TRANSLATIONS[tag] || tag;
};

export const translateCategoryDescription = (category: string, originalDesc: string, lang: string = 'ID'): string => {
  if (lang === 'EN') return originalDesc;
  const staticMatch = staticCategories.find(c => c.id.toLowerCase() === category.toLowerCase() || c.name.toLowerCase() === category.toLowerCase());
  if (staticMatch) return staticMatch.description;
  return originalDesc;
};



export const translateArea = (area: string, lang: string = 'ID'): string => {
  if (lang === 'EN') return area;
  if (!area) return '';

  const normalized = area.trim().toLowerCase();
  const staticMatch = staticAreas.find(a => a.en.toLowerCase() === normalized);
  if (staticMatch) return staticMatch.id;

  for (const [en, id] of Object.entries(AREA_TRANSLATIONS)) {
    if (en.toLowerCase() === normalized) return id;
  }

  return area;
};

export const translateIngredientName = (name: string, lang: string = 'ID'): string => {
  if (lang === 'EN') return name;
  const normalized = name.trim().toLowerCase();

  // 1. Check static JSON (from our new 877 ingredients list)
  const staticMatch = (staticIngredients as any[]).find(i =>
    i.name_en.toLowerCase() === normalized ||
    i.id.toLowerCase() === normalized
  );

  if (staticMatch) return staticMatch.name_id;

  // 2. Check manual translations fallback
  if (INGREDIENT_TRANSLATIONS[name.trim()]) return INGREDIENT_TRANSLATIONS[name.trim()];

  for (const [en, id] of Object.entries(INGREDIENT_TRANSLATIONS)) {
    if (normalized === en.toLowerCase()) return id;
  }

  return name;
};

export const parseInstructions = (instructions: string): string[] => {
  if (!instructions) return [];

  return instructions
    .split(/\r\n\r\n|\n\n/) // Paragraf dulu
    .flatMap(p => p.split(/\r\n|\n/)) // Baru baris baru
    .map(step => step.trim())
    .map(step => step.replace(/^(LANGKAH|STEP)?\s*\d+[\.\:\)\-]?\s*/i, '')) // Bersihkan penomoran lama walau tanpa titik
    .map(step => step.trim())
    .filter(step => step.length > 5) // Filter teks yang terlalu pendek atau sudah habis karena regex
    .filter(step => !/^(LANGKAH|STEP)\s*\d+$/i.test(step)); // Ekstra aman
};

/**
 * A basic heuristic-based translator for common cooking verbs
 * to make the instructions feel more Indonesian.
 */
const CookingVerbs: Record<string, string> = {
  'Heat': 'Panaskan',
  'Add': 'Tambahkan',
  'Fry': 'Goreng',
  'Stir': 'Aduk',
  'Cook': 'Masak',
  'Bake': 'Panggang',
  'Boil': 'Rebus',
  'Mix': 'Campurkan',
  'Chop': 'Cincang',
  'Slice': 'Iris',
  'Serve': 'Sajikan',
  'Pour': 'Tuangkan',
  'Sprinkle': 'Taburkan',
  'Season': 'Bumbui',
  'Bring to a boil': 'Didihkan'
};

export const translateInstructionStep = (step: string): string => {
  // This is a very simplified translation. 
  // In a real premium app, we might use an LLM or a more complex parser.
  // For now, we return the original if it's too complex, 
  // but we can try to replace some common starting verbs.

  let translated = step;
  for (const [en, id] of Object.entries(CookingVerbs)) {
    const regex = new RegExp(`^${en}\\s`, 'i');
    if (regex.test(translated)) {
      translated = translated.replace(regex, `${id} `);
      break;
    }
  }

  return translated;
};

export const getLocalizedMeal = (meal: MealDetail, lang: string = 'ID') => {
  if (lang === 'EN') {
    const steps = parseInstructions(meal.strInstructions);
    const ingredients: RecipeIngredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim()) {
        ingredients.push({
          ingredient: name as string,
          measure: (measure as string) || ''
        });
      }
    }
    return {
      ...meal,
      ingredients,
      steps
    };
  }

  // 0. Check if we have a premium pre-translated version
  const premiumMatch = featuredMeals.find(m => m.idMeal === meal.idMeal);
  if (premiumMatch) {
    return {
      ...meal,
      strMeal: premiumMatch.strMeal,
      strCategory: premiumMatch.strCategory,
      strArea: premiumMatch.strArea,
      ingredients: premiumMatch.ingredients.map(i => ({
        ingredient: i.name,
        measure: i.measure
      })),
      steps: (premiumMatch.steps || [])
        .map(step => step.replace(/^(LANGKAH|STEP)?\s*\d+[\.\:\)\-]?\s*/i, '').trim())
        .filter(step => step.length > 5)
        .filter(step => !/^(LANGKAH|STEP)\s*\d+$/i.test(step)),
      source: (premiumMatch as any).source
    };
  }

  const steps = parseInstructions(meal.strInstructions);

  // Extract ingredients
  const ingredients: RecipeIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({
        ingredient: translateIngredientName(name as string, lang),
        measure: (measure as string) || ''
      });
    }
  }

  return {
    ...meal,
    strMeal: translateMealName(meal.strMeal, meal.idMeal, lang),
    strCategory: translateCategory(meal.strCategory, lang),
    strArea: translateArea(meal.strArea, lang),
    ingredients,
    steps: steps.map(translateInstructionStep)
  };
};

import mealNames from '../data/static/meal_names.json';

export const translateMealName = (name: string, idMeal: string, lang: string = 'ID'): string => {
  if (lang === 'EN') return name;

  // 1. Check premium featured meals
  const premiumMatch = featuredMeals.find(m => m.idMeal === idMeal);
  if (premiumMatch) return premiumMatch.strMeal;

  // 2. Check global meal names database
  const staticMatch = mealNames.find(m => m.id === idMeal);
  if (staticMatch) return staticMatch.id_name;

  return name;
};
