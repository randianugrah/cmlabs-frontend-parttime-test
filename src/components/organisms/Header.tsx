"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Logo } from '../atoms/Logo';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { LanguageToggle } from '../atoms/LanguageToggle';
import { PageLoader } from '../atoms/PageLoader';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const type = searchParams.get('type');

  const isActive = (path: string) => {
    if (path === '/') {
      // Highlight Ingredients if on home, ingredient detail, or meal from ingredient
      return pathname === '/' || pathname.startsWith('/ingredient') || (pathname.startsWith('/meal') && (type === 'ingredient' || !type));
    }
    if (path === '/explore') {
      // Highlight Explore if on explore, cuisine, category detail, or meal from cuisine/category
      return pathname.startsWith('/explore') || pathname.startsWith('/cuisine') || pathname.startsWith('/category') || (pathname.startsWith('/meal') && (type === 'cuisine' || type === 'category'));
    }
    return false;
  };

  const navLinks = [
    { name: t('ingredients_tab'), href: '/' },
    { name: t('explore_tab'), href: '/explore' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="z-[110] w-fit transition-transform hover:scale-105 active:scale-95">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-bold transition-colors ${isActive(link.href)
                      ? 'text-orange-500'
                      : 'text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400'
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Action (Theme & Language) */}
        <div className="flex md:hidden items-center gap-2 z-[110] w-fit">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      <PageLoader />
    </header>
  );
};
