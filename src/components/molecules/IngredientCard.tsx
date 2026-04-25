"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ingredient } from '../../types/meal';
import { PremiumImage } from '../atoms/PremiumImage';
import { useLanguage } from '../../context/LanguageContext';
import { translateIngredientName } from '../../utils/translator';

interface IngredientCardProps {
  ingredient: Ingredient;
  onLoad?: () => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onLoad }) => {
  const { language } = useLanguage();
  const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.strIngredient)}.png`;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm md:hover:shadow-2xl transition-all duration-500 aspect-square md:aspect-[4/5] h-full cursor-pointer md:hover:-translate-y-1"
    >
      <Link href={`/ingredient/${encodeURIComponent(ingredient.strIngredient)}`} className="block w-full h-full">
        {/* Background Subtle Gradient & Aura */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-orange-500/5 dark:from-slate-400/5 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-orange-500/0 md:group-hover:bg-orange-500/[0.03] transition-colors duration-500" />

        {/* The Background Image (Balanced Intensity) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center transition-all duration-700 opacity-25 dark:opacity-35 md:group-hover:opacity-70">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1, 0, -1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-[60%] h-[60%] md:w-[70%] md:h-[70%] flex items-center justify-center"
          >
            <PremiumImage
              src={imageUrl}
              alt={ingredient.strIngredient}
              objectFit="contain"
              containerClassName="w-full h-full drop-shadow-2xl"
              onLoad={onLoad}
            />
          </motion.div>
        </div>

        {/* Text Protection (Removed Blur) */}

        {/* Premium Orange Gradient Overlay - Only on Desktop Hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-orange-500/20 via-transparent to-orange-500/5 dark:from-orange-950/40 dark:to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Overlay - Centered & Large */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 md:p-6 text-center">
          <div className="flex flex-col items-center">
            {ingredient.strType && (
              <span className="text-[8px] md:text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.4em] mb-1">
                {ingredient.strType}
              </span>
            )}

            <h3 className="text-base md:text-3xl font-bold text-slate-800 dark:text-white leading-tight tracking-wide md:group-hover:text-orange-600 dark:md:group-hover:text-orange-400 transition-colors duration-300 drop-shadow-sm">
              {translateIngredientName(ingredient.strIngredient, language)}
            </h3>

            {/* Minimalist Accent - Only on Desktop Hover */}
            <div className="hidden md:block w-12 h-1.5 bg-orange-500 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
