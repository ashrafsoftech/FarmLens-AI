/**
 * @file Footer.tsx
 * @description FarmLens AI footer component with quick links and emergency vet disclaimers.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#09090B] text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Leaf className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-extrabold text-white">FarmLens <span className="text-emerald-500">AI</span></span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              {t('tagline')} Empowering smallholder farmers, traders, and agricultural extension officers with multimodal AI decision support across Africa.
            </p>
            <div className="pt-2 flex items-center gap-2 text-2xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Built for low-bandwidth & offline-first agricultural environments</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><Link to="/scan" className="hover:text-emerald-400 transition-colors">Scan Livestock</Link></li>
              <li><Link to="/results" className="hover:text-emerald-400 transition-colors">Latest Scan Results</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-400 transition-colors">Ask FarmLens AI</Link></li>
              <li><Link to="/guide" className="hover:text-emerald-400 transition-colors">Livestock Care Guide</Link></li>
              <li><Link to="/history" className="hover:text-emerald-400 transition-colors">Scan History</Link></li>
              <li><Link to="/settings" className="hover:text-emerald-400 transition-colors">Language & Settings</Link></li>
            </ul>
          </div>

          {/* Vet Emergency Note */}
          <div className="bg-[#121214] p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 shrink-0" /> Emergency Veterinary Note
            </div>
            <p className="text-2xs sm:text-xs text-slate-300 leading-relaxed">
              FarmLens AI provides non-diagnostic decision triage support. For acute disease outbreaks, severe trauma, or urgent animal distress, contact your nearest Ministry of Agriculture Extension Officer immediately.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-slate-500">
          <p>© {new Date().getFullYear()} FarmLens AI — All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for African Agriculture & Hackathon Innovation
          </p>
        </div>
      </div>
    </footer>
  );
};
