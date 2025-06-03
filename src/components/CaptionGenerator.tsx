
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

  const cursedCaptions = {
    delusional: {
      top: [
        "WHEN THE VOID STARES BACK",
        "POV: YOU'RE THE MAIN CHARACTER",
        "NOBODY ASKED BUT HERE WE ARE",
        "THIS IS FINE (IT'S NOT FINE)",
        "EXISTENCE IS OPTIONAL",
        "REALITY.EXE HAS STOPPED WORKING"
      ],
      bottom: [
        "AND THAT'S ON PERIODT",
        "...OR IS IT?",
        "BOTTOM TEXT BOTTOM TEXT",
        "SOCIETY MOMENT",
        "SKILL ISSUE TBH",
        "EMOTIONAL DAMAGE UNLOCKED"
      ]
    },
    shadow: {
      top: [
        "THEY DON'T WANT YOU TO KNOW",
        "THE TRUTH THEY'RE HIDING",
        "WAKE UP SHEEPLE",
        "IT'S DEEPER THAN YOU THINK",
        "THEY'RE WATCHING",
        "THE SIMULATION GLITCHES"
      ],
      bottom: [
        "BUT THE MATRIX HAS YOU",
        "STAY WOKE BESTIE",
        "CONSPIRACY CONFIRMED",
        "THE RABBIT HOLE GOES DEEPER",
        "QUESTION EVERYTHING",
        "TRUST NO ONE"
      ]
    },
    boomer: {
      top: [
        "BACK IN MY DAY",
        "KIDS THESE DAYS",
        "I DON'T UNDERSTAND",
        "WHEN I WAS YOUNG",
        "TECHNOLOGY BAD",
        "PHONES EVIL"
      ],
      bottom: [
        "GOOGLE HOW TO DELETE",
        "SEND HELP PLZ",
        "LOVE GRANDMA",
        "IS THIS FACEBOOK?",
        "PRINTER NOT WORKING",
        "CALL ME HONEY"
      ]
    }
  };

  const generateRandomCaption = () => {
    const mode = cursedCaptions[selectedMode as keyof typeof cursedCaptions];
    const randomTop = mode.top[Math.floor(Math.random() * mode.top.length)];
    const randomBottom = mode.bottom[Math.floor(Math.random() * mode.bottom.length)];
    
    onTopCaptionChange(randomTop);
    onBottomCaptionChange(randomBottom);
  };

  return (
    <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 transition-all duration-300 hover:border-red-400 hover:shadow-lg hover:shadow-red-400/20">
      <h2 className="text-2xl font-bold text-green-400 mb-4 font-mono tracking-wider">
        CURSED CAPTION GENERATOR
      </h2>
      
      {/* Mode Selection */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3 font-mono">SELECT YOUR POISON:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'delusional', label: 'DELUSIONAL AI', color: 'red' },
            { id: 'shadow', label: 'WOKE SHADOW', color: 'purple' },
            { id: 'boomer', label: 'BOOMERCORE', color: 'yellow' }
          ].map((mode) => (
            <Button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`font-mono text-xs px-3 py-1 transition-all duration-300 ${
                selectedMode === mode.id
                  ? `bg-${mode.color}-500 text-black border-2 border-${mode.color}-400 shadow-lg shadow-${mode.color}-400/50`
                  : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-400'
              }`}
            >
              {mode.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateRandomCaption}
        className="w-full mb-6 bg-red-600 hover:bg-red-700 text-white font-mono text-lg py-3 border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105"
      >
        GENERATE CHAOS
      </Button>

      {/* Manual Caption Editing */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-mono text-gray-400 mb-2">
            TOP CAPTION (SUFFERING BEGINS):
          </label>
          <Textarea
            value={topCaption}
            onChange={(e) => onTopCaptionChange(e.target.value)}
            className="bg-black border-2 border-gray-600 text-green-400 font-mono resize-none focus:border-green-400 focus:ring-green-400"
            placeholder="Enter your cursed wisdom..."
            rows={2}
          />
        </div>
        
        <div>
          <label className="block text-sm font-mono text-gray-400 mb-2">
            BOTTOM CAPTION (AGONY CONCLUDES):
          </label>
          <Textarea
            value={bottomCaption}
            onChange={(e) => onBottomCaptionChange(e.target.value)}
            className="bg-black border-2 border-gray-600 text-green-400 font-mono resize-none focus:border-green-400 focus:ring-green-400"
            placeholder="Seal the deal with more chaos..."
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};
