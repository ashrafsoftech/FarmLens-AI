/**
 * @file Input.tsx
 * @description FarmLens AI Input component with labels, error messages, start/end icons, and full accessibility support.
 */

import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Text label above the input */
  label?: string;
  /** Error message displayed below input */
  error?: string;
  /** Helper hint text displayed below input */
  helperText?: string;
  /** Icon placed inside left edge of input */
  leftIcon?: ReactNode;
  /** Icon or button placed inside right edge of input */
  rightIcon?: ReactNode;
  /** Custom wrapper class */
  containerClassName?: string;
}

/**
 * Reusable text input field for FarmLens AI forms.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0 flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-[#121214] border ${
              error ? 'border-red-500 focus:ring-red-400' : 'border-slate-800 focus:ring-emerald-500/30 focus:border-emerald-500'
            } text-slate-100 text-sm rounded-xl py-2.5 ${
              leftIcon ? 'pl-10' : 'pl-3.5'
            } ${rightIcon ? 'pr-10' : 'pr-3.5'} focus:outline-none focus:ring-2 transition-all placeholder:text-slate-500 disabled:opacity-50 disabled:bg-[#1A1A1D]`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-slate-500 shrink-0 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1 text-xs text-red-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
