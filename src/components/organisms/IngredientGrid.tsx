"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Ingredient } from '../../types/meal';
import { IngredientCard } from '../molecules/IngredientCard';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IngredientGridProps {
  ingredients: Ingredient[];
}

const ITEMS_PER_PAGE = 24;

export const IngredientGrid: React.FC<IngredientGridProps> = ({ ingredients }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isMounted, setIsMounted] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "All", label: "All", icon: "✨" },
    { id: "Meat", label: "Meat", icon: "🥩" },
    { id: "Poultry", label: "Poultry", icon: "🍗" },
    { id: "Vegetable", label: "Vegetable", icon: "🥦" },
    { id: "Seafood", label: "Seafood", icon: "🐟" },
    { id: "Fruit", label: "Fruit", icon: "🍎" },
    { id: "Spice", label: "Spice", icon: "🧂" },
    { id: "Dairy", label: "Dairy", icon: "🧀" },
    { id: "Pasta", label: "Grains & Nuts", icon: "🥜" },
    { id: "Other", label: "Pantry", icon: "🥫" },
  ];

  // Smart categorization helper
  const getSmartCategory = (ingredient: Ingredient) => {
    const apiType = ingredient.strType ? ingredient.strType.toLowerCase() : "";
    const name = ingredient.strIngredient.toLowerCase();

    // 1. Map API Types to our UI Categories
    if (apiType.match(/meat/)) return "Meat";
    if (apiType.match(/poultry/)) return "Poultry";
    if (apiType.match(/vegetable|mushroom|sedge|root vegetable/)) return "Vegetable";
    if (apiType.match(/seafood|fish/)) return "Seafood";
    if (apiType.match(/fruit/)) return "Fruit";
    if (apiType.match(/spice|seasoning|dressing|sauce|vinegar/)) return "Spice";
    if (apiType.match(/dairy|cheese|curd/)) return "Dairy";
    if (apiType.match(/pasta|grain|rice|bread|cereal|legume|bean|side/)) return "Pasta";

    // 2. Keyword Detection (Aggressive Mapping)
    if (name.match(/chicken|duck|turkey|goose/)) return "Poultry";
    if (name.match(/beef|pork|lamb|bacon|ham|steak|sausage|meat|oxtail|chorizo|salami|pepperoni|mutton|brisket|loin/)) return "Meat";
    if (name.match(/onion|tomato|garlic|potato|carrot|pepper|broccoli|cabbage|spinach|mushroom|leek|cucumber|celery|lettuce|aubergine|asparagus|kale|chili|chilli|ginger|radish/)) return "Vegetable";
    if (name.match(/shrimp|fish|prawn|salmon|tuna|cod|squid|octopus|mussel|crab|seafood|anchovy/)) return "Seafood";
    if (name.match(/apple|lemon|lime|orange|banana|grape|strawberry|berry|fruit|pineapple|mango|dates|pomegranate|cocoa|cacao|coconut|avocado/)) return "Fruit";
    if (name.match(/pepper|salt|cinnamon|basil|oregano|thyme|turmeric|cumin|spice|herb|clove|parsley|vinegar|syrup|oil|sauce|mayonnaise|mustard|ketchup|honey|vanilla|extract|essence/)) return "Spice";
    if (name.match(/milk|cheese|butter|yogurt|cream|dairy|feta|gouda|cheddar|parmesan|mozzarella/)) return "Dairy";
    if (name.match(/pasta|spaghetti|noodle|macaroni|penne|fusilli|rice|flour|bread|cereal|wheat|oats|bean|lentils|chickpeas|cashew|peanut|almond|nut|pistachio|walnut|poppy|sesame|corn/)) return "Pasta";

    // 3. The "Pantry & Essentials" catch-all
    return "Other"; // This will now map to the "Pantry" button
  };

  const filteredIngredients = React.useMemo(() => {
    const filtered = ingredients.filter((ingredient) => {
      const matchesSearch = ingredient.strIngredient.toLowerCase().includes(searchQuery.toLowerCase());

      const smartCat = getSmartCategory(ingredient);

      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        matchesCategory = smartCat === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });

    // Custom sort: Move everything containing "pork" to the very end
    return [...filtered].sort((a, b) => {
      const aIsPork = a.strIngredient.toLowerCase().includes('pork');
      const bIsPork = b.strIngredient.toLowerCase().includes('pork');
      if (aIsPork && !bIsPork) return 1;
      if (!aIsPork && bIsPork) return -1;
      return 0;
    });
  }, [ingredients, searchQuery, selectedCategory]);

  // Log a full summary of categorization for auditing
  useEffect(() => {
    if (ingredients.length > 0) {
      const summary: Record<string, string[]> = {};
      ingredients.forEach(ing => {
        const cat = getSmartCategory(ing);
        if (!summary[cat]) summary[cat] = [];
        summary[cat].push(ing.strIngredient);
      });
      console.log("📊 INGREDIENT CATEGORIZATION SUMMARY:", summary);
    }
  }, [ingredients]);

  const visibleIngredients = filteredIngredients.slice(0, visibleCount);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Infinite scroll logic using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredIngredients.length) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredIngredients.length]);

  // Reset pagination when search or category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="py-6 md:py-10 relative">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10 relative">
          {/* Decorative Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Culinary Library
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tighter leading-none">
            Master Your <span className="text-orange-500">Ingredients</span>
          </h1>

          <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-4 leading-relaxed">
            Unlock the potential of your kitchen. Browse through our curated collection
            of flavors and start your next culinary masterpiece.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 px-4 max-w-2xl mx-auto mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap text-[11px] md:text-xs font-bold transition-all border ${selectedCategory === cat.id
                ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20 scale-105"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-orange-500/50"
                }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-start px-4 mt-8 mb-4">
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
                    placeholder="Search ingredients..."
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

        {visibleIngredients.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {visibleIngredients.map((item) => (
                <IngredientCard
                  key={item.idIngredient}
                  ingredient={item}
                />
              ))}
            </div>

            {visibleCount < filteredIngredients.length && (
              <div ref={loadMoreRef} className="py-12 flex justify-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl">
            <p className="text-slate-400">No ingredients found for "{searchQuery}"</p>
          </div>
        )}
      </motion.div>
    </section>
  );
};
