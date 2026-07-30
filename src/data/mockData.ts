/**
 * FarmLens AI - Mock Data Store
 * Provides initial realistic data for scans, animals, knowledge base, chat, and reminders
 */

import { ScanReport, AnimalProfile, KnowledgeArticle, CareReminder, ChatMessage } from '../types';

export const SAMPLE_ANIMALS: AnimalProfile[] = [
  {
    id: 'anim-001',
    name: 'Kano Goat #1',
    type: 'goat',
    breed: 'West African Dwarf Goat',
    age: '8-12 months',
    location: 'Barn A - Niger State',
    lastScanDate: '2026-07-28',
    totalScans: 4,
  },
  {
    id: 'anim-002',
    name: 'Flock-A Layer Hens',
    type: 'chicken',
    breed: 'ShikaBrown Layer',
    age: '5 months',
    location: 'Coop 2 - Ibadan',
    lastScanDate: '2026-07-29',
    totalScans: 6,
  },
  {
    id: 'anim-003',
    name: 'Balami Ram',
    type: 'sheep',
    breed: 'Balami Sheep',
    age: '1.5 years',
    location: 'Abuja Market Lot',
    lastScanDate: '2026-07-25',
    totalScans: 2,
  },
  {
    id: 'anim-004',
    name: 'Tilapia Pond #1',
    type: 'fish',
    breed: 'Nile Tilapia (Oreochromis niloticus)',
    age: '3 months',
    location: 'FUT Minna Farm Pond',
    lastScanDate: '2026-07-20',
    totalScans: 1,
  },
];

export const SAMPLE_SCANS: ScanReport[] = [
  {
    id: 'scan-101',
    animalId: 'anim-001',
    animalName: 'Kano Goat #1',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=800',
    animalType: 'goat',
    breed: 'West African Dwarf Goat',
    breedConfidence: 91,
    estimatedAge: '8-12 months',
    symptoms: [
      'Mild nasal discharge',
      'Slight lethargy during morning grazing',
      'Ruffled coat shine around neck',
    ],
    possibleConditions: [
      {
        id: 'cond-1',
        condition: 'Peste des Petits Ruminants (PPR) - Early Suspicion',
        confidence: 42,
        explanation: 'Nasal discharge is a common non-specific symptom. Early PPR or mild respiratory exposure may present similarly.',
      },
      {
        id: 'cond-2',
        condition: 'Environmental Dust / Heat Stress',
        confidence: 58,
        explanation: 'Dry season dust in Niger State frequently causes ocular and nasal discharge without systemic infection.',
      },
    ],
    riskLevel: 'medium',
    vetReferralRecommended: true,
    feedingAdvice: [
      'Provide clean, dust-free fresh water at all times with electrolyte supplement.',
      'Feed wilted cassava leaves mixed with dry maize bran for energy.',
      'Ensure access to mineral salt licks in shelter.',
    ],
    careRecommendations: [
      'Isolate from other goats for 48 hours to monitor discharge progression.',
      'Keep shelter elevated, dry, and sheltered from strong evening wind draft.',
      'Record morning and evening body temperature if thermometer is available.',
    ],
    purchaseAdvice: 'If purchasing at market: Verify eye clarity, examine gums for pale coloration (anemia indicator), and ensure goat stands firmly on all four hooves.',
    createdAt: '2026-07-29T09:30:00Z',
    notes: 'Checked by Musa during morning farm routine.',
  },
  {
    id: 'scan-102',
    animalId: 'anim-002',
    animalName: 'Flock-A Layer Hens',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800',
    animalType: 'chicken',
    breed: 'ShikaBrown Layer',
    breedConfidence: 88,
    estimatedAge: '20 weeks (Point of Lay)',
    symptoms: [
      'Healthy bright red comb',
      'Alert eyes and active posture',
      'Smooth feather arrangement',
    ],
    possibleConditions: [
      {
        id: 'cond-3',
        condition: 'Optimal Health Profile',
        confidence: 94,
        explanation: 'No visible signs of illness or physical distress detected in image scan.',
      },
    ],
    riskLevel: 'low',
    vetReferralRecommended: false,
    feedingAdvice: [
      'Maintain standard Layer Mash with 16.5% crude protein and 3.5% calcium.',
      'Provide coarse limestone grit to support strong eggshell formation.',
      'Ensure clean water bowls are disinfected daily.',
    ],
    careRecommendations: [
      'Maintain 14-16 hours of light per day for steady egg production.',
      'Ensure nesting boxes are clean and layered with fresh dry wood shavings.',
      'Administer Newcastle ND-LaSota booster as scheduled on week 22.',
    ],
    purchaseAdvice: 'Excellent condition for purchase. Bright comb, firm vent, and active demeanor indicate high laying potential.',
    createdAt: '2026-07-28T14:15:00Z',
  },
  {
    id: 'scan-103',
    animalId: 'anim-003',
    animalName: 'Balami Ram',
    imageUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&q=80&w=800',
    animalType: 'sheep',
    breed: 'Balami Sheep',
    breedConfidence: 85,
    estimatedAge: '1.5 years',
    symptoms: [
      'Swollen interdigital space on rear right hoof',
      'Favoring left rear leg when standing',
    ],
    possibleConditions: [
      {
        id: 'cond-4',
        condition: 'Foot Rot / Interdigital Dermatitis',
        confidence: 72,
        explanation: 'Swelling between hooves with mild limping is characteristic of bacterial foot rot common in wet bedding.',
      },
    ],
    riskLevel: 'high',
    vetReferralRecommended: true,
    feedingAdvice: [
      'Provide high-protein leguminous fodder (e.g. cowpea hay, groundnut haums).',
      'Supplement feed with Zinc oxide or mineral blocks to support skin & hoof repair.',
    ],
    careRecommendations: [
      'Clean hoof thoroughly with mild disinfectant solution (e.g. copper sulfate footbath).',
      'Keep sheep in dry, elevated pen; replace damp bedding immediately.',
      'Consult local extension officer or vet for antibiotic foot spray or injection.',
    ],
    purchaseAdvice: 'Negotiate price downward due to active foot injury. Require treatment before long transport to avoid severe condition worsening.',
    createdAt: '2026-07-25T11:00:00Z',
  },
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'kb-001',
    title: 'West African Dwarf Goat: Breed Profile & Care',
    animalType: 'goat',
    category: 'breed',
    summary: 'Hardy, trypanotolerant goat breed native to West Africa, highly suited for smallholder farms.',
    content: `The West African Dwarf (WAD) goat is one of the most resilient livestock breeds in West and Central Africa. Known for high fertility, resistance to trypanosomiasis (tsetse fly fever), and adaptability to humid climates.

Key Traits:
- Compact body structure, mature height 30-50 cm.
- Coat color varies from solid black, brown, white to spotted combinations.
- Kidding interval: 7-8 months; frequently produces twins or triplets.

Housing & Care:
- Keep pens dry and elevated off the wet soil.
- Provide bamboo or wooden slatted floors for easy dung drainage.
- Protect from cold night wind draft.`,
    downloadedOffline: true,
  },
  {
    id: 'kb-002',
    title: 'Peste des Petits Ruminants (PPR) Early Identification',
    animalType: 'goat',
    category: 'illness',
    summary: 'Critical viral disease affecting goats and sheep. Early recognition saves herds.',
    content: `PPR (also known as Goat Plague) is a highly contagious viral disease.

Common Visible Symptoms:
- High fever (40-41°C)
- Watery to thick crusty discharge from eyes and nose
- Lesions, sores, and foul odor in mouth and gums
- Severe diarrhea and difficulty breathing

Prevention & Action:
- Annual PPR vaccination is essential before rainy season.
- Quarantine new goats for 21 days before joining existing herd.
- Non-diagnostic note: Immediate veterinary consultation required if mouth sores and watery diarrhea appear together.`,
    symptoms: ['Eye discharge', 'Nasal crusts', 'Mouth sores', 'Diarrhea'],
    prevention: ['Annual PPR Vaccine', '21-day quarantine', 'Sanitize feeding troughs'],
    downloadedOffline: true,
  },
  {
    id: 'kb-003',
    title: 'Newcastle Disease Prevention in Backyard Poultry',
    animalType: 'chicken',
    category: 'vaccination',
    summary: 'Comprehensive vaccination and biosecurity guidelines for smallholder poultry keepers.',
    content: `Newcastle Disease (ND) is the leading cause of sudden mass poultry deaths across rural Africa.

Vaccination Schedule:
- Day 1-7: ND Hitchner B1 or I-2 (eye drop)
- Week 3: Newcastle Lasota (drinking water or eye drop)
- Every 3-4 months: Thermostable I-2 vaccine (vital for rural areas without electricity cold chains).

Biosecurity Best Practices:
- Do not introduce live market birds into your coop without 14 days quarantine.
- Restrict wild birds from feed bowls.
- Use ash or lime at coop entryways as a natural boot disinfectant.`,
    downloadedOffline: true,
  },
  {
    id: 'kb-004',
    title: 'Catfish & Tilapia Water Quality Management',
    animalType: 'fish',
    category: 'care',
    summary: 'Maintaining dissolved oxygen, pH, and ammonia levels in concrete and earthen ponds.',
    content: `Successful fish farming in Nigeria depends 80% on water quality management.

Key Parameters:
- Dissolved Oxygen (DO): > 4.0 mg/L (Fish piping at water surface indicates low oxygen).
- pH Range: 6.5 - 8.5
- Temperature: 26°C - 30°C optimal for Clarias catfish and Nile Tilapia.

Action Plan for Low Oxygen:
- Partial water exchange (20-30% fresh water).
- Reduce feeding quantity until water clears.
- Aerate pond water manually using splash buckets if no mechanical pump exists.`,
    downloadedOffline: true,
  },
  {
    id: 'kb-005',
    title: 'Balami & Uda Sheep Pre-Purchase Evaluation Guide',
    animalType: 'sheep',
    category: 'breed',
    summary: 'Trader checklist for evaluating large northern sheep breeds in livestock markets.',
    content: `Balami sheep are prized for festive seasons (Sallah) due to large frame size and white fleece.

Market Checklist:
1. Eyes: Clear, bright, no yellowing (jaundice) or milky film (pink eye).
2. Teeth & Jaw: Intact incisors matching estimated age (2 teeth = 1.5 yrs; 4 teeth = 2 yrs).
3. Hooves & Gait: No limping, no foul smell around hoof interdigital skin.
4. Brisket & Flank: Firm muscle fill without hollow flanks indicating chronic worms.`,
    downloadedOffline: false,
  },
];

export const SAMPLE_REMINDERS: CareReminder[] = [
  {
    id: 'rem-1',
    animalId: 'anim-001',
    animalName: 'Kano Goat #1',
    title: 'Deworming - Levamisole Drench',
    type: 'checkup',
    dueDate: '2026-08-05',
    completed: false,
    recurringDays: 90,
  },
  {
    id: 'rem-2',
    animalId: 'anim-002',
    animalName: 'Flock-A Layer Hens',
    title: 'Newcastle ND-LaSota Booster',
    type: 'vaccination',
    dueDate: '2026-08-12',
    completed: false,
    recurringDays: 120,
  },
  {
    id: 'rem-3',
    animalId: 'anim-003',
    animalName: 'Balami Ram',
    title: 'Hoof Trimming & Copper Sulfate Wash',
    type: 'other',
    dueDate: '2026-08-02',
    completed: false,
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Sannu / Hello! I am FarmLens AI Assistant. How can I help you with your livestock care, feeding, or scan results today?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];
