import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
    xl: { icon: 80, text: "text-5xl" }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 w-fit ${className}`}>
      <div className="relative" style={{ width: currentSize.icon, height: currentSize.icon }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Orange Crescent Shape */}
          <path
            d="M30 85C15 75 10 55 15 40C20 25 35 15 50 15C65 15 80 25 85 40"
            stroke="#F97316"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Chef Hat Icon - Refined with Outline */}
          <path
            d="M35 55C35 45 40 40 50 40C60 40 65 45 65 55C65 60 62 62 60 65H40C38 62 35 60 35 55Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="3"
            className="text-slate-800 dark:text-slate-100"
          />
          <rect
            x="40" y="65" width="20" height="8" rx="2"
            fill="white"
            stroke="currentColor"
            strokeWidth="3"
            className="text-slate-800 dark:text-slate-100"
          />
          
          {/* Tray Line */}
          <path
            d="M20 80H80"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-slate-800 dark:text-slate-100"
          />
          <path
            d="M35 88C45 92 55 92 65 88"
            stroke="#F97316"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <span className={`${currentSize.text} font-black italic tracking-tighter`}>
          <span className="text-slate-800 dark:text-slate-100">Meal</span>
          <span className="text-orange-500">Master</span>
        </span>
      )}
    </div>
  );
};
