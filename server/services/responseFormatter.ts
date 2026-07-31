/**
 * FarmLens AI - Response Formatter Service
 * Parses and validates raw LLM response strings into structured JSON objects (ScanReport & Chat response).
 */

import { ScanReport, AnimalType, RiskLevel, PossibleCondition } from '../../src/types';

export class ResponseFormatter {
  /**
   * Sanitizes raw text string by removing markdown code fences and extraneous whitespace
   */
  public static cleanJsonString(rawText: string): string {
    if (!rawText) return '';
    
    let cleaned = rawText.trim();

    // Extract content inside ```json ... ``` or ``` ... ``` code blocks anywhere in output
    const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
      cleaned = codeBlockMatch[1].trim();
    } else {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }

    return cleaned;
  }

  /**
   * Formats raw Gemma model output into a valid ScanReport object with fallbacks
   */
  public static formatScanReport(
    rawOutput: string,
    fallbackInput: {
      animalType?: AnimalType;
      animalName?: string;
      imageUrl: string;
    }
  ): ScanReport {
    const cleanedJson = this.cleanJsonString(rawOutput);
    let parsed: any = null;

    if (cleanedJson) {
      try {
        parsed = JSON.parse(cleanedJson);
      } catch (err) {
        console.warn('[FarmLens AI] Failed to parse Gemma 4 output directly as JSON. Attempting regex extraction.');
        const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
          } catch (e) {
            console.error('[FarmLens AI] Regex JSON extraction failed as well.');
          }
        }
      }
    }

    if (!parsed || typeof parsed !== 'object' || Object.keys(parsed).length === 0) {
      console.error('[FarmLens AI] Gemma 4 model response could not be parsed as valid JSON. Raw output:', rawOutput.slice(0, 500));
      throw new Error('Gemma 4 model returned invalid response format that could not be parsed as JSON.');
    }

    const timestamp = new Date().toISOString();
    const scanId = `scan-${Date.now().toString().slice(-6)}`;

    // Normalize animalType
    const validTypes: AnimalType[] = ['chicken', 'goat', 'sheep', 'cow', 'fish', 'rabbit', 'duck'];
    let animalType: AnimalType = fallbackInput.animalType || 'goat';
    if (parsed.animalType && validTypes.includes(parsed.animalType.toLowerCase() as AnimalType)) {
      animalType = parsed.animalType.toLowerCase() as AnimalType;
    }

    const breed = (parsed.breed && typeof parsed.breed === 'string' && parsed.breed.trim().length > 0)
      ? parsed.breed.trim()
      : 'Unspecified / Local Breed';

    const breedConfidence = typeof parsed.breedConfidence === 'number'
      ? Math.min(100, Math.max(0, Math.round(parsed.breedConfidence)))
      : 50;

    const estimatedAge = (parsed.estimatedAge && typeof parsed.estimatedAge === 'string' && parsed.estimatedAge.trim().length > 0)
      ? parsed.estimatedAge.trim()
      : 'Age range not specified';

    // Normalize risk level
    let riskLevel: RiskLevel = 'low';
    if (parsed.riskLevel && ['low', 'medium', 'high'].includes(parsed.riskLevel.toLowerCase())) {
      riskLevel = parsed.riskLevel.toLowerCase() as RiskLevel;
    }

    // Normalize symptoms - preserve empty array if model returned []
    const symptoms: string[] = Array.isArray(parsed.symptoms)
      ? parsed.symptoms.map(String).filter((s) => s.trim().length > 0)
      : [];

    // Normalize possible conditions
    let possibleConditions: PossibleCondition[] = [];
    if (Array.isArray(parsed.possibleConditions) && parsed.possibleConditions.length > 0) {
      possibleConditions = parsed.possibleConditions.map((c: any, index: number) => ({
        id: c.id || `cond-${index + 1}`,
        condition: String(c.condition || 'General Observation'),
        confidence: typeof c.confidence === 'number' ? Math.min(100, Math.max(10, Math.round(c.confidence))) : 75,
        explanation: String(c.explanation || 'Non-diagnostic visual observation based on physical indicators.'),
      }));
    } else {
      possibleConditions = [
        {
          id: 'cond-1',
          condition: riskLevel === 'low' ? 'Optimal Health Profile' : 'Sub-optimal Condition / Environmental Stress',
          confidence: 85,
          explanation: 'Physical appearance evaluated via multimodal vision analysis.',
        },
      ];
    }

    // Vet referral
    const vetReferralRecommended = typeof parsed.vetReferralRecommended === 'boolean'
      ? parsed.vetReferralRecommended
      : riskLevel === 'high' || riskLevel === 'medium';

    // Feeding advice
    const feedingAdvice: string[] = Array.isArray(parsed.feedingAdvice) && parsed.feedingAdvice.length > 0
      ? parsed.feedingAdvice.map(String)
      : [
          'Provide clean, fresh water in shaded troughs at all times.',
          'Supplement diet with high-quality fodder or standard feed mixture.',
        ];

    // Care recommendations
    const careRecommendations: string[] = Array.isArray(parsed.careRecommendations) && parsed.careRecommendations.length > 0
      ? parsed.careRecommendations.map(String)
      : [
          'Maintain dry, elevated shelter with clean bedding.',
          'Monitor body temperature and activity levels daily.',
        ];

    // Purchase advice
    const purchaseAdvice = parsed.purchaseAdvice
      ? String(parsed.purchaseAdvice)
      : 'Verify eye clarity, gait stability, and mouth/gum condition before committing to purchase.';

    // Animal Name
    const animalName = fallbackInput.animalName || parsed.animalName || `${animalType.toUpperCase()} #${scanId.slice(-4)}`;

    const scanReport: ScanReport = {
      id: scanId,
      animalName,
      imageUrl: fallbackInput.imageUrl,
      animalType,
      breed,
      breedConfidence,
      estimatedAge,
      symptoms,
      possibleConditions,
      riskLevel,
      vetReferralRecommended,
      feedingAdvice,
      careRecommendations,
      purchaseAdvice,
      createdAt: timestamp,
      notes: parsed.notes || `Analyzed via FarmLens Gemma Multimodal AI on ${new Date().toLocaleDateString()}`,
    };

    return scanReport;
  }
}
