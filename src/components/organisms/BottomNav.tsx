"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChefHat, Globe, LayoutGrid, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const navLinks = [
    { name: 'Ingredients', href: '/', icon: ChefHat },
    { name: 'Explore', href: '/explore', icon: Globe },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname.startsWith('/ingredient') || (pathname.startsWith('/meal') && (type === 'ingredient' || !type));
    }
    if (path === '/explore') {
      return pathname.startsWith('/explore') || pathname.startsWith('/cuisine') || pathname.startsWith('/category') || (pathname.startsWith('/meal') && (type === 'cuisine' || type === 'category'));
    }
    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pb-safe transform-gpu will-change-transform">
      <div className="flex justify-around items-center h-16 px-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-8 h-1 bg-orange-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className={`p-1.5 rounded-xl transition-colors ${active ? "text-orange-500" : "text-slate-400"}`}>
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold mt-0.5 transition-colors ${active ? "text-orange-500" : "text-slate-400"}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
