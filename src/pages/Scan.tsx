/**
 * @file Scan.tsx
 * @description FarmLens AI Livestock Image Capture and Quality Validation page.
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, Sparkles, CheckCircle2, ShieldAlert, Tag, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { UploadArea } from '../components/ui/UploadArea';
import { Loader } from '../components/ui/Loader';
import { useLanguage } from '../context/LanguageContext';
import { AnimalType } from '../types';

export const Scan: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const initialSpecies = (location.state as { selectedSpecies?: AnimalType })?.selectedSpecies || 'goat';

  const [selectedAnimalType, setSelectedAnimalType] = useState<AnimalType>(initialSpecies);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=800'
  );
  const [animalNameHint, setAnimalNameHint] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const animalCategories: { type: AnimalType; label: string; emoji: string }[] = [
    { type: 'chicken', label: 'Chicken', emoji: '🐔' },
    { type: 'goat', label: 'Goat', emoji: '🐐' },
    { type: 'sheep', label: 'Sheep', emoji: '🐑' },
    { type: 'cow', label: 'Cattle', emoji: '🐄' },
    { type: 'fish', label: 'Fish', emoji: '🐟' },
    { type: 'rabbit', label: 'Rabbit', emoji: '🐇' },
    { type: 'duck', label: 'Duck', emoji: '🦆' },
  ];

  const imageToBase64DataUrl = async (file: File | null, url: string | null): Promise<string> => {
    if (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image file.'));
        reader.readAsDataURL(file);
      });
    }

    if (url) {
      if (url.startsWith('data:image/')) {
        return url;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load image preview (${res.status})`);
      }
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to convert image blob to base64.'));
        reader.readAsDataURL(blob);
      });
    }

    throw new Error('No image file or preview available for scanning.');
  };

  const handleImageSelected = (file: File, url: string) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    setScanError(null);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setScanError(null);
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;

    setIsAnalyzing(true);
    setScanError(null);

    try {
      // Ensure real base64 image data is created and sent to backend
      const base64ImageData = await imageToBase64DataUrl(selectedFile, previewUrl);

      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64ImageData,
          animalType: selectedAnimalType,
          animalName: animalNameHint,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.scan) {
        throw new Error(data.error || `Scan failed (HTTP ${response.status})`);
      }

      sessionStorage.setItem('latest_scan_report', JSON.stringify(data.scan));
      navigate('/results');
    } catch (err: any) {
      console.error('[FarmLens AI] API scan call failed:', err);
      setScanError(err?.message || 'Failed to complete analysis with Gemma 4.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-200">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Multimodal Image Analysis
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Scan Livestock Photo
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Capture or upload a clear photo of your animal for instant breed identification, symptom detection, and non-diagnostic care guidance.
        </p>
      </div>

      {isAnalyzing && (
        <Loader fullScreen message="Analyzing photo with FarmLens AI... Checking breed traits, symptoms, and care guidelines." />
      )}

      {scanError && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-rose-100">Scan Analysis Failed</h4>
            <p className="text-xs text-rose-300">{scanError}</p>
          </div>
        </div>
      )}

      {/* Main Scan Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Upload Area & Camera */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#121214] border-slate-800">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                1. Select or Capture Image
              </h3>

              <UploadArea
                onImageSelected={handleImageSelected}
                currentPreviewUrl={previewUrl}
                onClearImage={handleClearImage}
              />
            </CardContent>
          </Card>

          {/* Optional Nickname Input */}
          <Card className="bg-[#121214] border-slate-800">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-400" />
                2. Tag Animal / Group (Optional)
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Animal Nickname or Tag Number</label>
                <input
                  type="text"
                  placeholder="e.g. Kano Goat #12 or Coop 2 Hens"
                  value={animalNameHint}
                  onChange={(e) => setAnimalNameHint(e.target.value)}
                  className="w-full bg-[#09090B] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
                <p className="text-2xs text-slate-500">Helps track scan history and health trends per animal profile.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Category Selector & Quality Checklist */}
        <div className="space-y-6">
          {/* Category Selector */}
          <Card accentColor="emerald" className="bg-[#121214] border-slate-800">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">
                Animal Category Hint
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {animalCategories.map((cat) => (
                  <button
                    key={cat.type}
                    type="button"
                    onClick={() => setSelectedAnimalType(cat.type)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      selectedAnimalType === cat.type
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-xs'
                        : 'bg-[#1A1A1D] text-slate-300 border-slate-800 hover:bg-[#27272A]'
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Guidelines Card */}
          <Card className="bg-[#121214] text-slate-200 border-slate-800">
            <CardContent className="p-5 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-2xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Tips for Best Scan Accuracy
              </h4>

              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Ensure daylight or good artificial lighting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Keep animal face, eyes, comb, or hooves in clear focus.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Avoid extreme blur or distant group shots.</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-800 text-2xs text-slate-500 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Non-diagnostic triage advice. Always consult a vet.</span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Trigger Button */}
          <Button
            variant="primary"
            size="lg"
            disabled={!previewUrl || isAnalyzing}
            isLoading={isAnalyzing}
            leftIcon={<Sparkles className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={handleAnalyze}
            className="w-full py-4 shadow-md"
          >
            {t('analyzeBtn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
