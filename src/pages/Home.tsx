/**
 * @file Home.tsx
 * @description FarmLens AI Home page component with hero section, features overview, and quick scan triggers.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  BookOpen,
  Sparkles,
  WifiOff,
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Zap,
  Activity,
  Award,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_SCANS } from '../data/mockData';
import { AnimalType } from '../types';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const latestScan = SAMPLE_SCANS[0];

  const speciesList: { type: AnimalType; label: string; desc: string; icon: string }[] = [
    { type: 'chicken', label: 'Chicken & Poultry', desc: 'Broilers, Layers, Local ShikaBrown', icon: '🐔' },
    { type: 'goat', label: 'Goat & Caprine', desc: 'West African Dwarf, Kano Brown, Maradi', icon: '🐐' },
    { type: 'sheep', label: 'Sheep & Ovine', desc: 'Balami, Uda, Yankasa', icon: '🐑' },
    { type: 'cow', label: 'Cattle & Cows', desc: 'White Fulani, Bunaji, Muturu', icon: '🐄' },
    { type: 'fish', label: 'Fish & Aquaculture', desc: 'Clarias Catfish, Nile Tilapia', icon: '🐟' },
    { type: 'rabbit', label: 'Rabbits & Cuniculture', desc: 'New Zealand White, Chinchilla', icon: '🐇' },
    { type: 'duck', label: 'Ducks & Waterfowl', desc: 'Muscovy, Pekin Ducks', icon: '🦆' },
  ];

  return (
    <div className="space-y-12 pb-8 text-slate-200">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl bg-[#121214] text-white overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/50 via-[#121214] to-[#09090B]" />
        
        <div className="relative p-6 sm:p-10 lg:p-14 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>AI-Powered Livestock Assistant for Africa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Identify Livestock Breed & Detect Illness in <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">Under 15 Seconds</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl">
            {t('heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Camera className="w-5 h-5" />}
              onClick={() => navigate('/scan')}
            >
              {t('scanNow')}
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={<BookOpen className="w-5 h-5 text-emerald-400" />}
              onClick={() => navigate('/guide')}
            >
              {t('exploreGuide')}
            </Button>
          </div>

          {/* Value props badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <WifiOff className="w-4 h-4 text-emerald-400" />
              <span>Offline-First Inference</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Hausa, Yoruba, Igbo, Pidgin & English</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Non-Diagnostic Vet Guardrails</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Metrics Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#121214] border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white">&lt; 15 Secs</p>
              <p className="text-2xs text-slate-400 font-medium">Scan-to-Report Speed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white">7 Animals</p>
              <p className="text-2xs text-slate-400 font-medium">Supported Categories</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white">5 Languages</p>
              <p className="text-2xs text-slate-400 font-medium">Local Voice & Text</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold shrink-0">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-black text-white">100% Offline</p>
              <p className="text-2xs text-slate-400 font-medium">Gemma 4 Local Reasoning</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="info" size="sm">
            Simple 3-Step Process
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('howItWorks')}
          </h2>
          <p className="text-sm text-slate-400">
            Designed for ease of use by farmers, traders, and agricultural extension officers in rural field conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card accentColor="emerald" className="bg-[#121214] border-slate-800">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-extrabold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">{t('step1Title')}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t('step1Desc')}</p>
            </CardContent>
          </Card>

          <Card accentColor="amber" className="bg-[#121214] border-slate-800">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-extrabold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">{t('step2Title')}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t('step2Desc')}</p>
            </CardContent>
          </Card>

          <Card accentColor="sky" className="bg-[#121214] border-slate-800">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-extrabold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">{t('step3Title')}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t('step3Desc')}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supported Livestock Types Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('supportedLivestock')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Multimodal recognition calibrated for native African breeds and management conditions.
            </p>
          </div>
          <Link to="/scan" className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            Scan an animal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {speciesList.map((item) => (
            <Card
              key={item.type}
              hoverable
              onClick={() => navigate('/scan', { state: { selectedSpecies: item.type } })}
              className="group border border-slate-800 bg-[#121214] hover:border-emerald-500/50 transition-all"
            >
              <CardContent className="p-4 space-y-2">
                <span className="text-3xl block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-2xs text-slate-400 leading-snug">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Recent Scan Preview */}
      {latestScan && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">Recent Demonstration Scan</h2>
            <Link to="/results" className="text-xs font-bold text-emerald-400 hover:underline">
              View full report &rarr;
            </Link>
          </div>

          <Card className="bg-[#121214] text-white border-slate-800 p-5 sm:p-6 rounded-3xl">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={latestScan.imageUrl}
                alt={latestScan.breed}
                className="w-full md:w-48 h-44 object-cover rounded-2xl shrink-0"
              />
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="medium" size="sm">
                    {latestScan.riskLevel.toUpperCase()} RISK
                  </Badge>
                  <span className="text-2xs text-slate-400">
                    {latestScan.breedConfidence}% Identification Confidence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {latestScan.animalType.toUpperCase()} — {latestScan.breed}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Symptoms: {latestScan.symptoms.join(', ')}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/results')}
                  >
                    Open Scan Results
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/chat')}
                  >
                    Ask AI Assistant
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Call To Action Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#121214] to-[#09090B] border border-emerald-500/30 text-white p-8 sm:p-10 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to Check Your Livestock Health?</h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          No internet required for core scans. Instant, reliable guidance in English, Hausa, Yoruba, Igbo, and Pidgin.
        </p>
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Camera className="w-5 h-5" />}
            onClick={() => navigate('/scan')}
          >
            Start Livestock Scan Now
          </Button>
        </div>
      </section>
    </div>
  );
};
