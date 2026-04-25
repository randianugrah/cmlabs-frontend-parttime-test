"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ID' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, any>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ID: {
    search_placeholder: "Cari menu...",
    found_recipes: "Ditemukan {count} resep.",
    meals_with: "Menu dengan",
    view_recipe: "Lihat Resep",
    no_recipes: "Resep tidak ditemukan",
    no_recipes_desc: "Kami tidak menemukan resep yang cocok dengan \"{query}\". Coba kata kunci lain!",
    ingredients_tab: "Bahan-bahan",
    explore_tab: "Eksplorasi",
    watch_video: "Tonton Video",
    show_less: "Sembunyikan",
    read_more: "Baca Selengkapnya",
    more_steps: "Langkah Lagi",
    show_more_steps: "Tampilkan {count} Langkah Lagi",
    cooking_instructions: "Petunjuk Memasak",
    categories_title: "Kategori Kuliner",
    cuisines_title: "Citarasa Dunia",
    explore_title: "Temukan Citarasa Dunia",
    explore_subtitle: "Petualangan rasa tanpa batas. Telusuri ragam kuliner pilihan dari berbagai penjuru dunia.",
    categories: "Kategori",
    cuisines: "Wilayah",
    search_category: "Cari kategori...",
    search_area: "Cari wilayah...",
    search_placeholder_home: "Cari resep hari ini...",
    explore: 'Eksplorasi',
    cuisine: 'Kuliner',
    category: 'Kategori',
    recipe: 'Resep',
    ingredients: 'Bahan',
    culinary_library: 'Galeri Kuliner',
    cat_meat: 'Daging',
    cat_poultry: 'Unggas',
    cat_vegetable: 'Sayuran',
    cat_seafood: 'Makanan Laut',
    cat_fruit: 'Buah',
    cat_spice: 'Bumbu & Saus',
    cat_dairy: 'Produk Susu',
    cat_grains_nuts: 'Tepung, Biji & Kacang',
    cat_pantry: 'Dapur',
    no_results_found: 'Tidak ada hasil ditemukan untuk "{query}"',
    all_categories: 'Semua Kategori',
    ingredients_title: "Temukan Bahan & Rasa",
    ingredients_subtitle: "Karya kuliner bermula dari sini. Hadirkan citarasa autentik dunia langsung di dapur.",
    search_ingredients: "Cari bahan...",
    no_ingredients_found: "Tidak ada bahan yang ditemukan untuk \"{query}\"",
  },
  EN: {
    search_placeholder: "Search meals...",
    found_recipes: "Found {count} recipes.",
    meals_with: "Meals with",
    view_recipe: "View Recipe",
    no_recipes: "No recipes found",
    no_recipes_desc: "We couldn't find any recipes matching \"{query}\". Try a different keyword!",
    ingredients_tab: "Ingredients",
    explore_tab: "Explore",
    watch_video: "Watch Video",
    show_less: "Show Less",
    read_more: "Read More",
    more_steps: "More Steps",
    show_more_steps: "Show {count} More Steps",
    cooking_instructions: "Cooking Instructions",
    categories_title: "Culinary Categories",
    cuisines_title: "World Cuisines",
    explore_title: "Discover World Cuisines",
    explore_subtitle: "Endless flavor adventures. Browse a selection of fine cuisines from around the globe.",
    categories: "Categories",
    cuisines: "Cuisines",
    search_category: "Search categories...",
    search_area: "Search areas...",
    search_placeholder_home: "Search recipes today...",
    explore: 'Explore',
    cuisine: 'Cuisine',
    category: 'Category',
    recipe: 'Recipe',
    ingredients: 'Ingredients',
    culinary_library: 'Culinary Gallery',
    cat_meat: 'Meat',
    cat_poultry: 'Poultry',
    cat_vegetable: 'Vegetable',
    cat_seafood: 'Seafood',
    cat_fruit: 'Fruit',
    cat_spice: 'Spice & Sauces',
    cat_dairy: 'Dairy',
    cat_grains_nuts: 'Flour, Grains & Nuts',
    cat_pantry: 'Pantry',
    no_results_found: 'No results found for "{query}"',
    all_categories: 'All Categories',
    ingredients_title: "Discover Ingredients & Flavors",
    ingredients_subtitle: "Culinary masterpieces start here. Bring authentic world flavors straight to the kitchen.",
    search_ingredients: "Search ingredients...",
    no_ingredients_found: "No ingredients found for \"{query}\"",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ID');

  useEffect(() => {
    const saved = localStorage.getItem('app-language') as Language;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string, variables?: Record<string, any>) => {
    let text = translations[language][key] || key;
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v.toString());
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
