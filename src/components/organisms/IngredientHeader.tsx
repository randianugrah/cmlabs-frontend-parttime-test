"use client";

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translateIngredientName } from '../../utils/translator';
import { Badge } from '../atoms/Badge';
import { ExpandableText } from '../atoms/ExpandableText';
import { PremiumImage } from '../atoms/PremiumImage';
import staticIngredients from '../../data/static/ingredients.json';

interface IngredientHeaderProps {
  name: string;
  type?: string;
  description?: string;
}

export const IngredientHeader: React.FC<IngredientHeaderProps> = ({ name, type, description }) => {
  const { language, t } = useLanguage();
  
  // Find localized info
  const localizedInfo = (staticIngredients as any[]).find(i => 
    i.name_en.toLowerCase() === name.toLowerCase() || 
    i.id.toLowerCase() === name.toLowerCase()
  );

  const displayName = translateIngredientName(name, language);
  const displayDescription = language === 'ID' && localizedInfo?.description_id 
    ? localizedInfo.description_id 
    : (description || "");

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 mb-12 border border-slate-100 dark:border-slate-800/50 backdrop-blur-md flex flex-col md:flex-row items-start gap-8">
      <div className="w-48 h-48 flex-shrink-0 self-center md:self-auto">
        <PremiumImage
          src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}.png`}
          alt={name}
          objectFit="contain"
          containerClassName="w-full h-full"
        />
      </div>
      <div className="text-left w-full">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4">
          {displayName}
        </h1>
        {type && (
          <Badge variant="primary" className="mb-4">
            {type.includes('Meat') ? t('cat_meat') : 
             type.includes('Poultry') ? t('cat_poultry') : 
             type.includes('Seafood') ? t('cat_seafood') : 
             type.includes('Vegetable') ? t('cat_vegetable') : type}
          </Badge>
        )}
        <ExpandableText
          text={displayDescription}
          className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl"
        />
      </div>
    </div>
  );
};
