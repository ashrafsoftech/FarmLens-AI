/**
 * @file Navbar.tsx
 * @description FarmLens AI navigation bar with brand header, language selector, and mobile drawer.
 */

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Camera,
  FileText,
  MessageSquare,
  BookOpen,
  History,
  Settings,
  Menu,
  X,
  Globe,
  WifiOff,
  Leaf,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, languageOptions, t } = useLanguage();

  const navItems = [
    { path: '/', label: t('navHome'), icon: Home },
    { path: '/scan', label: t('navScan'), icon: Camera },
    { path: '/results', label: t('navResults'), icon: FileText },
    { path: '/chat', label: t('navChat'), icon: MessageSquare },
    { path: '/guide', label: t('navGuide'), icon: BookOpen },
    { path: '/history', label: t('navHistory'), icon: History },
    { path: '/settings', label: t('navSettings'), icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090B] text-slate-200 border-b border-slate-800/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 group-hover:bg-emerald-400 transition-colors flex items-center justify-center text-slate-950 font-bold shadow-sm">
              <Leaf className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1">
                FarmLens <span className="text-emerald-500 font-extrabold">AI</span>
              </span>
              <span className="text-2xs text-slate-500 block -mt-1 hidden sm:block">
                Livestock Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-[#121214]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls: Offline Badge & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline-ready indicator badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#121214] text-emerald-400 text-2xs font-semibold px-2.5 py-1 rounded-full border border-slate-800" title="Offline inference engine enabled">
              <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Ready</span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center bg-[#121214] rounded-xl border border-slate-800 px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                {languageOptions.map((opt) => (
                  <option key={opt.code} value={opt.code} className="bg-[#121214] text-slate-200">
                    {opt.flag} {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121214] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121214] border-t border-slate-800 px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:bg-[#1A1A1D] hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
