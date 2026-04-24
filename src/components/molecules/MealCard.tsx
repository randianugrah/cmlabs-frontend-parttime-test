"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Meal } from '../../types/meal';
import { PremiumImage } from '../atoms/PremiumImage';

interface MealCardProps {
  meal: Meal;
  onLoad?: () => void;
  from?: string;
  type?: 'ingredient' | 'cuisine' | 'category';
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onLoad, from, type = 'ingredient' }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const recipeHref = from
    ? `/meal/${meal.idMeal}?from=${encodeURIComponent(from)}&type=${type}`
    : `/meal/${meal.idMeal}`;

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, []);

  const handleLoad = () => {
    if (!isLoaded) {
      setIsLoaded(true);
      onLoad?.();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100 dark:bg-slate-800"
    >
      <Link href={recipeHref} className="block h-full w-full relative">
        {/* Full Image Background with Premium Loading */}
        <PremiumImage
          src={meal.strMealThumb}
          alt={meal.strMeal}
          onLoad={handleLoad}
          containerClassName="absolute inset-0"
          className="group-hover:scale-110"
          hoverZoom={true}
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Overlay */}
        <div className="absolute inset-x-2 bottom-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl transition-all duration-500 group-hover:pb-8">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs md:text-sm font-black text-white line-clamp-2 leading-none flex-grow">
              {meal.strMeal}
            </h3>
            {/* Mobile-only Arrow Indicator */}
            <div className="md:hidden flex-shrink-0 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Desktop Hover View Recipe */}
          <div className="hidden md:flex absolute left-3 right-3 bottom-1.5 items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">
              View Recipe
            </span>
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
