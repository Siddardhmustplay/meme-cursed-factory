
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface GlitchSettings {
  rgbChaos: number;
  scanlines: number;
  vhsCorruption: number;
  jpegCrunch: number;
  saturation: number;
}

interface MemeCanvasProps {
  image: string | null;
  topCaption: string;
  bottomCaption: string;
  glitchSettings: GlitchSettings;
}

export const MemeCanvas = forwardRef<HTMLCanvasElement, MemeCanvasProps>(
  ({ image, topCaption, bottomCaption, glitchSettings }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (image) {
        const img = new Image();
        img.onload = () => {
          // Calculate dimensions to fit image while maintaining aspect ratio
          const aspectRatio = img.width / img.height;
          let drawWidth = canvas.width;
          let drawHeight = canvas.width / aspectRatio;

          if (drawHeight > canvas.height) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * aspectRatio;
          }

          const x = (canvas.width - drawWidth) / 2;
          const y = (canvas.height - drawHeight) / 2;

          // Draw image
          ctx.drawImage(img, x, y, drawWidth, drawHeight);

          // Apply glitch effects
          applyGlitchEffects(ctx, canvas, glitchSettings);

          // Draw captions
          drawCaptions(ctx, canvas, topCaption, bottomCaption);
        };
        img.src = image;
      } else {
        // Draw placeholder
        ctx.fillStyle = '#333333';
        ctx.fillRect(100, 150, canvas.width - 200, canvas.height - 300);
        
        ctx.fillStyle = '#666666';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('UPLOAD IMAGE TO BEGIN CORRUPTION', canvas.width / 2, canvas.height / 2);
      }
    }, [image, topCaption, bottomCaption, glitchSettings]);

    const applyGlitchEffects = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, settings: GlitchSettings) => {
      // RGB Chaos effect
      if (settings.rgbChaos > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const intensity = settings.rgbChaos / 100;
        
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() < intensity * 0.3) {
            // RGB shift
            const shift = Math.floor(intensity * 20);
            data[i] = Math.min(255, data[i] + shift); // Red
            data[i + 2] = Math.max(0, data[i + 2] - shift); // Blue
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Scanlines effect
      if (settings.scanlines > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${settings.scanlines / 300})`;
        const lineSpacing = Math.max(2, 6 - Math.floor(settings.scanlines / 25));
        for (let y = 0; y < canvas.height; y += lineSpacing) {
          ctx.fillRect(0, y, canvas.width, 1);
        }
      }

      // VHS Corruption effect
      if (settings.vhsCorruption > 0) {
        const intensity = settings.vhsCorruption / 100;
        for (let i = 0; i < intensity * 10; i++) {
          const y = Math.random() * canvas.height;
          const height = Math.random() * 20 + 5;
          const shift = (Math.random() - 0.5) * intensity * 40;
          
          const imageData = ctx.getImageData(0, y, canvas.width, height);
          ctx.putImageData(imageData, shift, y);
        }
      }

      // JPEG Crunch effect (pixelation)
      if (settings.jpegCrunch > 0) {
        const quality = Math.max(0.1, 1 - (settings.jpegCrunch / 150));
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d')!;
        
        const scaledWidth = Math.max(50, canvas.width * quality);
        const scaledHeight = Math.max(50, canvas.height * quality);
        
        tempCanvas.width = scaledWidth;
        tempCanvas.height = scaledHeight;
        
        tempCtx.putImageData(
          ctx.getImageData(0, 0, canvas.width, canvas.height),
          0, 0
        );
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      }

      // Saturation effect
      if (settings.saturation > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const factor = 1 + (settings.saturation / 50);
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          
          data[i] = Math.min(255, gray + (r - gray) * factor);
          data[i + 1] = Math.min(255, gray + (g - gray) * factor);
          data[i + 2] = Math.min(255, gray + (b - gray) * factor);
        }
        ctx.putImageData(imageData, 0, 0);
      }
    };

    const drawCaptions = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, top: string, bottom: string) => {
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;

      // Top caption
      if (top) {
        ctx.font = 'bold 48px Impact, Arial Black';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeText(top, canvas.width / 2, 80);
        ctx.fillText(top, canvas.width / 2, 80);
      }

      // Bottom caption
      if (bottom) {
        ctx.font = 'bold 48px Impact, Arial Black';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeText(bottom, canvas.width / 2, canvas.height - 40);
        ctx.fillText(bottom, canvas.width / 2, canvas.height - 40);
      }
    };

    return (
      <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 transition-all duration-300 hover:border-red-400 hover:shadow-lg hover:shadow-red-400/20">
        <h2 className="text-2xl font-bold text-green-400 mb-4 font-mono tracking-wider">
          MEME CONSTRUCTION ZONE
        </h2>
        
        <div className="border-4 border-red-500 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-auto bg-black"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </div>
    );
  }
);

MemeCanvas.displayName = 'MemeCanvas';
