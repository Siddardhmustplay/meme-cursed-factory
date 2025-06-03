
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
      if (settings.rgbChaos > 0) {
        // Simple RGB shift effect
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const shift = Math.floor(settings.rgbChaos / 10);
        
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() < settings.rgbChaos / 100) {
            data[i] = Math.min(255, data[i] + shift); // Red
            data[i + 2] = Math.min(255, data[i + 2] + shift); // Blue
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      if (settings.scanlines > 0) {
        // Draw scanlines
        ctx.fillStyle = `rgba(0, 0, 0, ${settings.scanlines / 200})`;
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.fillRect(0, y, canvas.width, 2);
        }
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
