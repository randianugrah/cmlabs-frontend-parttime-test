"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRight, Home, ChefHat, Globe, Utensils, Tag } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const type = searchParams.get('type');
  
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });
  
  // Don't show on home page
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  // Enhanced Branch Detection
  const isExplorePath = pathSegments.some(s => 
    ['explore', 'cuisine', 'category'].includes(s.toLowerCase())
  );
  const isExploreOrigin = type === 'cuisine' || type === 'category';
  const isExploreBranch = isExplorePath || isExploreOrigin;

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      isExploreBranch 
        ? { name: 'Explore', href: '/explore', icon: <Globe size={14} /> }
        : { name: 'Ingredients', href: '/', icon: <ChefHat size={14} /> }
    ];

    pathSegments.forEach((segment, index) => {
      const lowerSegment = segment.toLowerCase();
      const prevSegment = index > 0 ? pathSegments[index - 1].toLowerCase() : '';
      
      // Skip names that follow cuisine or category in the path
      if (prevSegment === 'cuisine' || prevSegment === 'category') return;
      
      // Custom handling for segments
      if (lowerSegment === 'cuisine') {
        breadcrumbs.push({ name: 'Cuisine', href: '/explore?tab=cuisines', icon: <Globe size={14} /> });
      } else if (lowerSegment === 'category') {
        breadcrumbs.push({ name: 'Category', href: '/explore?tab=categories', icon: <Tag size={14} /> });
      } else if (lowerSegment === 'meal') {
        if (from) {
          if (type === 'cuisine') {
            breadcrumbs.push({ name: 'Cuisine', href: '/explore?tab=cuisines', icon: <Globe size={14} /> });
          } else if (type === 'category') {
            breadcrumbs.push({ name: 'Category', href: '/explore?tab=categories', icon: <Tag size={14} /> });
          } else {
            breadcrumbs.push({ name: from, href: `/ingredient/${encodeURIComponent(from)}`, icon: <ChefHat size={14} /> });
          }
        }
        breadcrumbs.push({ name: 'Recipe', href: '#', icon: <Utensils size={14} /> });
      } else if (lowerSegment !== 'explore' && lowerSegment !== 'ingredient' && prevSegment !== 'meal') {
        // Default segment mapping
        let name = decodeURIComponent(segment);
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        breadcrumbs.push({ name, href, icon: <Tag size={14} /> });
      }
    });

    // Final deduplication by name
    return breadcrumbs.filter((bc, index, self) => 
      index === self.findIndex((t) => t.name === bc.name)
    );
  };

  const uniqueBreadcrumbs = getBreadcrumbs();

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -20, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-16 md:top-20 z-40 py-2 mb-4 pointer-events-none"
    >
      <nav className="relative pointer-events-auto w-fit bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-md">
        <div className="flex flex-wrap items-center gap-y-2 gap-x-0.5 md:gap-x-1 text-[10px] md:text-xs font-black">
          {uniqueBreadcrumbs.map((bc, index) => {
            const isLast = index === uniqueBreadcrumbs.length - 1;
            
            return (
              <React.Fragment key={bc.name}>
                {index > 0 && (
                  <div className="flex items-center opacity-80 px-0.5">
                    <ChevronRight size={12} className="text-slate-400 dark:text-slate-500" />
                  </div>
                )}
                
                <Link 
                  href={bc.href}
                  className={`group flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 ${
                    isLast
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
                  }`}
                >
                  <span className="scale-90">{bc.icon && bc.icon}</span>
                  <span className="whitespace-nowrap">{bc.name}</span>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </motion.div>
  );
};
