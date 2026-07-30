/**
 * @file Card.tsx
 * @description FarmLens AI Card component with header, content, footer, and interactive state support.
 */

import React, { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables hover elevation and outline effects when true */
  hoverable?: boolean;
  /** Accent border color highlight */
  accentColor?: 'emerald' | 'amber' | 'red' | 'sky' | 'none';
  /** Custom additional CSS classes */
  className?: string;
  /** Children node content */
  children: ReactNode;
}

export interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable Card container component with mathematical spacing and anti-slop design.
 */
export const Card: React.FC<CardProps> = ({
  hoverable = false,
  accentColor = 'none',
  className = '',
  children,
  ...props
}) => {
  const accentStyles = {
    none: '',
    emerald: 'border-l-4 border-l-emerald-500',
    amber: 'border-l-4 border-l-amber-500',
    red: 'border-l-4 border-l-red-500',
    sky: 'border-l-4 border-l-sky-500',
  };

  const hoverStyles = hoverable
    ? 'hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/20 transition-all duration-200 cursor-pointer active:scale-[0.99]'
    : '';

  return (
    <div
      className={`bg-[#121214] rounded-2xl border border-slate-800 shadow-sm overflow-hidden ${accentStyles[accentColor]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div className={`p-4 sm:p-5 border-b border-slate-800/80 flex items-start justify-between gap-3 ${className}`}>
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-4 sm:p-5 text-slate-300 text-sm leading-relaxed ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 sm:px-5 sm:py-3.5 bg-[#1A1A1D]/60 border-t border-slate-800/80 flex items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
};
