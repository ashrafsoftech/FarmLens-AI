/**
 * FarmLens AI - Express Backend Server
 * Entry point for API routes (/scan, /chat, /history) and Vite frontend integration.
 */

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { gemmaService } from './server/services/gemmaService';
import { historyStore } from './server/storage/historyStore';
import { AnimalType, SupportedLanguage } from './src/types';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middlewares with 20MB limit for image data
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  /**
   * GET /api/health
   * Endpoint to verify server & Gemini AI configuration status.
   */
  const handleHealth = (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'FarmLens AI Backend',
      version: '1.0.0',
      geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
      model: 'gemini-3.6-flash',
      timestamp: new Date().toISOString(),
    });
  };
  app.get('/health', handleHealth);
  app.get('/api/health', handleHealth);

  /**
   * POST /scan (alias: /api/scan)
   * Analyzes an uploaded or base64 livestock image using Gemma AI (gemini-3.6-flash).
   * Body parameters:
   *  - image (string): Base64 Data URL or raw base64 string (Required)
   *  - animalType (AnimalType): Optional species hint
   *  - animalName (string): Optional nickname or tag ID
   *  - language (SupportedLanguage): Preferred local language
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

      // Save to server history store
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
   * Generates grounded AI conversational advice using Gemma AI.
   * Body parameters:
   *  - message (string): User query text (Required)
   *  - scanContext (ScanReport): Optional current scan context
   *  - history (array): Previous message logs
   *  - language (SupportedLanguage): Preferred local language
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
   * Retrieves stored scan reports history.
   * Query parameters:
   *  - species (string): Filter by animal species
   *  - riskLevel (string): Filter by risk level ('low', 'medium', 'high')
   *  - q (string): Search query
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
   * Retrieves a single scan report by ID.
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
   * Deletes a scan report by ID.
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

  // Vite middleware setup for Development or Static serving for Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 FarmLens AI Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
