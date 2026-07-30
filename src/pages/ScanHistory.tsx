/**
 * @file ScanHistory.tsx
 * @description FarmLens AI Offline Scan History & Per-Animal Record Tracker.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ScanReport } from '../types';
import { EmptyState } from '../components/ui/EmptyState';
import { SAMPLE_SCANS } from '../data/mockData';

export const ScanHistory: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<ScanReport[]>(() => {
    const saved = localStorage.getItem('farmlens_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const ids = new Set(parsed.map((item: ScanReport) => item.id));
        const combined = [...parsed, ...SAMPLE_SCANS.filter((item) => !ids.has(item.id))];
        return combined;
      } catch (e) {
        return SAMPLE_SCANS;
      }
    }
    return SAMPLE_SCANS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [selectedScanDetail, setSelectedScanDetail] = useState<ScanReport | null>(null);

  // Synchronize history from server API on mount
  useEffect(() => {
    async function fetchServerHistory() {
      try {
        const response = await fetch('/api/history');
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.scans)) {
            setHistory((prev) => {
              const ids = new Set(data.scans.map((s: ScanReport) => s.id));
              const combined = [...data.scans, ...prev.filter((s) => !ids.has(s.id))];
              return combined;
            });
          }
        }
      } catch (e) {
        console.warn('Failed to fetch history from server, using local history cache', e);
      }
    }
    fetchServerHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem('farmlens_history', JSON.stringify(history));
  }, [history]);

  const handleDeleteScan = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this scan record?')) {
      // Optimistically update state
      setHistory((prev) => prev.filter((s) => s.id !== id));
      if (selectedScanDetail?.id === id) {
        setSelectedScanDetail(null);
      }

      // Delete on server
      try {
        await fetch(`/api/history/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn(`Server deletion failed for scan ${id}`, err);
      }
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesQuery =
      (item.animalName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.animalType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter;

    return matchesQuery && matchesRisk;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
            <History className="w-8 h-8 text-emerald-400" />
            Scan History & Health Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Per-animal chronological records saved directly on your device storage for offline access.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/scan')}
        >
          New Scan
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by animal nickname, breed, or species..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121214] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-[#121214] border border-slate-800 rounded-xl px-3 py-2.5 font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all" className="bg-[#121214]">All Risk Levels</option>
            <option value="low" className="bg-[#121214]">Low Risk</option>
            <option value="medium" className="bg-[#121214]">Medium Risk</option>
            <option value="high" className="bg-[#121214]">High Risk</option>
          </select>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((scan) => {
            const riskVariant = {
              low: 'low' as const,
              medium: 'medium' as const,
              high: 'high' as const,
            }[scan.riskLevel];

            return (
              <Card
                key={scan.id}
                hoverable
                onClick={() => setSelectedScanDetail(scan)}
                className="transition-all bg-[#121214] border-slate-800 hover:border-emerald-500/50"
              >
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={scan.imageUrl}
                      alt={scan.breed}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border border-slate-800"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={riskVariant} size="sm">
                          {scan.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <span className="text-2xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-white text-base sm:text-lg">
                        {scan.animalName || scan.breed} ({scan.animalType.toUpperCase()})
                      </h3>

                      <p className="text-xs text-slate-400 font-medium">
                        Breed: {scan.breed} • Confidence: {scan.breedConfidence}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => setSelectedScanDetail(scan)}
                    >
                      View Report
                    </Button>
                    <button
                      onClick={(e) => handleDeleteScan(scan.id, e)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <EmptyState
            icon={<History className="w-8 h-8 text-slate-400" />}
            title="No Scan Records Found"
            description="Your saved scan history will appear here for offline access, disease tracking, and trend analysis."
            actionText="Start First Scan"
            onAction={() => navigate('/scan')}
          />
        )}
      </div>

      {/* Scan Detail Modal */}
      {selectedScanDetail && (
        <Modal
          isOpen={!!selectedScanDetail}
          onClose={() => setSelectedScanDetail(null)}
          title={`Scan Report — ${selectedScanDetail.animalName || selectedScanDetail.breed}`}
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  sessionStorage.setItem('chat_scan_context', JSON.stringify(selectedScanDetail));
                  navigate('/chat');
                }}
              >
                Ask AI Assistant About This Scan
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedScanDetail(null)}>
                Close Detail
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs sm:text-sm text-slate-200">
            <img
              src={selectedScanDetail.imageUrl}
              alt={selectedScanDetail.breed}
              className="w-full h-56 object-cover rounded-2xl border border-slate-800"
            />

            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="font-bold text-white">
                {selectedScanDetail.animalType.toUpperCase()} — {selectedScanDetail.breed}
              </span>
              <Badge variant={selectedScanDetail.riskLevel === 'low' ? 'low' : 'medium'}>
                {selectedScanDetail.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>

            <div>
              <h4 className="font-bold text-white mb-1">Symptoms:</h4>
              <p className="text-slate-300">{selectedScanDetail.symptoms.join(', ')}</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-1">Feeding Advice:</h4>
              <ul className="list-disc list-inside text-slate-300">
                {selectedScanDetail.feedingAdvice.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
