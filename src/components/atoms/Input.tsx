import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className={`relative w-full ${className}`}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 py-3 pr-4 transition-all duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-0 outline-none dark:text-slate-100 backdrop-blur-sm ${
          icon ? 'pl-12' : 'pl-4'
        }`}
        {...props}
      />
    </div>
  );
};
