/**
 * FarmLens AI - Image Processor Service
 * Validates, checks payload sizes, and prepares image data for Gemini AI multimodal processing.
 */

export interface ProcessedImage {
  mimeType: string;
  base64Data: string;
  dataUrl: string;
}

export class ImageProcessor {
  /**
   * Maximum allowed image payload size in bytes (10MB)
   */
  private static MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

  /**
   * Allowed IANA MIME types for image processing
   */
  private static ALLOWED_MIME_TYPES = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/heic',
    'image/heif',
  ]);

  /**
   * Validates and processes an image input (Data URL, Base64 string, or object)
   * @param input Raw image input from request body
   * @returns ProcessedImage object with normalized mimeType, base64Data, and dataUrl
   */
  public static processImage(input: string | { dataUrl?: string; base64?: string; mimeType?: string }): ProcessedImage {
    if (!input) {
      throw new Error('Image payload is required. Please upload or capture an image of the livestock.');
    }

    let dataUrl = '';
    let mimeType = 'image/jpeg'; // Default fallback
    let base64Data = '';

    if (typeof input === 'string') {
      const trimmed = input.trim();
      if (trimmed.startsWith('blob:')) {
        throw new Error('Invalid image input: browser Blob URL received. Expected Base64 image data.');
      }

      if (trimmed.startsWith('data:')) {
        dataUrl = trimmed;
        const matches = trimmed.match(/^data:(image\/[a-zA-Z0-9\+\-\.]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          mimeType = matches[1].toLowerCase();
          base64Data = matches[2].trim();
        } else {
          throw new Error('Invalid Data URL format. Expected "data:image/...;base64,..."');
        }
      } else {
        // Raw base64 string assumed as jpeg
        base64Data = trimmed;
        dataUrl = `data:${mimeType};base64,${base64Data}`;
      }
    } else if (typeof input === 'object') {
      if (input.dataUrl) {
        return this.processImage(input.dataUrl);
      }
      if (input.base64) {
        base64Data = input.base64.trim();
        mimeType = (input.mimeType || 'image/jpeg').toLowerCase();
        dataUrl = `data:${mimeType};base64,${base64Data}`;
      }
    }

    if (!base64Data) {
      throw new Error('Unable to extract base64 image data from request payload.');
    }

    // Validate MIME type
    if (!this.ALLOWED_MIME_TYPES.has(mimeType)) {
      // Normalize common aliases
      if (mimeType === 'image/jpg') {
        mimeType = 'image/jpeg';
      } else {
        throw new Error(`Unsupported image format "${mimeType}". Allowed formats: JPEG, PNG, WebP, GIF, HEIC.`);
      }
    }

    // Estimate byte size of base64 data
    const estimatedSizeBytes = Math.round((base64Data.length * 3) / 4);
    if (estimatedSizeBytes > this.MAX_IMAGE_SIZE_BYTES) {
      throw new Error(`Image size (${(estimatedSizeBytes / (1024 * 1024)).toFixed(2)} MB) exceeds the maximum limit of 10 MB.`);
    }

    return {
      mimeType,
      base64Data,
      dataUrl,
    };
  }
}
