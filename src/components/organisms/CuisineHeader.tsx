"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translateArea } from '@/utils/translator';
import { Globe } from 'lucide-react';

const areaFlags: Record<string, string> = {
  Algerian: "🇩🇿",
  American: "🇺🇸",
  Argentinian: "🇦🇷",
  Australian: "🇦🇺",
  British: "🇬🇧",
  Canadian: "🇨🇦",
  Chinese: "🇨🇳",
  Croatian: "🇭🇷",
  Dutch: "🇳🇱",
  Egyptian: "🇪🇬",
  Filipino: "🇵🇭",
  French: "🇫🇷",
  Greek: "🇬🇷",
  Indian: "🇮🇳",
  Irish: "🇮🇪",
  Italian: "🇮🇹",
  Jamaican: "🇯🇲",
  Japanese: "🇯🇵",
  Kenyan: "🇰🇪",
  Malaysian: "🇲🇾",
  Mexican: "🇲🇽",
  Moroccan: "🇲🇦",
  Norwegian: "🇳🇴",
  Polish: "🇵🇱",
  Portuguese: "🇵🇹",
  Russian: "🇷🇺",
  "Saudi Arabian": "🇸🇦",
  Slovakian: "🇸🇰",
  Spanish: "🇪🇸",
  Syrian: "🇸🇾",
  Thai: "🇹🇭",
  Tunisian: "🇹🇳",
  Turkish: "🇹🇷",
  Ukrainian: "🇺🇦",
  Uruguayan: "🇺🇾",
  Venezulan: "🇻🇪",
  Vietnamese: "🇻🇳"
};

interface CuisineHeaderProps {
  decodedName: string;
}

export const CuisineHeader: React.FC<CuisineHeaderProps> = ({ decodedName }) => {
  const { language, t } = useLanguage();
  const localizedArea = translateArea(decodedName, language);
  const flag = areaFlags[decodedName] || "🌍";

  const title = language === 'ID'
    ? `${t('cuisine')} ${localizedArea}`
    : `${localizedArea} ${t('cuisine')}`;

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 mb-4 border border-slate-100 dark:border-slate-800/50 backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-orange-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-5xl shadow-sm border border-orange-100 dark:border-slate-700">
        {flag}
      </div>

      <div className="text-center md:text-left flex-1">
        <div className="inline-flex items-center justify-center md:justify-start gap-1.5 text-orange-500 font-bold text-sm tracking-wide uppercase mb-2">
          <Globe size={14} />
          <span>{t('explore_title') || "World Cuisine"}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 capitalize">
          {title}
        </h1>
      </div>
    </div>
  );
};
