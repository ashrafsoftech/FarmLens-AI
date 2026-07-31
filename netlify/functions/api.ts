/**
 * FarmLens AI - Netlify Function Entry Point
 * Wraps the shared Express API app (server/app.ts) with serverless-http so it can
 * run as a single Netlify Function. netlify.toml redirects /api/* here.
 */

import dotenv from 'dotenv';
dotenv.config();

import serverless from 'serverless-http';
import { createApiApp } from '../../server/app';

const app = createApiApp();
const expressHandler = serverless(app);

// Netlify rewrites "/api/*" to "/.netlify/functions/api/:splat", so the incoming
// event path looks like "/.netlify/functions/api/scan". Our Express routes are
// registered as "/scan" and "/api/scan", so strip that Netlify prefix first.
const FUNCTION_PREFIX = '/.netlify/functions/api';

export const handler = async (event: any, context: any) => {
  if (typeof event.path === 'string' && event.path.startsWith(FUNCTION_PREFIX)) {
    event.path = event.path.slice(FUNCTION_PREFIX.length) || '/';
  }
  return expressHandler(event, context);
};