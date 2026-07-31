/**
 * FarmLens AI - Local Dev Server
 * Runs the shared API routes (server/app.ts) together with Vite middleware for local development,
 * or serves the built `dist` folder when NODE_ENV=production (e.g. non-Netlify hosting).
 * Netlify deployments do NOT use this file directly — see netlify/functions/api.ts instead.
 */

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createApiApp } from './server/app';

async function startServer() {
  const PORT = 3000;
  const app = createApiApp();

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