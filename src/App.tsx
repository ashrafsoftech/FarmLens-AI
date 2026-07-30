/**
 * FarmLens AI - Main Application Entry & Routing Configuration
 * Includes lazy-loaded pages and Suspense fallbacks for optimal bundle size and performance.
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { Loader } from './components/ui/Loader';

// Lazy-loaded pages for bundle code splitting
const Home = React.lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Scan = React.lazy(() => import('./pages/Scan').then((m) => ({ default: m.Scan })));
const Results = React.lazy(() => import('./pages/Results').then((m) => ({ default: m.Results })));
const AIChat = React.lazy(() => import('./pages/AIChat').then((m) => ({ default: m.AIChat })));
const LivestockGuide = React.lazy(() => import('./pages/LivestockGuide').then((m) => ({ default: m.LivestockGuide })));
const ScanHistory = React.lazy(() => import('./pages/ScanHistory').then((m) => ({ default: m.ScanHistory })));
const Settings = React.lazy(() => import('./pages/Settings').then((m) => ({ default: m.Settings })));
const NotFound = React.lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// Initialize React Query client for server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<Loader message="Loading FarmLens AI..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/results" element={<Results />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/guide" element={<LivestockGuide />} />
                <Route path="/history" element={<ScanHistory />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
