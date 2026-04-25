"use client";

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlagID = () => (
  <svg viewBox="0 0 640 480" className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full overflow-hidden border border-slate-200/50">
    <rect width="640" height="480" fill="#fff"/>
    <rect width="640" height="240" fill="#e70011"/>
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 640 480" className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full overflow-hidden border border-slate-200/50">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-78L320 300 75 480H0v-62l240-178L0 62V0h75z"/>
    <path fill="#c8102e" d="m424 281 216 159v40L369 281h55zM225 200 0 32v38l170 130h55zM0 450l230-170h-55L0 412v38zm640-388L410 230h55l175-130V62z"/>
    <path fill="#fff" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#c8102e" d="M281 0v480h80V0h-80zM0 201v80h640v-80H0z"/>
  </svg>
);

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-0.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 relative select-none h-6 md:h-7 items-center w-24 md:w-28 overflow-hidden">
      {/* Sliding Background Indicator */}
      <motion.div
        className="absolute h-[calc(100%-4px)] w-[calc(50%-2px)] bg-white dark:bg-slate-700 rounded-full shadow-sm z-0"
        animate={{ x: language === 'ID' ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ left: 2 }}
      />
      
      <button
        onClick={() => setLanguage('ID')}
        className={`relative flex-1 flex items-center justify-center gap-1 h-full z-10 transition-colors duration-300 ${
          language === 'ID' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <FlagID />
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight">ID</span>
      </button>
      
      <button
        onClick={() => setLanguage('EN')}
        className={`relative flex-1 flex items-center justify-center gap-1 h-full z-10 transition-colors duration-300 ${
          language === 'EN' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <FlagEN />
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight">EN</span>
      </button>
    </div>
  );
};
