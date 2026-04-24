"use client";

import React, { useState } from 'react';
import { MealDetail, RecipeIngredient } from '../../types/meal';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Tag, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { PremiumImage } from '../atoms/PremiumImage';

interface MealDetailViewProps {
  meal: MealDetail;
}

export const MealDetailView: React.FC<MealDetailViewProps> = ({ meal }) => {
  const [showAllSteps, setShowAllSteps] = useState(false);
  
  const getRecipeIngredients = (meal: MealDetail): RecipeIngredient[] => {
    const ingredients: RecipeIngredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient as string,
          measure: (measure as string) || '',
        });
      }
    }
    return ingredients;
  };

  const ingredients = getRecipeIngredients(meal);
  const youtubeId = meal.strYoutube?.split('v=')[1];

  return (
    <div className="py-6 md:py-12">
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-[4/3] lg:aspect-auto max-h-[400px] md:max-h-none bg-slate-100 dark:bg-slate-800"
        >
          <PremiumImage
            src={meal.strMealThumb}
            alt={meal.strMeal}
            containerClassName="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-20">
            <Badge variant="primary">{meal.strCategory}</Badge>
            <Badge variant="secondary">{meal.strArea}</Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 leading-tight">
            {meal.strMeal}
          </h1>
          
          <div className="flex gap-3 mb-6 flex-wrap">
            {meal.strTags?.split(',').map((tag) => (
              <div key={tag} className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                <Tag size={14} />
                <span>{tag}</span>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-orange-100 dark:border-slate-800/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-orange-900 dark:text-orange-400 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-500" />
              Ingredients & Measures
            </h3>
            <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
              {ingredients.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b border-orange-200/50 dark:border-orange-500/20 pb-1 text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.ingredient}</span>
                  <span className="text-orange-600 dark:text-orange-400 italic">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm">
              <CheckCircle2 size={20} />
            </div>
            Cooking Instructions
          </h2>
          <div className="space-y-6">
            {meal.strInstructions
              .split(/\r\n|\n|(?<=\.)\s+/)
              .filter(step => step.trim().length > 10)
              .map((step, i, allSteps) => {
                const isHidden = !showAllSteps && i >= 5;
                
                if (isHidden && i === 5) {
                  return (
                    <button
                      key="show-more"
                      onClick={() => setShowAllSteps(true)}
                      className="w-full py-4 mt-4 border-2 border-dashed border-orange-200 dark:border-slate-800 rounded-2xl text-orange-500 font-bold flex items-center justify-center gap-2 hover:bg-orange-50 dark:hover:bg-slate-900/50 transition-colors group"
                    >
                      <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
                      Show {allSteps.length - 5} More Steps
                    </button>
                  );
                }

                if (isHidden) return null;

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 5) * 0.1 }}
                    key={i} 
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                        {i + 1}
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                        {step.replace(/^\d+\.\s*/, '').trim()}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            {showAllSteps && meal.strInstructions.split(/\r\n|\n|(?<=\.)\s+/).filter(step => step.trim().length > 10).length > 5 && (
              <button
                onClick={() => setShowAllSteps(false)}
                className="w-full py-3 mt-6 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-orange-500 transition-colors"
              >
                <ChevronUp size={16} />
                Show Less
              </button>
            )}
          </div>
        </div>

        <div>
          {youtubeId && (
            <div className="sticky top-28">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Play className="text-red-500 fill-current" />
                Watch Video
              </h2>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
