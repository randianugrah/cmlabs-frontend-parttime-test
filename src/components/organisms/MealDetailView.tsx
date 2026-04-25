"use client";

import React, { useState } from 'react';
import { MealDetail } from '../../types/meal';
import { motion } from 'framer-motion';
import { Play, Tag, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { PremiumImage } from '../atoms/PremiumImage';
import {
  getLocalizedMeal,
  translateTag,
  parseInstructions,
  translateCategory,
  translateArea
} from '../../utils/translator';
import { useLanguage } from '../../context/LanguageContext';
import { translateInstructionsWithAI } from '../../services/gemini';

interface MealDetailViewProps {
  meal: MealDetail;
}

export const MealDetailView: React.FC<MealDetailViewProps> = ({ meal: rawMeal }) => {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [aiSteps, setAiSteps] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(false);
  const { language, t } = useLanguage();

  const meal = getLocalizedMeal(rawMeal, language);
  const ingredients = meal.ingredients;
  const youtubeId = rawMeal.strYoutube?.split('v=')[1];

  // Dynamic AI Translation logic
  /*
  React.useEffect(() => {
    let isMounted = true;

    const handleAITranslation = async () => {
      if (language === 'ID') {
        // CEK FLAG: Jika sudah hasil AI Agent, STOP di sini. Jangan generate lagi.
        if ((meal as any).source === 'AI_AGENT') return;

        // DETEKSI KUALITAS & BAHASA (Hanya untuk data non-AI):
        const stepsText = meal.steps.join(' ').toLowerCase();
        const hasEnglishWords = /\b(add|cook|heat|bake|stir|boil|fry|pan|oil|until|minutes|oven)\b/g.test(stepsText);

        const englishSteps = parseInstructions(rawMeal.strInstructions);
        const isStepMismatch = englishSteps.length !== meal.steps.length;
        const isTooShort = meal.steps.length < 6;

        // Pemicu Agent AI: Hanya jika belum ada AI_AGENT dan kualitasnya buruk
        if (aiSteps.length === 0 && (isStepMismatch || hasEnglishWords || isTooShort)) {
          setTranslationError(false);
          setIsTranslating(true);

          try {
            // Pass rawMeal.idMeal for caching
            const translated = await translateInstructionsWithAI(rawMeal.strInstructions, rawMeal.idMeal);

            if (isMounted) {
              if (translated && translated.length > 0) {
                setAiSteps(translated);

                // AUTO-SAVE & OVERWRITE to local JSON
                fetch('/api/save-meal', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    idMeal: rawMeal.idMeal,
                    strMeal: rawMeal.strMeal,
                    steps: translated,
                    ingredients: ingredients.map(i => ({ name: i.ingredient, measure: i.measure }))
                  })
                }).catch(err => console.error("Auto-save failed:", err));
              } else {
                setTranslationError(true);
              }
            }
          } catch (err: any) {
            console.error("Translation effect error:", err);
            if (isMounted) {
              if (err.message === "QUOTA_EXCEEDED") {
                setTranslationError(false);
                console.warn("AI Agent: Falling back due to quota.");
              } else {
                setTranslationError(true);
              }
            }
          } finally {
            if (isMounted) setIsTranslating(false);
          }
        }
      }
    };

    handleAITranslation();

    return () => {
      isMounted = false;
    };
  }, [language, rawMeal.idMeal, rawMeal.strInstructions]);
  */

  // Priority: AI Steps > Premium JSON Steps > Basic Translated Steps
  const displaySteps = (language === 'ID' && aiSteps.length > 0)
    ? aiSteps
    : (meal.steps || []);

  console.log('displaySteps', displaySteps);


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
            <Badge variant="primary">{translateCategory(meal.strCategory, language)}</Badge>
            <Badge variant="secondary">{translateArea(meal.strArea, language)}</Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 leading-tight">
            {meal.strMeal}
          </h1>

          <div className="flex gap-3 mb-6 flex-wrap">
            {meal.strTags?.split(',').map((tag) => {
              const trimmedTag = tag.trim();
              return (
                <div key={trimmedTag} className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                  <Tag size={14} />
                  <span>{translateTag(trimmedTag, language)}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-orange-100 dark:border-slate-800/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-orange-900 dark:text-orange-400 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-500" />
              {t('ingredients_tab')}
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
            {t('cooking_instructions')}
          </h2>
          <div className="space-y-6">
            {displaySteps.map((step, i, allSteps) => {
              const isHidden = !showAllSteps && i >= 5;

              if (isHidden && i === 5) {
                return (
                  <button
                    key="show-more"
                    onClick={() => setShowAllSteps(true)}
                    className="w-full py-4 mt-4 border-2 border-dashed border-orange-200 dark:border-slate-800 rounded-2xl text-orange-500 font-bold flex items-center justify-center gap-2 hover:bg-orange-50 dark:hover:bg-slate-900/50 transition-colors group"
                  >
                    <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
                    {t('show_more_steps', { count: allSteps.length - 5 })}
                  </button>
                );
              }

              if (isHidden) return null;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 5) * 0.05 }}
                  key={`${i}-${displaySteps.length}`}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      {i + 1}
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                      {step.replace(/^(LANGKAH|STEP)?\s*\d+[\.\:\)]\s*/i, '').trim()}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {showAllSteps && displaySteps.length > 5 && (
              <button
                onClick={() => setShowAllSteps(false)}
                className="w-full py-3 mt-6 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-orange-500 transition-colors"
              >
                <ChevronUp size={16} />
                {t('show_less')}
              </button>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          {youtubeId && (
            <div className="sticky top-24">
              <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group border border-slate-800">
                <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/50">
                  <h3 className="text-white font-bold flex items-center gap-3">
                    <Play size={20} className="text-red-500 fill-red-500" />
                    {t('watch_video')}
                  </h3>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
