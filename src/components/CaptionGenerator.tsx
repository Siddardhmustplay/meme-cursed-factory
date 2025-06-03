
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateCursedCaption } from '../services/chatgpt';

interface CaptionGeneratorProps {
  onTopCaptionChange: (caption: string) => void;
  onBottomCaptionChange: (caption: string) => void;
  topCaption: string;
  bottomCaption: string;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({
  onTopCaptionChange,
  onBottomCaptionChange,
  topCaption,
  bottomCaption
}) => {
  const [selectedMode, setSelectedMode] = useState('delusional');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const modes = [
    { id: 'delusional', name: 'DELUSIONAL AI', color: 'red' },
    { id: 'woke', name: 'WOKE SHADOW', color: 'purple' },
    { id: 'boomer', name: 'BOOMERCORE', color: 'yellow' }
  ];

  const generateCursedCaptions = async () => {
    setIsGenerating(true);
    
    try {
      const result = await generateCursedCaption(selectedMode, apiKey);
      onTopCaptionChange(result.top);
      onBottomCaptionChange(result.bottom);
      
      toast({
        title: "CAPTIONS GENERATED",
        description: `${selectedMode.toUpperCase()} mode activated!`,
      });
    } catch (error) {
      toast({
        title: "GENERATION FAILED",
        description: "The AI gods have forsaken us...",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-mono tracking-wider">
        CAPTION GENERATOR
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-mono text-green-400 mb-2">OpenAI API Key</label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="bg-black border-2 border-green-500 text-green-400 font-mono"
          placeholder="sk-..."
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {modes.map((mode) => (
          <Button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`font-mono text-xs py-2 px-3 border-2 transition-all duration-300 ${
              selectedMode === mode.id
                ? `bg-${mode.color}-600 border-${mode.color}-500 text-white shadow-lg shadow-${mode.color}-500/50`
                : `bg-gray-800 border-${mode.color}-500 text-${mode.color}-400 hover:bg-${mode.color}-600/20`
            }`}
          >
            {mode.name}
          </Button>
        ))}
      </div>

      <Button
        onClick={generateCursedCaptions}
        disabled={isGenerating}
        className="w-full mb-4 bg-red-600 hover:bg-red-700 text-white font-mono border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50"
      >
        {isGenerating ? 'GENERATING...' : 'GENERATE CURSED CAPTIONS'}
      </Button>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-mono text-green-400 mb-2">TOP CAPTION</label>
          <Textarea
            value={topCaption}
            onChange={(e) => onTopCaptionChange(e.target.value)}
            className="bg-black border-2 border-green-500 text-green-400 font-mono resize-none"
            placeholder="Enter cursed wisdom..."
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-mono text-red-400 mb-2">BOTTOM CAPTION</label>
          <Textarea
            value={bottomCaption}
            onChange={(e) => onBottomCaptionChange(e.target.value)}
            className="bg-black border-2 border-red-500 text-red-400 font-mono resize-none"
            placeholder="Enter the conclusion of madness..."
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};
