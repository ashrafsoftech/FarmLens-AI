/**
 * @file ResultCard.tsx
 * @description FarmLens AI ResultCard component for displaying full scan analysis reports.
 */

import React from 'react';
import { ScanReport } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Bookmark,
  Calendar,
  Sparkles,
  ShieldAlert,
  Info,
  Apple,
  HeartHandshake,
  ShoppingBag,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface ResultCardProps {
  /** The complete scan report object */
  report: ScanReport;
  /** Callback when user clicks 'Ask AI Chat about this scan' */
  onAskChat?: (report: ScanReport) => void;
  /** Callback when user clicks 'Save to History' */
  onSaveHistory?: (report: ScanReport) => void;
  /** Callback when user clicks 'Set Care Reminder' */
  onSetReminder?: (report: ScanReport) => void;
  /** Custom additional styling class */
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  report,
  onAskChat,
  onSaveHistory,
  onSetReminder,
  className = '',
}) => {
  const { t } = useLanguage();

  const riskBadgeVariant = {
    low: 'low' as const,
    medium: 'medium' as const,
    high: 'high' as const,
  }[report.riskLevel];

  const riskText = {
    low: t('riskLow', 'LOW RISK'),
    medium: t('riskMedium', 'MEDIUM RISK'),
    high: t('riskHigh', 'HIGH RISK'),
  }[report.riskLevel];

  return (
    <div className={`bg-[#121214] rounded-3xl border border-slate-800 shadow-sm overflow-hidden ${className}`}>
      {/* Top Banner - Risk Status & Image Preview */}
      <div className="relative bg-[#09090B] text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Image */}
          <div className="md:col-span-1 relative h-56 md:h-full min-h-[220px]">
            <img
              src={report.imageUrl}
              alt={report.breed || report.animalType}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <Badge variant={riskBadgeVariant} size="lg">
                {riskText}
              </Badge>
            </div>
          </div>

          {/* Core Info */}
          <div className="md:col-span-2 p-5 sm:p-6 flex flex-col justify-between bg-[#09090B]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Multimodal Scan Report
                </span>
                <span className="text-2xs text-slate-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">
                {report.animalType.toUpperCase()} — {report.breed}
              </h2>

              {/* Confidence Bar */}
              <div className="mt-3 bg-[#121214] rounded-2xl p-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Breed Identification Confidence</span>
                  <span className="text-emerald-400 font-bold">{report.breedConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${report.breedConfidence}%` }}
                  />
                </div>
                <p className="text-2xs text-slate-400 mt-1.5">
                  Estimated Age: <span className="text-slate-200 font-medium">{report.estimatedAge}</span>
                </p>
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="mt-4 p-2.5 rounded-xl bg-[#121214] border border-slate-800 text-slate-300 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t('vetDisclaimer')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory High/Medium Risk Vet Referral Alert */}
      {report.vetReferralRecommended && (
        <div className="bg-red-950/40 border-y border-red-800/60 p-4 text-red-200 text-xs sm:text-sm font-semibold flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-300">{t('vetReferralAlert')}</p>
            <p className="text-xs text-red-400 mt-0.5 font-normal">
              Non-diagnostic triage advice. Contact your local agricultural officer or veterinary practitioner before administering any clinical treatment.
            </p>
          </div>
        </div>
      )}

      {/* Main Body Grid */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Symptoms Section */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-200 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            {t('symptoms')}
          </h3>
          {report.symptoms && report.symptoms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {report.symptoms.map((symptom, idx) => (
                <span
                  key={idx}
                  className="bg-amber-950/40 text-amber-300 border border-amber-800/50 text-xs sm:text-sm px-3 py-1.5 rounded-xl font-medium"
                >
                  • {symptom}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic bg-[#1A1A1D] p-3 rounded-xl border border-slate-800">
              No physical symptoms detected from the provided photo.
            </p>
          )}
        </div>

        {/* Possible Conditions Section */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-200 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            {t('possibleConditions')}
          </h3>
          <div className="space-y-3">
            {report.possibleConditions.map((cond) => (
              <div
                key={cond.id}
                className="p-3.5 rounded-2xl bg-[#1A1A1D] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">{cond.condition}</span>
                    <Badge variant={cond.confidence > 50 ? 'warning' : 'neutral'} size="sm">
                      {cond.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cond.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feeding Advice */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Apple className="w-4 h-4 text-emerald-400" />
            {t('feedingAdvice')}
          </h3>
          <ul className="space-y-2">
            {report.feedingAdvice.map((item, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Care & Husbandry Advice */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-200 mb-3 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            {t('careAdvice')}
          </h3>
          <ul className="space-y-2">
            {report.careRecommendations.map((item, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-[#1A1A1D] p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Purchase Advice if available */}
        {report.purchaseAdvice && (
          <div className="bg-amber-950/30 border border-amber-800/60 p-4 rounded-2xl">
            <h3 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-1.5 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              {t('purchaseAdvice')}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
              {report.purchaseAdvice}
            </p>
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 sm:p-5 bg-[#1A1A1D] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {onAskChat && (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<MessageSquare className="w-4 h-4" />}
            onClick={() => onAskChat(report)}
          >
            Ask AI Assistant About This Scan
          </Button>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {onSaveHistory && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Bookmark className="w-4 h-4" />}
              onClick={() => onSaveHistory(report)}
            >
              Save to Scan History
            </Button>
          )}

          {onSetReminder && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={() => onSetReminder(report)}
            >
              Set Care Reminder
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
