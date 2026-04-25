import { mealService } from '@/services/mealService';
import { MealGrid } from '@/components/organisms/MealGrid';
import { CategoryHeader } from '@/components/organisms/CategoryHeader';

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // Fetch categories to get description
  const [allCategories, meals] = await Promise.all([
    mealService.getCategories(),
    mealService.getMealsByCategory(decodedName)
  ]);

  const categoryInfo = allCategories.find(c => c.strCategory === decodedName);

  return (
    <div className="py-8">
      {categoryInfo && (
        <CategoryHeader categoryInfo={categoryInfo} decodedName={decodedName} />
      )}
      <MealGrid meals={meals} ingredientName={decodedName} type="category" />
    </div>
  );
}
