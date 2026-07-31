/**
 * @file Results.tsx
 * @description FarmLens AI Scan Results page presenting the detailed scan report.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultCard } from '../components/ui/ResultCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import {
  Camera,
  Share2,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Sparkles,
  BookmarkCheck,
} from 'lucide-react';
import { ScanReport } from '../types';
import { SAMPLE_SCANS } from '../data/mockData';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<ScanReport | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('2026-08-05');
  const [reminderType, setReminderType] = useState<'vaccination' | 'feeding' | 'checkup' | 'other'>('checkup');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem('latest_scan_report');
    if (cached) {
      try {
        setReport(JSON.parse(cached));
      } catch (e) {
        console.error('Failed to parse cached scan report', e);
        navigate('/scan');
      }
    } else {
      navigate('/scan');
    }
  }, [navigate]);

  if (!report) {
    return null;
  }

  const handleAskChat = (rep: ScanReport) => {
    // Store current scan ID in session storage as context for AI Chat
    sessionStorage.setItem('chat_scan_context', JSON.stringify(rep));
    navigate('/chat');
  };

  const handleSaveHistory = (rep: ScanReport) => {
    const existing = JSON.parse(localStorage.getItem('farmlens_history') || '[]');
    const isDuplicate = existing.some((item: ScanReport) => item.id === rep.id);
    if (!isDuplicate) {
      localStorage.setItem('farmlens_history', JSON.stringify([rep, ...existing]));
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleOpenReminderModal = (rep: ScanReport) => {
    setReminderTitle(`Checkup: ${rep.breed} (${rep.animalType})`);
    setReminderModalOpen(true);
  };

  const handleCreateReminder = () => {
    const existing = JSON.parse(localStorage.getItem('farmlens_reminders') || '[]');
    const newRem = {
      id: `rem-${Date.now()}`,
      animalName: report.animalName || report.breed,
      title: reminderTitle,
      type: reminderType,
      dueDate: reminderDate,
      completed: false,
    };
    localStorage.setItem('farmlens_reminders', JSON.stringify([newRem, ...existing]));
    setReminderSuccess(true);
    setTimeout(() => {
      setReminderSuccess(false);
      setReminderModalOpen(false);
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `FarmLens AI Report: ${report.breed}`,
          text: `Scan report for ${report.animalType} (${report.breed}). Risk level: ${report.riskLevel}.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Report link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-200">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/scan')}
          >
            Scan Another Animal
          </Button>
          <span className="text-xs text-slate-600">|</span>
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Report ID: {report.id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <Badge variant="success" size="sm" icon={<BookmarkCheck className="w-3.5 h-3.5" />}>
              Saved to History!
            </Badge>
          )}

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={handleShare}
          >
            Share Report
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={() => navigate('/scan')}
          >
            New Scan
          </Button>
        </div>
      </div>

      {/* Main Result Card Component */}
      <ResultCard
        report={report}
        onAskChat={handleAskChat}
        onSaveHistory={handleSaveHistory}
        onSetReminder={handleOpenReminderModal}
      />

      {/* Reminder Creation Modal */}
      <Modal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        title="Set Care or Vaccination Reminder"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setReminderModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateReminder}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Save Reminder
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {reminderSuccess ? (
            <div className="p-4 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center gap-2 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Reminder saved successfully to local offline schedule!</span>
            </div>
          ) : (
            <>
              <Input
                label="Reminder Title"
                value={reminderTitle}
                onChange={(e) => setReminderTitle(e.target.value)}
                placeholder="e.g. Follow-up nasal check or ND Vaccine Booster"
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Reminder Category</label>
                <select
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value as any)}
                  className="w-full bg-[#09090B] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                >
                  <option value="checkup" className="bg-[#121214] text-white">Follow-up Health Checkup</option>
                  <option value="vaccination" className="bg-[#121214] text-white">Vaccination Schedule</option>
                  <option value="feeding" className="bg-[#121214] text-white">Special Nutrition & Feeding</option>
                  <option value="other" className="bg-[#121214] text-white">General Care Activity</option>
                </select>
              </div>

              <Input
                label="Due Date"
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
