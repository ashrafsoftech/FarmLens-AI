/**
 * @file Settings.tsx
 * @description FarmLens AI Settings, Language Preferences, and Offline Storage Manager.
 */

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Globe,
  HardDrive,
  User,
  Bell,
  ShieldAlert,
  Trash2,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../types';

export const Settings: React.FC = () => {
  const { language, setLanguage, languageOptions, t } = useLanguage();
  const [role, setRole] = useState<'farmer' | 'trader' | 'extension_officer' | 'student'>('farmer');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [clearMsg, setClearMsg] = useState<string | null>(null);

  const handleClearCache = () => {
    if (confirm('Clear offline cached scans and chat history from this device?')) {
      localStorage.removeItem('farmlens_chat');
      localStorage.removeItem('farmlens_history');
      sessionStorage.clear();
      setClearMsg('Offline cached data cleared successfully.');
      setTimeout(() => setClearMsg(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-8 h-8 text-emerald-400" />
          Settings & Offline Storage Manager
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize language preferences, profile role, and manage offline data storage.
        </p>
      </div>

      {clearMsg && (
        <div className="p-3 bg-emerald-950/80 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2 border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{clearMsg}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Language Preferences Card */}
        <Card accentColor="emerald" className="bg-[#121214] border-slate-800">
          <CardHeader
            title="Language & Local Voice Preferences"
            subtitle="Choose your preferred local African language for AI text and voice guidance"
          />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLanguage(opt.code as SupportedLanguage)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    language === opt.code
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                      : 'bg-[#1A1A1D] text-slate-200 border-slate-800 hover:bg-[#27272A]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{opt.flag}</span>
                    <span className="font-extrabold text-sm">{opt.name}</span>
                  </div>
                  <p className={`text-2xs ${language === opt.code ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    {opt.nativeName}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Role Card */}
        <Card className="bg-[#121214] border-slate-800">
          <CardHeader
            title="User Profile & Application Role"
            subtitle="Tailors recommendations for farmers, traders, or veterinary officers"
          />
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'farmer', name: 'Smallholder Farmer', desc: 'Focus on disease detection & daily care' },
                { id: 'trader', name: 'Livestock Trader / Buyer', desc: 'Focus on pre-purchase checklist & breed verification' },
                { id: 'extension_officer', name: 'Agricultural Extension Officer', desc: 'Field triage & referral guidance' },
                { id: 'student', name: 'Agricultural Science Student', desc: 'Knowledge base & classroom reference' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as any)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    role === r.id
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-xs'
                      : 'bg-[#1A1A1D] text-slate-200 border-slate-800 hover:bg-[#27272A]'
                  }`}
                >
                  <p className="font-bold text-sm text-white">{r.name}</p>
                  <p className={`text-2xs mt-0.5 ${role === r.id ? 'text-emerald-300' : 'text-slate-400'}`}>{r.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Offline Storage Manager */}
        <Card className="bg-[#121214] border-slate-800">
          <CardHeader
            title="Offline Storage & Data Management"
            subtitle="Manage local storage used for offline inference and knowledge pack"
          />
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#09090B] rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white text-xs sm:text-sm">Offline Knowledge Pack</p>
                  <p className="text-2xs text-slate-400">Includes breed profiles, PPR/ND guides, and care schedules (12.4 MB)</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Pre-download Offline Pack
              </Button>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#09090B] rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <p className="font-bold text-white text-xs sm:text-sm">Clear Cached History & Chat</p>
                  <p className="text-2xs text-slate-400">Frees up local browser storage space on your device</p>
                </div>
              </div>
              <Button variant="danger" size="sm" onClick={handleClearCache}>
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal Disclaimer & Safety Guardrails */}
        <Card className="bg-[#09090B] text-slate-300 border-slate-800">
          <CardContent className="p-5 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Non-Diagnostic Veterinary Legal Disclaimer
            </h4>
            <p className="text-slate-400 leading-relaxed">
              FarmLens AI uses on-device multimodal artificial intelligence to provide non-diagnostic decision triage, breed identification, and general husbandry advice. It does NOT perform medical veterinary diagnosis. Always consult a licensed veterinarian or state agricultural officer for definitive clinical evaluation.
            </p>
            <p className="text-2xs text-slate-500 pt-2 border-t border-slate-800">
              FarmLens AI Version 1.0.0 (Phase 1 Project Foundation)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
