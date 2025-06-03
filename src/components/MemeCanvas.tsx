
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

    useImperativeHandle(ref, () => canvasRef.current!, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 500;
      canvas.height = 500;

      // Clear canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (image) {
        const img = new Image();
        img.onload = () => {
          // Draw image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Apply glitch effects
          applyGlitchEffects(ctx, canvas, glitchSettings);

          // Draw captions
          drawCaptions(ctx, canvas, topCaption, bottomCaption);
        };
        img.src = image;
      } else {
        // Draw placeholder
        drawPlaceholder(ctx, canvas);
        drawCaptions(ctx, canvas, topCaption, bottomCaption);
      }
    }, [image, topCaption, bottomCaption, glitchSettings]);

    const applyGlitchEffects = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, settings: GlitchSettings) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // RGB Chaos
      if (settings.rgbChaos > 0) {
        for (let i = 0; i < data.length; i += 4) {
          const intensity = settings.rgbChaos / 100;
          data[i] += Math.random() * 50 * intensity; // Red
          data[i + 1] += Math.random() * 50 * intensity; // Green
          data[i + 2] += Math.random() * 50 * intensity; // Blue
        }
      }

      // Saturation
      if (settings.saturation > 0) {
        for (let i = 0; i < data.length; i += 4) {
          const intensity = settings.saturation / 100;
          data[i] = Math.min(255, data[i] * (1 + intensity)); // Red
          data[i + 1] = Math.min(255, data[i + 1] * (1 + intensity)); // Green
          data[i + 2] = Math.min(255, data[i + 2] * (1 + intensity)); // Blue
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Scanlines
      if (settings.scanlines > 0) {
        ctx.globalAlpha = settings.scanlines / 200;
        ctx.fillStyle = 'black';
        for (let i = 0; i < canvas.height; i += 4) {
          ctx.fillRect(0, i, canvas.width, 2);
        }
        ctx.globalAlpha = 1;
      }

      // VHS Corruption (horizontal lines)
      if (settings.vhsCorruption > 0) {
        const lines = Math.floor(settings.vhsCorruption / 10);
        for (let i = 0; i < lines; i++) {
          const y = Math.random() * canvas.height;
          const sourceData = ctx.getImageData(0, y, canvas.width, 1);
          const offset = (Math.random() - 0.5) * 20;
          ctx.putImageData(sourceData, offset, y);
        }
      }
    };

    const drawPlaceholder = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Placeholder text
      ctx.fillStyle = '#ff0000';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('UPLOAD IMAGE TO BEGIN', canvas.width / 2, canvas.height / 2);
      ctx.fillText('THE RITUAL', canvas.width / 2, canvas.height / 2 + 30);
    };

    const drawCaptions = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, top: string, bottom: string) => {
      ctx.textAlign = 'center';
      
      // Top caption
      if (top) {
        drawOutlinedText(ctx, top, canvas.width / 2, 50, '32px');
      }

      // Bottom caption
      if (bottom) {
        drawOutlinedText(ctx, bottom, canvas.width / 2, canvas.height - 30, '32px');
      }
    };

    const drawOutlinedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: string) => {
      ctx.font = `bold ${fontSize} Impact, Arial Black, sans-serif`;
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'white';
      
      // Draw outline
      ctx.strokeText(text, x, y);
      // Draw fill
      ctx.fillText(text, x, y);
    };

    return (
      <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-mono tracking-wider">
          CURSED CANVAS
        </h2>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="border-2 border-gray-600 rounded max-w-full h-auto bg-black"
            style={{ filter: 'contrast(1.1) brightness(1.1)' }}
          />
        </div>
      </div>
    );
  }
);

MemeCanvas.displayName = 'MemeCanvas';
