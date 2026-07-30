/**
 * @file NotFound.tsx
 * @description Agricultural-themed 404 page for unmatched routes in FarmLens AI.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Camera, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 text-slate-200">
      <div className="w-20 h-20 rounded-3xl bg-amber-950/80 text-amber-400 flex items-center justify-center shadow-md border border-amber-500/30">
        <AlertCircle className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-black text-white">404 — Page Not Found</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Looks like this pasture page doesn't exist or has been moved. Let's get you back to your livestock dashboard!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>

        <Link to="/scan">
          <Button variant="outline" size="md" leftIcon={<Camera className="w-4 h-4" />}>
            Scan Animal
          </Button>
        </Link>

        <Link to="/guide">
          <Button variant="ghost" size="md" leftIcon={<BookOpen className="w-4 h-4" />}>
            Livestock Guide
          </Button>
        </Link>
      </div>
    </div>
  );
};
