"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain';
  hoverZoom?: boolean;
  onLoad?: () => void;
}

export const PremiumImage: React.FC<PremiumImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  objectFit = 'cover',
  hoverZoom = false,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${hoverZoom ? 'transition-transform duration-700 hover:scale-110' : ''} ${className}`}
      />
    </div>
  );
};
