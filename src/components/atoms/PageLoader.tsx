"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const PageLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger loading bar on route change
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 600);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 z-50 origin-left shadow-[0_1px_10px_rgba(249,115,22,0.3)]"
        />
      )}
    </AnimatePresence>
  );
};
