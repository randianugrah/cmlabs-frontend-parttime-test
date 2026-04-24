import { mealService } from '@/services/mealService';
import { IngredientGrid } from '@/components/organisms/IngredientGrid';

export default async function IngredientsPage() {
  const ingredients = await mealService.getIngredients();
  console.log('ingredients', ingredients);


  return (
    <IngredientGrid ingredients={ingredients} />
  );
}
