/**
 * @file Layout.tsx
 * @description Main application layout wrapper containing Navbar, page container, and Footer.
 */

import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] text-slate-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
