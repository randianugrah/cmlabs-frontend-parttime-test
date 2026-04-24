import axios from 'axios';
import { Ingredient, Meal, MealDetail, Category } from '../types/meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const mealService = {
  async getIngredients(): Promise<Ingredient[]> {
    const response = await axios.get(`${BASE_URL}/list.php?i=list`);
    return response.data.meals || [];
  },

  async getMealsByIngredient(ingredient: string): Promise<Meal[]> {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.data.meals || [];
  },

  async getMealDetail(id: string): Promise<MealDetail | null> {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  async getCategories(): Promise<Category[]> {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data.categories || [];
  },

  async getMealsByCategory(category: string): Promise<Meal[]> {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  async getAreas(): Promise<{ strArea: string }[]> {
    const response = await axios.get(`${BASE_URL}/list.php?a=list`);
    return response.data.meals || [];
  },

  async getMealsByArea(area: string): Promise<Meal[]> {
    const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
    return response.data.meals || [];
  },
};
