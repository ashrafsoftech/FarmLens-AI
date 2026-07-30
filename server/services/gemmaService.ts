/**
 * FarmLens AI - Gemma Service
 * Integrates Google GenAI SDK (gemini-3.6-flash) for server-side multimodal image scan analysis and conversational chat.
 */

import { GoogleGenAI, Type } from '@google/genai';
import { ImageProcessor, ProcessedImage } from './imageProcessor';
import { PromptBuilder } from './promptBuilder';
import { ResponseFormatter } from './responseFormatter';
import { AnimalType, SupportedLanguage, ScanReport, ChatMessage } from '../../src/types';

export class GemmaService {
  private ai: GoogleGenAI | null = null;
  private readonly MODEL_NAME = 'gemini-3.6-flash';

  constructor() {
    this.initClient();
  }

  /**
   * Initializes the GoogleGenAI client lazily using process.env.GEMINI_API_KEY
   */
  private initClient(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('GEMINI_API_KEY environment variable is not set. Gemini API requests will fall back to rule-based analysis until configured.');
      }
      this.ai = new GoogleGenAI({
        apiKey: apiKey || 'unconfigured',
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return this.ai;
  }

  /**
   * Performs multimodal analysis on a livestock image to generate a structured ScanReport
   */
  public async analyzeLivestockImage(params: {
    imageInput: string | { dataUrl?: string; base64?: string; mimeType?: string };
    animalType?: AnimalType;
    animalName?: string;
    language?: SupportedLanguage;
  }): Promise<ScanReport> {
    const { imageInput, animalType, animalName, language = 'en' } = params;

    // 1. Process and validate image upload
    const processedImage: ProcessedImage = ImageProcessor.processImage(imageInput);

    // 2. Build system instruction and user prompt
    const systemInstruction = PromptBuilder.getScanSystemInstruction(language);
    const userPrompt = PromptBuilder.buildScanUserPrompt({ animalType, animalName, language });

    // 3. Check API key readiness
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'unconfigured') {
      console.warn('GEMINI_API_KEY not configured or placeholder detected. Generating structured fallback report.');
      return ResponseFormatter.formatScanReport('{}', {
        animalType,
        animalName,
        imageUrl: processedImage.dataUrl,
      });
    }

    try {
      const client = this.initClient();

      // 4. Call Gemini API via @google/genai SDK
      const response = await client.models.generateContent({
        model: this.MODEL_NAME,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: processedImage.mimeType,
                data: processedImage.base64Data,
              },
            },
            {
              text: userPrompt,
            },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              animalType: { type: Type.STRING, description: 'Species e.g. goat, chicken, sheep, cow, fish, rabbit, duck' },
              breed: { type: Type.STRING, description: 'Identified breed name e.g. West African Dwarf Goat' },
              breedConfidence: { type: Type.INTEGER, description: 'Confidence score 0-100' },
              estimatedAge: { type: Type.STRING, description: 'Age estimation e.g. 8-12 months' },
              symptoms: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Visible health symptoms or posture notes',
              },
              possibleConditions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    condition: { type: Type.STRING },
                    confidence: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                  required: ['condition', 'confidence', 'explanation'],
                },
              },
              riskLevel: { type: Type.STRING, description: 'low, medium, or high' },
              vetReferralRecommended: { type: Type.BOOLEAN },
              feedingAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
              careRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              purchaseAdvice: { type: Type.STRING },
              notes: { type: Type.STRING },
            },
            required: [
              'animalType',
              'breed',
              'breedConfidence',
              'estimatedAge',
              'symptoms',
              'possibleConditions',
              'riskLevel',
              'vetReferralRecommended',
              'feedingAdvice',
              'careRecommendations',
              'purchaseAdvice',
            ],
          },
        },
      });

      const responseText = response.text || '';
      return ResponseFormatter.formatScanReport(responseText, {
        animalType,
        animalName,
        imageUrl: processedImage.dataUrl,
      });
    } catch (error: any) {
      console.error('Error in Gemma Service analyzeLivestockImage:', error?.message || error);
      // Fallback format on network or API failure
      return ResponseFormatter.formatScanReport('{}', {
        animalType,
        animalName,
        imageUrl: processedImage.dataUrl,
      });
    }
  }

  /**
   * Generates a conversational reply for FarmLens AI Assistant grounded in context
   */
  public async generateChatReply(params: {
    message: string;
    history?: ChatMessage[] | { role: 'user' | 'model'; parts: { text: string }[] }[];
    scanContext?: ScanReport | null;
    language?: SupportedLanguage;
  }): Promise<{ reply: string; timestamp: string; scanContextId?: string }> {
    const { message, scanContext, language = 'en' } = params;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'unconfigured') {
      return {
        reply: `Thank you for asking. (Offline/Pre-key mode): For ${
          scanContext ? scanContext.breed : 'your livestock'
        }, always ensure access to clean water, dry housing, proper vaccination boosters, and consult a local agricultural extension officer or veterinarian for any signs of physical distress.`,
        timestamp: new Date().toISOString(),
        scanContextId: scanContext?.id,
      };
    }

    try {
      const client = this.initClient();
      const systemInstruction = PromptBuilder.getChatSystemInstruction(scanContext, language);

      const response = await client.models.generateContent({
        model: this.MODEL_NAME,
        contents: [
          {
            text: message,
          },
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'I am FarmLens AI. How else can I assist with your livestock health or feeding?';

      return {
        reply: replyText,
        timestamp: new Date().toISOString(),
        scanContextId: scanContext?.id,
      };
    } catch (error: any) {
      console.error('Error in Gemma Service generateChatReply:', error?.message || error);
      return {
        reply: `I encountered a connection hiccup while processing your inquiry. Generally, keep your ${
          scanContext ? scanContext.animalType : 'livestock'
        } in dry shelter, provide clean water with electrolytes, and consult a vet if symptoms persist.`,
        timestamp: new Date().toISOString(),
        scanContextId: scanContext?.id,
      };
    }
  }
}

export const gemmaService = new GemmaService();
