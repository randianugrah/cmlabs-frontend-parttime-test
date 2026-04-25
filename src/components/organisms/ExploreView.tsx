"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Category } from '../../types/meal';
import { CategoryCard } from '../molecules/CategoryCard';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, LayoutGrid, Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translateCategory, translateArea } from '../../utils/translator';
import { useLanguage } from '../../context/LanguageContext';

interface ExploreViewProps {
  categories: Category[];
  areas: { strArea: string }[];
}

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

export const ExploreView: React.FC<ExploreViewProps> = ({ categories, areas }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const tabParam = searchParams.get('tab');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'categories' | 'cuisines'>('categories');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (tabParam === 'cuisines') {
      setActiveTab('cuisines');
    } else if (tabParam === 'categories') {
      setActiveTab('categories');
    }
  }, [tabParam]);

  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((cat) => {
      const originalName = cat.strCategory.toLowerCase();
      const translatedName = translateCategory(cat.strCategory, 'ID').toLowerCase();
      const query = searchQuery.toLowerCase();
      return originalName.includes(query) || translatedName.includes(query);
    });
    
    return [...filtered].sort((a, b) => {
      if (a.strCategory.toLowerCase() === 'pork') return 1;
      if (b.strCategory.toLowerCase() === 'pork') return -1;
      return 0;
    });
  }, [categories, searchQuery]);

  const filteredAreas = useMemo(() => 
    areas.filter((area) => area.strArea.toLowerCase().includes(searchQuery.toLowerCase())),
    [areas, searchQuery]
  );

  return (
    <section className="py-6 md:py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">
          {t('explore_title')}
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 px-4">
          {t('explore_subtitle')}
        </p>

        {/* Tab Switcher & Mini Search Container */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'categories'
                  ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <LayoutGrid size={18} />
              <span>{t('categories')}</span>
            </button>
            <button
              onClick={() => setActiveTab('cuisines')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'cuisines'
                  ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Globe size={18} />
              <span>{t('cuisines')}</span>
            </button>
          </div>

          <div className="w-full flex justify-start px-4">
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
                      placeholder={activeTab === 'categories' ? t('search_category') : t('search_area')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
      </div>

      {activeTab === 'categories' ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredCategories.map((category) => (
            <CategoryCard 
              key={category.idCategory} 
              category={category} 
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredAreas.map((area) => (
            <Link
              key={area.strArea}
              href={`/cuisine/${area.strArea}`}
              className="group bg-white dark:bg-slate-800/50 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 transition-all hover:shadow-xl text-center"
            >
              <div className="text-4xl mb-3 transform transition-transform group-hover:scale-125 group-hover:-rotate-12 duration-300">
                {areaFlags[area.strArea] || "🏳️"}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors">
                {translateArea(area.strArea, language)}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{t('view_recipe')}</p>
            </Link>
          ))}
        </div>
      )}

      {(activeTab === 'categories' ? filteredCategories : filteredAreas).length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl">
          <p className="text-slate-400">
            {t('no_results_found').replace('{query}', searchQuery)}
          </p>
        </div>
      )}
    </section>
  );
};
