"use client";

import React from 'react';
import { Category } from '@/types/meal';
import { PremiumImage } from '@/components/atoms/PremiumImage';
import { ExpandableText } from '@/components/atoms/ExpandableText';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategory, translateCategoryDescription } from '@/utils/translator';

interface CategoryHeaderProps {
  categoryInfo: Category;
  decodedName: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryInfo, decodedName }) => {
  const { language } = useLanguage();

  const localizedName = translateCategory(decodedName, language);
  const localizedDescription = translateCategoryDescription(decodedName, categoryInfo.strCategoryDescription, language);

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 mb-12 border border-slate-100 dark:border-slate-800/50 backdrop-blur-md flex flex-col md:flex-row items-start gap-8">
      <div className="w-64 h-44 flex-shrink-0 bg-orange-50 dark:bg-slate-800/50 rounded-2xl p-4 self-center md:self-auto">
        <PremiumImage
          src={categoryInfo.strCategoryThumb}
          alt={decodedName}
          objectFit="contain"
          containerClassName="w-full h-full"
        />
      </div>
      <div className="text-left w-full">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4">{localizedName}</h1>
        <ExpandableText
          text={localizedDescription || ""}
          className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl"
        />
      </div>
    </div>
  );
};
