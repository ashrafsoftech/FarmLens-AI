/**
 * @file Badge.tsx
 * @description FarmLens AI Badge component for risk levels, confidence scores, and status tags.
 */

import React, { ReactNode } from 'react';

export interface BadgeProps {
  /** Badge color variant */
  variant?: 'low' | 'medium' | 'high' | 'info' | 'success' | 'warning' | 'neutral' | 'accent';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Optional icon rendered inside badge */
  icon?: ReactNode;
  /** Custom additional styling classes */
  className?: string;
  /** Badge text or content */
  children: ReactNode;
}

/**
 * Reusable Badge component for FarmLens AI.
 * Used for displaying risk levels, animal categories, and confidence status.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  children,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants = {
    low: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80',
    success: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80',
    medium: 'bg-amber-950/80 text-amber-300 border border-amber-800/80',
    warning: 'bg-amber-950/80 text-amber-300 border border-amber-800/80',
    high: 'bg-red-950/80 text-red-400 border border-red-800/80',
    info: 'bg-sky-950/80 text-sky-400 border border-sky-800/80',
    neutral: 'bg-[#1A1A1D] text-slate-300 border border-slate-800',
    accent: 'bg-amber-500 text-slate-950 font-bold shadow-2xs',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs sm:text-sm gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm font-semibold gap-2',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
