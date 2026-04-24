import { mealService } from '@/services/mealService';
import { ExploreView } from '@/components/organisms/ExploreView';

export default async function ExplorePage() {
  const [categories, areas] = await Promise.all([
    mealService.getCategories(),
    mealService.getAreas()
  ]);

  return (
    <div className="container mx-auto">
      <ExploreView categories={categories} areas={areas} />
    </div>
  );
}
