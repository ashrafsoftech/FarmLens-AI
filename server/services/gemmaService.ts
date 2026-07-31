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
  private currentKeyUsed: string | undefined = undefined;
  private readonly MODEL_NAME = 'gemma-4-26b-a4b-it';

  constructor() {
    // Empty constructor - defer client initialization until API request
  }

  /**
   * Initializes or returns the GoogleGenAI client lazily using process.env.GEMINI_API_KEY
   */
  private initClient(): GoogleGenAI {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!this.ai || this.currentKeyUsed !== apiKey) {
      this.currentKeyUsed = apiKey;
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

    console.log('[FarmLens AI] Starting livestock scan');
    console.log(`[FarmLens AI] Model: ${this.MODEL_NAME}`);
    console.log('[FarmLens AI] Multimodal input: image + prompt');

    // 1. Process and validate image upload
    const processedImage: ProcessedImage = ImageProcessor.processImage(imageInput);

    // 2. Build system instruction and user prompt
    const systemInstruction = PromptBuilder.getScanSystemInstruction(language);
    const userPrompt = PromptBuilder.buildScanUserPrompt({ animalType, animalName, language });

    // 3. Check API key readiness
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'unconfigured') {
      console.error('[FarmLens AI] GEMINI_API_KEY not configured or placeholder detected.');
      throw new Error('Gemma 4 model is unavailable: GEMINI_API_KEY is not configured on the server.');
    }

    try {
      const client = this.initClient();

      // 4. Call Gemma 4 API via @google/genai SDK
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
        },
      });

      console.log('[FarmLens AI] Gemma 4 response received');
      console.log(`[FarmLens AI] Model: ${this.MODEL_NAME}`);

      const responseText = response.text || '';
      console.log('[FarmLens AI] Raw Gemma 4 text output:', responseText);
      return ResponseFormatter.formatScanReport(responseText, {
        animalType,
        animalName,
        imageUrl: processedImage.dataUrl,
      });
    } catch (error: any) {
      console.error('[FarmLens AI] Error in Gemma Service analyzeLivestockImage:', error?.message || error);
      throw error;
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

    console.log('[FarmLens AI] Starting chat generation');
    console.log(`[FarmLens AI] Model: ${this.MODEL_NAME}`);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'unconfigured') {
      console.error('[FarmLens AI] GEMINI_API_KEY is not configured on the server.');
      throw new Error('Gemma 4 model is unavailable: GEMINI_API_KEY is not configured on the server.');
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

      console.log('[FarmLens AI] Gemma 4 chat reply received');
      console.log(`[FarmLens AI] Model: ${this.MODEL_NAME}`);

      const replyText = response.text || 'I am FarmLens AI. How else can I assist with your livestock health or feeding?';

      return {
        reply: replyText,
        timestamp: new Date().toISOString(),
        scanContextId: scanContext?.id,
      };
      } catch (error: any) {
  console.error('[FarmLens AI] Gemma request failed');
  console.error('[FarmLens AI] Error name:', error?.name);
  console.error('[FarmLens AI] Error message:', error?.message);
  console.error('[FarmLens AI] Error cause:', error?.cause);
  console.error('[FarmLens AI] Full error:', error);
  throw error;
}
    // } 
    // catch (error: any) {
    //   console.error('[FarmLens AI] Error in Gemma Service generateChatReply:', error?.message || error);
    //   throw error;
    // }
  }
}

export const gemmaService = new GemmaService();
