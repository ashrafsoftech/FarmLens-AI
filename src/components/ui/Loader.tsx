/**
 * @file Loader.tsx
 * @description FarmLens AI loading spinner and full-page analysis overlay components.
 */

import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export interface LoaderProps {
  /** Optional message displayed under spinner */
  message?: string;
  /** Size of spinner icon */
  size?: 'sm' | 'md' | 'lg';
  /** Full screen centered backdrop layout when true */
  fullScreen?: boolean;
  /** Custom additional styling classes */
  className?: string;
}

/**
 * Reusable Loader component for FarmLens AI.
 */
export const Loader: React.FC<LoaderProps> = ({
  message = 'Loading...',
  size = 'md',
  fullScreen = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const loaderContent = (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
        <div className="relative rounded-full bg-emerald-950/80 p-3 text-emerald-400 shadow-md border border-emerald-500/30">
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
        </div>
      </div>

      {message && (
        <div className="mt-4">
          <p className="text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            {message}
          </p>
          <p className="text-xs text-slate-400 mt-1">Analyzing species, breed markers, symptoms & care guidelines...</p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
        <div className="bg-[#121214] rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-slate-800">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};
