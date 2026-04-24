import { mealService } from '@/services/mealService';
import { MealDetailView } from '@/components/organisms/MealDetailView';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meal = await mealService.getMealDetail(id);

  if (!meal) {
    notFound();
  }

  return (
    <MealDetailView meal={meal} />
  );
}
