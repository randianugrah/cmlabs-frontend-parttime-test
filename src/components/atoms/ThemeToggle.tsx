"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useCustomTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useCustomTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-100/50 dark:bg-slate-800/50 animate-pulse" />
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors group overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {theme === "light" ? (
            <Sun size={18} className="text-orange-500" />
          ) : (
            <Moon size={18} className="text-orange-400" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle Glow Background */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
        theme === "light" 
          ? "from-orange-100/20 to-transparent" 
          : "from-orange-900/10 to-transparent"
      }`} />
    </motion.button>
  );
}
