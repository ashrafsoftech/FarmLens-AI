/**
 * @file Button.tsx
 * @description Reusable FarmLens AI Button component with multiple variants, sizes, icon support, and loading states.
 */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'accent';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Shows loading spinner and disables click when true */
  isLoading?: boolean;
  /** Icon element rendered before button text */
  leftIcon?: ReactNode;
  /** Icon element rendered after button text */
  rightIcon?: ReactNode;
  /** Custom additional CSS classes */
  className?: string;
  /** Children nodes */
  children: ReactNode;
}

/**
 * Reusable Button component for FarmLens AI.
 * Implements accessible focus rings and touch-friendly targets.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer';

  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-sm border border-emerald-400/30',
    secondary: 'bg-[#1A1A1D] hover:bg-[#27272A] text-slate-200 border border-slate-700',
    accent: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-sm',
    outline: 'bg-[#121214] hover:bg-[#1A1A1D] text-slate-200 border border-slate-700 hover:border-slate-500 shadow-2xs',
    danger: 'bg-red-600 hover:bg-red-500 text-white font-semibold shadow-sm border border-red-500/30',
    ghost: 'bg-transparent hover:bg-[#1A1A1D] text-slate-300 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm sm:text-base gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base sm:text-lg gap-2.5 min-h-[50px] font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
