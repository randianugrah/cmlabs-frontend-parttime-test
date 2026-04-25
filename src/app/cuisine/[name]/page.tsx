import { mealService } from '@/services/mealService';
import { MealGrid } from '@/components/organisms/MealGrid';
import { CuisineHeader } from '@/components/organisms/CuisineHeader';

export default async function CuisinePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const meals = await mealService.getMealsByArea(name);

  return (
    <div className="container mx-auto">
      <CuisineHeader decodedName={decodedName} />
      <MealGrid meals={meals} type="cuisine" />
    </div>
  );
}
