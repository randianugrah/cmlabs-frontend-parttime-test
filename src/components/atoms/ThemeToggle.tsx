"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useCustomTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useCustomTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-slate-100 dark:bg-slate-800 p-1 flex items-center gap-1 transition-colors duration-500 overflow-hidden shadow-inner border border-slate-200/50 dark:border-slate-700/50"
      aria-label="Toggle theme"
    >
      {/* Sliding Background */}
      <motion.div
        className="absolute w-6 h-6 bg-white dark:bg-orange-500 rounded-full shadow-md z-10"
        initial={false}
        animate={{
          x: theme === "dark" ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />

      {/* Icons */}
      <div className="flex justify-between items-center w-full px-1 z-20">
        <div className={`transition-colors duration-300 ${theme === "light" ? "text-orange-500" : "text-slate-400"}`}>
          <Sun size={14} />
        </div>
        <div className={`transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-slate-400"}`}>
          <Moon size={14} />
        </div>
      </div>
    </button>
  );
}
