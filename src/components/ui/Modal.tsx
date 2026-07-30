/**
 * @file Modal.tsx
 * @description FarmLens AI Modal dialog component with Framer Motion animations and backdrop dismiss.
 */

import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface ModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Modal close callback function */
  onClose: () => void;
  /** Modal header title */
  title?: ReactNode;
  /** Modal dialog size width */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Children content */
  children: ReactNode;
  /** Optional action buttons in footer */
  footer?: ReactNode;
}

/**
 * Reusable animated Modal component for FarmLens AI.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  footer,
}) => {
  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg sm:max-w-2xl',
    xl: 'max-w-xl sm:max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.25 }}
            className={`relative w-full ${sizes[size]} bg-[#121214] text-slate-200 rounded-2xl shadow-xl border border-slate-800 z-10 overflow-hidden my-8`}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            {title && (
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#121214]">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1A1A1D] transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-5 max-h-[75vh] overflow-y-auto leading-relaxed">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-3.5 bg-[#1A1A1D] border-t border-slate-800 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
