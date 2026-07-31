/**
 * FarmLens AI - Shared Express API App
 * Defines all /scan, /chat, /history routes as a reusable Express app.
 * Used by BOTH:
 *  - server.ts (local dev, via tsx + Vite middleware)
 *  - netlify/functions/api.ts (production, via serverless-http)
 *
 * This file must NOT call app.listen() and must NOT touch Vite/static serving —
 * those stay in server.ts, since Netlify serves the built frontend separately from `dist`.
 */

import express, { Request, Response } from 'express';
import { gemmaService } from './services/gemmaService';
import { historyStore } from './storage/historyStore';
import { AnimalType, SupportedLanguage } from '../src/types';

export function createApiApp() {
  const app = express();

  // Body parsing middlewares with 20MB limit for image data
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  /**
   * GET /api/health
   * Endpoint to verify server & Gemma AI configuration status.
   */
  const handleHealth = (req: Request, res: Response) => {
    const isConfigured = !!(
      process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
      process.env.GEMINI_API_KEY !== 'unconfigured'
    );
    res.json({
      status: 'ok',
      service: 'FarmLens AI Backend',
      version: '1.0.0',
      aiProvider: 'Google Gemini API',
      model: 'gemma-4-26b-a4b-it',
      gemmaConfigured: isConfigured,
      timestamp: new Date().toISOString(),
    });
  };
  app.get('/health', handleHealth);
  app.get('/api/health', handleHealth);

  /**
   * POST /scan (alias: /api/scan)
   */
  const handleScan = async (req: Request, res: Response) => {
    try {
      const { image, animalType, animalName, language } = req.body;

      if (!image) {
        return res.status(400).json({
          error: 'Image data is required. Please provide a base64 Data URL or image string in the "image" field.',
        });
      }

      const scanReport = await gemmaService.analyzeLivestockImage({
        imageInput: image,
        animalType: animalType as AnimalType,
        animalName,
        language: language as SupportedLanguage,
      });

      historyStore.saveScan(scanReport);

      return res.status(200).json({
        success: true,
        scan: scanReport,
      });
    } catch (error: any) {
      console.error('Error handling /scan endpoint:', error?.message || error);
      return res.status(500).json({
        error: error?.message || 'Failed to process livestock scan analysis.',
      });
    }
  };
  app.post('/scan', handleScan);
  app.post('/api/scan', handleScan);

  /**
   * POST /chat (alias: /api/chat)
   */
  const handleChat = async (req: Request, res: Response) => {
    try {
      const { message, scanContext, history, language } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({
          error: 'Message string is required.',
        });
      }

      const chatReply = await gemmaService.generateChatReply({
        message: message.trim(),
        scanContext,
        history,
        language: language as SupportedLanguage,
      });

      return res.status(200).json({
        success: true,
        ...chatReply,
      });
    } catch (error: any) {
      console.error('Error handling /chat endpoint:', error?.message || error);
      return res.status(500).json({
        error: error?.message || 'Failed to generate chat reply.',
      });
    }
  };
  app.post('/chat', handleChat);
  app.post('/api/chat', handleChat);

  /**
   * GET /history (alias: /api/history)
   */
  const handleGetHistory = (req: Request, res: Response) => {
    try {
      const species = req.query.species as string | undefined;
      const riskLevel = req.query.riskLevel as string | undefined;
      const searchQuery = (req.query.q || req.query.query) as string | undefined;

      const scans = historyStore.getAllScans({ species, riskLevel, searchQuery });

      return res.status(200).json({
        success: true,
        scans,
        totalCount: scans.length,
      });
    } catch (error: any) {
      console.error('Error handling /history endpoint:', error?.message || error);
      return res.status(500).json({
        error: error?.message || 'Failed to retrieve scan history.',
      });
    }
  };
  app.get('/history', handleGetHistory);
  app.get('/api/history', handleGetHistory);

  /**
   * GET /history/:id (alias: /api/history/:id)
   */
  const handleGetHistoryById = (req: Request, res: Response) => {
    const { id } = req.params;
    const scan = historyStore.getScanById(id);

    if (!scan) {
      return res.status(404).json({ error: `Scan report with ID "${id}" not found.` });
    }

    return res.status(200).json({ success: true, scan });
  };
  app.get('/history/:id', handleGetHistoryById);
  app.get('/api/history/:id', handleGetHistoryById);

  /**
   * DELETE /history/:id (alias: /api/history/:id)
   */
  const handleDeleteHistory = (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = historyStore.deleteScan(id);

    if (!deleted) {
      return res.status(404).json({ error: `Scan report with ID "${id}" not found.` });
    }

    return res.status(200).json({ success: true, message: 'Scan report deleted successfully.' });
  };
  app.delete('/history/:id', handleDeleteHistory);
  app.delete('/api/history/:id', handleDeleteHistory);

  return app;
}