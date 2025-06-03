
import React, { useState, useRef } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { CaptionGenerator } from '../components/CaptionGenerator';
import { GlitchControls } from '../components/GlitchControls';
import { MemeCanvas } from '../components/MemeCanvas';
import { ExportTools } from '../components/ExportTools';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [topCaption, setTopCaption] = useState('');
  const [bottomCaption, setBottomCaption] = useState('');
  const [glitchSettings, setGlitchSettings] = useState({
    rgbChaos: 0,
    scanlines: 0,
    vhsCorruption: 0,
    jpegCrunch: 0,
    saturation: 0
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
        {/* Animated background glitch effect */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-pulse opacity-50"></div>
        <div 
          className="fixed inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Cursed Header */}
          <header className="text-center mb-8">
            <h1 className="text-6xl font-bold mb-4 text-red-500 relative">
              <span className="block transform -skew-x-12 animate-pulse">CURSED</span>
              <span className="block text-green-400 transform skew-x-12 -mt-4">MEME LAB</span>
            </h1>
            <p className="text-xl text-gray-300 font-mono tracking-wider animate-pulse">
              Where images go to die and be reborn as chaos
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              <ImageUploader 
                onImageUpload={setUploadedImage}
                uploadedImage={uploadedImage}
              />
              
              <CaptionGenerator 
                onTopCaptionChange={setTopCaption}
                onBottomCaptionChange={setBottomCaption}
                topCaption={topCaption}
                bottomCaption={bottomCaption}
              />
              
              <GlitchControls 
                settings={glitchSettings}
                onSettingsChange={setGlitchSettings}
              />
            </div>

            {/* Right Column - Canvas & Export */}
            <div className="space-y-6">
              <MemeCanvas 
                ref={canvasRef}
                image={uploadedImage}
                topCaption={topCaption}
                bottomCaption={bottomCaption}
                glitchSettings={glitchSettings}
              />
              
              <ExportTools canvasRef={canvasRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for glitch effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .glitch-text {
            position: relative;
          }
          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .glitch-text::before {
            animation: glitch-1 0.5s infinite linear alternate-reverse;
            color: #ff0000;
            z-index: -1;
          }
          .glitch-text::after {
            animation: glitch-2 0.5s infinite linear alternate-reverse;
            color: #00ff00;
            z-index: -2;
          }
          @keyframes glitch-1 {
            0% { transform: translateX(-2px) skew(-5deg); }
            10% { transform: translateX(-4px) skew(-10deg); }
            20% { transform: translateX(2px) skew(5deg); }
            30% { transform: translateX(-1px) skew(-3deg); }
            40% { transform: translateX(4px) skew(8deg); }
            50% { transform: translateX(-2px) skew(-2deg); }
            60% { transform: translateX(3px) skew(6deg); }
            70% { transform: translateX(-4px) skew(-8deg); }
            80% { transform: translateX(2px) skew(4deg); }
            90% { transform: translateX(-3px) skew(-6deg); }
            100% { transform: translateX(1px) skew(2deg); }
          }
          @keyframes glitch-2 {
            0% { transform: translateX(2px) skew(5deg); }
            10% { transform: translateX(4px) skew(10deg); }
            20% { transform: translateX(-2px) skew(-5deg); }
            30% { transform: translateX(1px) skew(3deg); }
            40% { transform: translateX(-4px) skew(-8deg); }
            50% { transform: translateX(2px) skew(2deg); }
            60% { transform: translateX(-3px) skew(-6deg); }
            70% { transform: translateX(4px) skew(8deg); }
            80% { transform: translateX(-2px) skew(-4deg); }
            90% { transform: translateX(3px) skew(6deg); }
            100% { transform: translateX(-1px) skew(-2deg); }
          }
        `
      }} />
    </>
  );
};

export default Index;
