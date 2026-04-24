"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[100] w-10 h-10 md:w-12 md:h-12 bg-slate-800/80 dark:bg-slate-100/80 backdrop-blur-md text-white dark:text-slate-900 rounded-xl shadow-lg flex items-center justify-center hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} className="md:size-24" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
