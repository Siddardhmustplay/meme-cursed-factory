
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

  const modes = [
    { id: 'delusional', name: 'DELUSIONAL AI', color: 'red' },
    { id: 'woke', name: 'WOKE SHADOW', color: 'purple' },
    { id: 'boomer', name: 'BOOMERCORE', color: 'yellow' }
  ];

  const generateCursedCaptions = () => {
    const cursedTopCaptions = [
      "WHEN THE VOID STARES BACK",
      "REALITY.EXE HAS STOPPED WORKING",
      "POV: YOU'RE THE PROBLEM",
      "ENTER THE BRAIN ROT DIMENSION",
      "SOCIETY IF...",
      "NOBODY: ABSOLUTELY NOBODY:"
    ];

    const cursedBottomCaptions = [
      "AND THAT'S ON PERIOD",
      "BOTTOM TEXT",
      "THIS IS FINE",
      "WE LIVE IN A SOCIETY",
      "IT BE LIKE THAT SOMETIMES",
      "REJECT HUMANITY, RETURN TO MONKE"
    ];

    const randomTop = cursedTopCaptions[Math.floor(Math.random() * cursedTopCaptions.length)];
    const randomBottom = cursedBottomCaptions[Math.floor(Math.random() * cursedBottomCaptions.length)];

    onTopCaptionChange(randomTop);
    onBottomCaptionChange(randomBottom);
  };

  return (
    <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-mono tracking-wider">
        CAPTION GENERATOR
      </h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {modes.map((mode) => (
          <Button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`font-mono text-xs py-2 px-3 border-2 transition-all duration-300 ${
              selectedMode === mode.id
                ? `bg-${mode.color}-600 border-${mode.color}-500 text-white`
                : `bg-gray-800 border-${mode.color}-500 text-${mode.color}-400 hover:bg-${mode.color}-600/20`
            }`}
          >
            {mode.name}
          </Button>
        ))}
      </div>

      <Button
        onClick={generateCursedCaptions}
        className="w-full mb-4 bg-red-600 hover:bg-red-700 text-white font-mono border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
      >
        GENERATE CURSED CAPTIONS
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
