"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../../types/meal';
import { PremiumImage } from '../atoms/PremiumImage';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleLoad = () => setIsLoaded(true);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <Link href={`/category/${category.strCategory}`} className="block h-full">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-bl-[60px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none" />
        
        <div className="relative h-full p-4 md:p-6 flex flex-col items-center text-center">
          <div className="relative h-24 md:h-32 mb-3 md:mb-4 z-10 w-full flex items-center justify-center">
            <PremiumImage
              src={category.strCategoryThumb}
              alt={category.strCategory}
              objectFit="contain"
              containerClassName="w-full h-full"
              onLoad={handleLoad}
              className="drop-shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="z-10 w-full">
            <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[9px] font-black mb-1.5 tracking-widest uppercase">
              Category
            </span>
            <h3 className="text-base md:text-xl font-black text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors">
              {category.strCategory}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
