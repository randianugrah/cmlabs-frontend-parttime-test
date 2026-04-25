import { mealService } from '@/services/mealService';
import { MealGrid } from '@/components/organisms/MealGrid';
import { IngredientHeader } from '@/components/organisms/IngredientHeader';

interface PageProps {
  params: {
    name: string;
  };
}

export default async function IngredientDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // Fetch ingredients to get description
  const allIngredients = await mealService.getIngredients();
  const ingredientInfo = allIngredients.find(i => i.strIngredient === decodedName);

  const meals = await mealService.getMealsByIngredient(decodedName);

  return (
    <div className="py-8">
      {ingredientInfo && (
        <IngredientHeader 
          name={decodedName} 
          type={ingredientInfo.strType ?? undefined} 
          description={ingredientInfo.strDescription ?? undefined} 
        />
      )}
      <MealGrid meals={meals} ingredientName={decodedName} />
    </div>
  );
}
