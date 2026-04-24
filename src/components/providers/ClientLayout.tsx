"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { Header } from "@/components/organisms/Header";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { BottomNav } from "@/components/organisms/BottomNav";
import { ScrollToTop } from "@/components/atoms/ScrollToTop";
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../atoms/Logo';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isInitialLoading ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white dark:bg-slate-950 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full" />
            <Logo size="xl" className="flex-col !gap-6 text-center" />
          </motion.div>

          <div className="mt-6 w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            />
          </div>

          {/* Watermark */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 text-[10px] tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-400"
          >
            By Randi Andria Nugrah
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col"
        >
          <Suspense fallback={<div className="h-16 md:h-20" />}>
            <Header />
          </Suspense>

          <main className="flex-grow container mx-auto px-4 pb-24">
            <Suspense fallback={null}>
              <Breadcrumbs />
            </Suspense>
            {children}
          </main>

          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
          <ScrollToTop />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
