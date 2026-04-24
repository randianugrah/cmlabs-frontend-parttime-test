import { mealService } from '@/services/mealService';
import { MealGrid } from '@/components/organisms/MealGrid';

export default async function CuisinePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const meals = await mealService.getMealsByArea(name);

  return (
    <div className="container mx-auto">
      <header className="py-10 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-slate-100 mb-4 capitalize">
          {decodeURIComponent(name)} <span className="text-orange-500">Cuisine</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Explore delicious traditional and modern recipes from {decodeURIComponent(name)}.
        </p>
      </header>
      
      <MealGrid meals={meals} title={`${decodeURIComponent(name)} Cuisine`} type="cuisine" />
    </div>
  );
}
