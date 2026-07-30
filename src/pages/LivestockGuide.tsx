/**
 * @file LivestockGuide.tsx
 * @description FarmLens AI Offline-Capable Livestock Knowledge Base & Care Library.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Download,
  Check,
  ShieldAlert,
  ArrowRight,
  Filter,
  Wifi,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { KNOWLEDGE_ARTICLES } from '../data/mockData';
import { KnowledgeArticle, AnimalType } from '../types';

export const LivestockGuide: React.FC = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>(KNOWLEDGE_ARTICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeArticleModal, setActiveArticleModal] = useState<KnowledgeArticle | null>(null);

  const animalFilters: { key: string; label: string; icon: string }[] = [
    { key: 'all', label: 'All Livestock', icon: '🐾' },
    { key: 'goat', label: 'Goats', icon: '🐐' },
    { key: 'chicken', label: 'Chicken', icon: '🐔' },
    { key: 'sheep', label: 'Sheep', icon: '🐑' },
    { key: 'cow', label: 'Cattle', icon: '🐄' },
    { key: 'fish', label: 'Fish', icon: '🐟' },
  ];

  const categoryFilters = [
    { key: 'all', label: 'All Topics' },
    { key: 'breed', label: 'Breed Profiles' },
    { key: 'illness', label: 'Illness & Symptoms' },
    { key: 'nutrition', label: 'Nutrition & Feed' },
    { key: 'vaccination', label: 'Vaccination Schedules' },
    { key: 'care', label: 'General Care' },
  ];

  const toggleDownloadOffline = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, downloadedOffline: !art.downloadedOffline } : art))
    );
  };

  const filteredArticles = articles.filter((art) => {
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAnimal = selectedAnimalFilter === 'all' || art.animalType === selectedAnimalFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || art.category === selectedCategoryFilter;

    return matchesQuery && matchesAnimal && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Wifi className="w-3.5 h-3.5" /> Offline Knowledge Base
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Livestock Care & Reference Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search veterinary-reviewed breed profiles, symptom identification guides, and care schedules.
          </p>
        </div>

        <div className="bg-[#121214] text-white p-3.5 rounded-2xl border border-slate-800 text-xs flex items-center gap-3 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-white">100% Offline Ready</p>
            <p className="text-2xs text-slate-400">Knowledge base saved directly on device storage.</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search breed names, illnesses (e.g. PPR, Newcastle), or feeding tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121214] border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-xs"
          />
        </div>

        {/* Animal Species Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {animalFilters.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedAnimalFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedAnimalFilter === tab.key
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-2xs'
                  : 'bg-[#121214] text-slate-300 hover:bg-[#1A1A1D] border border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategoryFilter(cat.key)}
              className={`px-3 py-1 rounded-full text-2xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedCategoryFilter === cat.key
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-[#121214] text-slate-400 border border-slate-800 hover:bg-[#1A1A1D]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => (
            <Card
              key={art.id}
              hoverable
              onClick={() => setActiveArticleModal(art)}
              className="flex flex-col justify-between bg-[#121214] border-slate-800"
            >
              <CardHeader
                title={art.title}
                subtitle={
                  <span className="capitalize font-medium text-emerald-400">
                    {art.animalType} • {art.category}
                  </span>
                }
                action={
                  <button
                    onClick={(e) => toggleDownloadOffline(art.id, e)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                      art.downloadedOffline
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-[#1A1A1D] text-slate-400 border border-slate-800 hover:bg-[#27272A]'
                    }`}
                    title={art.downloadedOffline ? 'Available Offline' : 'Download for offline reading'}
                  >
                    {art.downloadedOffline ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                  </button>
                }
              />

              <CardContent className="space-y-3">
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{art.summary}</p>
                <div className="flex items-center justify-between text-2xs font-bold text-emerald-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Read Full Guide
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              icon={<BookOpen className="w-8 h-8 text-slate-400" />}
              title="No Guide Articles Found"
              description="Try adjusting your search query or selecting a different livestock species or topic category."
              actionText="Reset Search"
              onAction={() => {
                setSearchQuery('');
                setSelectedAnimalFilter('all');
                setSelectedCategoryFilter('all');
              }}
            />
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <Modal
          isOpen={!!activeArticleModal}
          onClose={() => setActiveArticleModal(null)}
          title={activeArticleModal.title}
          size="lg"
          footer={
            <Button variant="primary" size="sm" onClick={() => setActiveArticleModal(null)}>
              Close Guide
            </Button>
          }
        >
          <div className="space-y-4 text-slate-200">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
              <Badge variant="info" size="sm">
                Category: {activeArticleModal.category.toUpperCase()}
              </Badge>
              <span className="font-semibold text-emerald-400">
                Animal: {activeArticleModal.animalType.toUpperCase()}
              </span>
            </div>

            <div className="prose prose-invert text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-300">
              {activeArticleModal.content}
            </div>

            {activeArticleModal.symptoms && (
              <div className="bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/30 text-xs space-y-1">
                <h4 className="font-bold text-amber-400 flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4 text-amber-400" /> Key Visible Symptoms:
                </h4>
                <ul className="list-disc list-inside text-amber-200">
                  {activeArticleModal.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 bg-[#09090B] rounded-xl text-2xs text-slate-500 italic border border-slate-800">
              Non-diagnostic reference article provided for livestock educational and triage purposes.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
