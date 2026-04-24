"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Ingredient } from '../../types/meal';
import { ChefHat } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { PremiumImage } from '../atoms/PremiumImage';

interface IngredientCardProps {
  ingredient: Ingredient;
  onLoad?: () => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onLoad }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.strIngredient)}.png`;

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
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-500 h-full"
    >
      <Link href={`/ingredient/${encodeURIComponent(ingredient.strIngredient)}`} className="flex flex-col h-full">
        {/* Background Decorative Pattern & Aura */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-orange-500/20" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" />

        <div className="relative w-full aspect-square md:aspect-auto md:p-6 flex items-center justify-center overflow-hidden">

          {/* Image Aura Glow */}
          <div className={`absolute w-32 h-32 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-2xl transition-opacity duration-500 ${isLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
          
          <motion.div 
            animate={isLoaded ? { 
              opacity: 1, 
              scale: 1,
              y: [0, -5, 0] 
            } : { opacity: 0, scale: 0.8 }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-3/4 h-3/4 md:w-28 md:h-28 group-hover:drop-shadow-[0_20px_30px_rgba(249,115,22,0.3)] transition-all duration-700"
          >
            <PremiumImage
              src={imageUrl}
              alt={ingredient.strIngredient}
              objectFit="contain"
              containerClassName="w-full h-full"
              onLoad={handleLoad}
            />
          </motion.div>

          {/* Mobile Overlay Text */}
          <div className="absolute inset-x-3 bottom-3 p-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl md:hidden border border-white/20 dark:border-slate-700/30 shadow-lg">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 line-clamp-1">
              {ingredient.strIngredient}
            </h3>
            {ingredient.strType && (
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-0.5">
                {ingredient.strType}
              </p>
            )}
          </div>
        </div>
        
        {/* Desktop Info Area */}
        <div className="hidden md:flex flex-col items-center text-center px-6 pb-6 mt-2 relative z-10">
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1 group-hover:text-orange-500 transition-colors">
            {ingredient.strIngredient}
          </h3>
          
          {ingredient.strType && (
            <div className="mb-2">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-full">{ingredient.strType}</span>
            </div>
          )}

          {ingredient.strDescription && (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 italic leading-relaxed">
              "{ingredient.strDescription}"
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
