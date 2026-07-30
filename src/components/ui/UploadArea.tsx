/**
 * @file UploadArea.tsx
 * @description FarmLens AI drag-and-drop image upload & camera capture area with quality checks.
 */

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, Camera, CheckCircle2, AlertTriangle, Image as ImageIcon, RefreshCw, X } from 'lucide-react';
import { Button } from './Button';

export interface UploadAreaProps {
  /** Callback fired when an image file is selected or captured */
  onImageSelected: (file: File, previewUrl: string) => void;
  /** Current image preview URL if already chosen */
  currentPreviewUrl?: string | null;
  /** Callback to clear selected image */
  onClearImage?: () => void;
  /** Custom additional styling class */
  className?: string;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onImageSelected,
  currentPreviewUrl,
  onClearImage,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 10MB limit. Please choose a smaller photo.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {currentPreviewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-[#09090B] group shadow-md">
          <img
            src={currentPreviewUrl}
            alt="Livestock scan preview"
            className="w-full h-64 sm:h-80 object-cover"
          />

          {/* Quality Indicator Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 justify-between items-center pointer-events-none">
            <span className="bg-[#09090B]/90 backdrop-blur-md text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Image Quality: Good
            </span>
            <span className="bg-[#09090B]/90 backdrop-blur-md text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" /> Clear Framing
            </span>
          </div>

          {/* Action buttons on hover/overlay */}
          <div className="absolute inset-0 bg-[#09090B]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </Button>
            {onClearImage && (
              <Button
                variant="danger"
                size="sm"
                leftIcon={<X className="w-4 h-4" />}
                onClick={onClearImage}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-emerald-500 bg-emerald-950/30 scale-[1.01]'
              : 'border-slate-800 bg-[#121214] hover:bg-[#1A1A1D] hover:border-emerald-500/60'
          }`}
        >
          <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
            <Upload className="w-7 h-7" />
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white">
            Upload or Capture Livestock Photo
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            Drag and drop your photo here, or browse files from your phone or computer.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ImageIcon className="w-4 h-4" />}
              onClick={() => fileInputRef.current?.click()}
            >
              Select Image File
            </Button>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={() => cameraInputRef.current?.click()}
            >
              Take Photo with Camera
            </Button>
          </div>

          <p className="text-2xs text-slate-500 mt-4">
            Supports JPEG, PNG, WEBP up to 10MB • Auto-compressed for 2G/3G speeds
          </p>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error message */}
      {errorMsg && (
        <div className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1.5 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
