
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface GlitchSettings {
  rgbChaos: number;
  scanlines: number;
  vhsCorruption: number;
  jpegCrunch: number;
  saturation: number;
}

interface GlitchControlsProps {
  settings: GlitchSettings;
  onSettingsChange: (settings: GlitchSettings) => void;
}

export const GlitchControls: React.FC<GlitchControlsProps> = ({ settings, onSettingsChange }) => {
  const updateSetting = (key: keyof GlitchSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const glitchControls = [
    { key: 'rgbChaos', label: 'RGB CHAOS', color: 'red', description: 'RGB channel shifting and distortion' },
    { key: 'scanlines', label: 'SCANLINE CORRUPTION', color: 'green', description: 'CRT monitor scanline effect' },
    { key: 'vhsCorruption', label: 'BROKEN VHS', color: 'blue', description: 'VHS tape distortion and noise' },
    { key: 'jpegCrunch', label: 'MEME ROT', color: 'yellow', description: 'JPEG compression artifacts' },
    { key: 'saturation', label: 'OOZE SATURATION', color: 'purple', description: 'Color intensity overdrive' }
  ];

  const randomizeAll = () => {
    const randomSettings = Object.keys(settings).reduce((acc, key) => {
      acc[key as keyof GlitchSettings] = Math.floor(Math.random() * 100);
      return acc;
    }, {} as GlitchSettings);
    onSettingsChange(randomSettings);
  };

  const resetAll = () => {
    const resetSettings = Object.keys(settings).reduce((acc, key) => {
      acc[key as keyof GlitchSettings] = 0;
      return acc;
    }, {} as GlitchSettings);
    onSettingsChange(resetSettings);
  };

  const applyPreset = (preset: string) => {
    const presets = {
      mild: { rgbChaos: 20, scanlines: 15, vhsCorruption: 10, jpegCrunch: 25, saturation: 30 },
      intense: { rgbChaos: 60, scanlines: 45, vhsCorruption: 55, jpegCrunch: 70, saturation: 80 },
      nightmare: { rgbChaos: 90, scanlines: 85, vhsCorruption: 95, jpegCrunch: 100, saturation: 100 }
    };
    onSettingsChange(presets[preset as keyof typeof presets]);
  };

  return (
    <div className="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 transition-all duration-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20">
      <h2 className="text-2xl font-bold text-purple-400 mb-4 font-mono tracking-wider">
        GLITCH LABORATORY
      </h2>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          onClick={randomizeAll}
          className="bg-red-600 hover:bg-red-700 text-white font-mono text-sm py-2 px-3 rounded border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
        >
          RANDOMIZE
        </Button>
        <Button
          onClick={resetAll}
          className="bg-gray-700 hover:bg-gray-600 text-white font-mono text-sm py-2 px-3 rounded border-2 border-gray-600 transition-all duration-300"
        >
          RESET
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <Button
          onClick={() => applyPreset('mild')}
          className="bg-green-600 hover:bg-green-700 text-white font-mono text-xs py-1 px-2 rounded border border-green-500"
        >
          MILD
        </Button>
        <Button
          onClick={() => applyPreset('intense')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-mono text-xs py-1 px-2 rounded border border-orange-500"
        >
          INTENSE
        </Button>
        <Button
          onClick={() => applyPreset('nightmare')}
          className="bg-red-800 hover:bg-red-900 text-white font-mono text-xs py-1 px-2 rounded border border-red-700"
        >
          NIGHTMARE
        </Button>
      </div>

      <div className="space-y-6">
        {glitchControls.map(({ key, label, color, description }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className={`text-sm font-mono text-${color}-400 font-bold`}>
                {label}
              </label>
              <span className={`text-xs font-mono text-${color}-300 bg-black px-2 py-1 rounded border border-${color}-500`}>
                {settings[key as keyof GlitchSettings]}%
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono mb-2">{description}</p>
            <Slider
              value={[settings[key as keyof GlitchSettings]]}
              onValueChange={(value) => updateSetting(key as keyof GlitchSettings, value[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
