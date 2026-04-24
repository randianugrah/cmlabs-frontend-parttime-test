import { mealService } from '@/services/mealService';
import { MealGrid } from '@/components/organisms/MealGrid';
import { Badge } from '@/components/atoms/Badge';
import { ExpandableText } from '@/components/atoms/ExpandableText';
import { PremiumImage } from '@/components/atoms/PremiumImage';

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
        <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 mb-12 border border-slate-100 dark:border-slate-800/50 backdrop-blur-md flex flex-col md:flex-row items-start gap-8">
          <div className="w-48 h-48 flex-shrink-0 self-center md:self-auto">
            <PremiumImage
              src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(decodedName)}.png`}
              alt={decodedName}
              objectFit="contain"
              containerClassName="w-full h-full"
            />
          </div>
          <div className="text-left w-full">
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4">{decodedName}</h1>
            {ingredientInfo.strType && <Badge variant="primary" className="mb-4">{ingredientInfo.strType}</Badge>}
            <ExpandableText
              text={ingredientInfo.strDescription || ""}
              className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl"
            />
          </div>
        </div>
      )}
      <MealGrid meals={meals} ingredientName={decodedName} />
    </div>
  );
}
