/**
 * FarmLens AI - Shared TypeScript Definitions
 * Phase 1 Foundation
 */

export type AnimalType = 'chicken' | 'goat' | 'sheep' | 'cow' | 'fish' | 'rabbit' | 'duck';

export type RiskLevel = 'low' | 'medium' | 'high';

export type SupportedLanguage = 'en' | 'ha' | 'yo' | 'ig' | 'pcm';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface PossibleCondition {
  id: string;
  condition: string;
  confidence: number; // 0-100
  explanation: string;
}

export interface ScanReport {
  id: string;
  userId?: string;
  animalId?: string | null;
  animalName?: string;
  imageUrl: string;
  animalType: AnimalType;
  breed: string;
  breedConfidence: number; // 0-100
  estimatedAge: string;
  symptoms: string[];
  possibleConditions: PossibleCondition[];
  riskLevel: RiskLevel;
  vetReferralRecommended: boolean;
  feedingAdvice: string[];
  careRecommendations: string[];
  purchaseAdvice?: string | null;
  createdAt: string;
  notes?: string;
}

export interface AnimalProfile {
  id: string;
  name: string;
  type: AnimalType;
  breed?: string;
  age?: string;
  location?: string;
  lastScanDate?: string;
  totalScans: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  scanContextId?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  animalType: AnimalType;
  category: 'breed' | 'illness' | 'nutrition' | 'care' | 'vaccination';
  summary: string;
  content: string;
  symptoms?: string[];
  prevention?: string[];
  treatmentNotice?: string;
  imageUrl?: string;
  downloadedOffline?: boolean;
}

export interface CareReminder {
  id: string;
  animalId?: string;
  animalName: string;
  title: string;
  type: 'vaccination' | 'feeding' | 'checkup' | 'other';
  dueDate: string;
  completed: boolean;
  recurringDays?: number;
}
