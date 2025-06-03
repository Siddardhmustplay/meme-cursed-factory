
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportToolsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const ExportTools: React.FC<ExportToolsProps> = ({ canvasRef }) => {
  const { toast } = useToast();

  const downloadImage = () => {
    if (!canvasRef.current) {
      toast({
        title: "ERROR",
        description: "No image to download!",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = `cursed-meme-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "MEME EXTRACTED",
        description: "Your cursed creation has been downloaded!",
      });
    } catch (error) {
      toast({
        title: "DOWNLOAD FAILED",
        description: "The darkness consumed your meme...",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) {
      toast({
        title: "ERROR",
        description: "No image to copy!",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = canvasRef.current;
      
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            toast({
              title: "COPIED TO CLIPBOARD",
              description: "The cursed meme is ready to spread!",
            });
          } catch (clipboardError) {
            // Fallback: copy as data URL to clipboard
            const dataUrl = canvas.toDataURL('image/png');
            await navigator.clipboard.writeText(dataUrl);
            toast({
              title: "COPIED AS DATA URL",
              description: "Image data copied to clipboard!",
            });
          }
        }
      }, 'image/png', 1.0);
    } catch (error) {
      toast({
        title: "COPY FAILED",
        description: "The darkness resisted copying...",
        variant: "destructive",
      });
    }
  };

  const shareOnReddit = () => {
    const text = "Check out this cursed meme I made with the Cursed Meme Lab!";
    const url = `https://www.reddit.com/submit?title=${encodeURIComponent(text)}`;
    
    // Open Reddit in a new tab
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (newWindow) {
      toast({
        title: "REDDIT PORTAL OPENED",
        description: "Share your cursed creation with the world!",
      });
    } else {
      toast({
        title: "REDDIT BLOCKED",
        description: "Please allow popups to share on Reddit",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20">
      <h2 className="text-2xl font-bold text-blue-400 mb-4 font-mono tracking-wider">
        EXPORT TO THE VOID
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          onClick={downloadImage}
          className="bg-green-600 hover:bg-green-700 text-white font-mono border-2 border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50"
        >
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>

        <Button
          onClick={copyToClipboard}
          className="bg-purple-600 hover:bg-purple-700 text-white font-mono border-2 border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
        >
          <Copy className="w-4 h-4 mr-2" />
          COPY
        </Button>

        <Button
          onClick={shareOnReddit}
          className="bg-orange-600 hover:bg-orange-700 text-white font-mono border-2 border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          REDDIT
        </Button>
      </div>

      <div className="mt-4 p-3 bg-black border border-red-500 rounded">
        <p className="text-xs text-red-400 font-mono text-center">
          WARNING: Exported memes may cause existential dread, uncontrollable laughter, or spontaneous enlightenment
        </p>
      </div>
    </div>
  );
};
