"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const LoadingContext = createContext({
  hideLoader: () => {},
  showLoader: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const hideLoader = () => setIsLoading(false);
  const showLoader = () => setIsLoading(true);

  return (
    <LoadingContext.Provider value={{ hideLoader, showLoader }}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-900 backdrop-blur-xl"
          >
            <div className="relative scale-110 md:scale-150">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-orange-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-orange-500/30"
              >
                <ChefHat size={40} />
              </motion.div>
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight whitespace-nowrap">
                  MealMaster is Preparing...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
