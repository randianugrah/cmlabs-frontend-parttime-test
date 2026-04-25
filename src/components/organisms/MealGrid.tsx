"use client";

import React, { useState, useEffect } from 'react';
import { Meal } from '../../types/meal';
import { MealCard } from '../molecules/MealCard';
import { Search as SearchIcon, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { translateCategory, translateArea, translateIngredientName, getLocalizedMeal } from '../../utils/translator';
import { useLanguage } from '../../context/LanguageContext';

interface MealGridProps {
  meals: Meal[];
  ingredientName?: string;
  title?: string;
  type?: 'ingredient' | 'cuisine' | 'category';
}

export const MealGrid: React.FC<MealGridProps> = ({ meals, ingredientName, title, type = 'ingredient' }) => {
  const [search, setSearch] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filtered = meals.filter((item) =>
    item.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-6 md:py-10 relative">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">
            {title || <>{t('meals_with')} <span className="text-orange-500">{translateIngredientName(ingredientName || '', language)}</span></>}
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-6">
            {t('found_recipes').replace('{count}', meals.length.toString())}
          </p>

          {/* Mini Search - Left Aligned */}
          <div className="flex justify-start px-4 mb-6">
            <div className="relative flex items-center">
              <AnimatePresence>
                {(isMounted && window.innerWidth > 768) || isSearchExpanded ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder={t('search_placeholder')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    />
                    <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    {isSearchExpanded && (
                      <button
                        onClick={() => setIsSearchExpanded(false)}
                        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setIsSearchExpanded(true)}
                    className="md:hidden p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500"
                  >
                    <SearchIcon size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filtered.map((item) => (
              <MealCard
                key={item.idMeal}
                meal={item}
                from={ingredientName || title}
                type={type}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-10 rounded-full" />
              <div className="relative w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl">
                <Search size={40} className="text-slate-300 dark:text-slate-600 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
                {t('no_recipes')}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {t('no_recipes_desc').replace('{query}', search)}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
