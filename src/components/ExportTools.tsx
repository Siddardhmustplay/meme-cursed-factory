
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExportToolsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const ExportTools: React.FC<ExportToolsProps> = ({ canvasRef }) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast({
        title: "Error",
        description: "No image to download",
        variant: "destructive"
      });
      return;
    }

    const link = document.createElement('a');
    link.download = `cursed-meme-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Download Complete",
      description: "Your cursed creation has been saved",
    });
  };

  const shareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast({
        title: "Error",
        description: "No image to share",
        variant: "destructive"
      });
      return;
    }

    if (navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'cursed-meme.png', { type: 'image/png' });
            await navigator.share({
              title: 'Check out this cursed meme!',
              text: 'Made with the Cursed Meme Lab',
              files: [file]
            });
          }
        });
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          toast({
            title: "Copied to Clipboard",
            description: "Your cursed meme is ready to paste",
          });
        } catch (error) {
          console.error('Error copying to clipboard:', error);
          toast({
            title: "Copy Failed",
            description: "Unable to copy to clipboard",
            variant: "destructive"
          });
        }
      }
    });
  };

  return (
    <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-6 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20">
      <h2 className="text-2xl font-bold text-blue-400 mb-4 font-mono tracking-wider">
        UNLEASH THE CHAOS
      </h2>
      
      <div className="space-y-4">
        <Button
          onClick={downloadImage}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-mono text-lg py-3 border-2 border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105"
        >
          <Download className="w-5 h-5 mr-2" />
          DOWNLOAD PNG
        </Button>

        <Button
          onClick={shareImage}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-mono text-lg py-3 border-2 border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
        >
          <Share className="w-5 h-5 mr-2" />
          SHARE CURSE
        </Button>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 font-mono text-center">
            WARNING: Your creation may cause<br />
            existential dread and uncontrollable laughter
          </p>
        </div>
      </div>
    </div>
  );
};
