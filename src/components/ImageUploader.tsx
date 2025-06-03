
import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  uploadedImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [onImageUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-red-500 rounded-lg p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20">
      <h2 className="text-2xl font-bold text-red-400 mb-4 font-mono tracking-wider">
        SACRIFICE YOUR IMAGE
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver 
            ? 'border-green-400 bg-green-400/10 scale-105' 
            : 'border-gray-600 hover:border-red-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        {uploadedImage ? (
          <div className="space-y-4">
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="max-w-full max-h-48 mx-auto rounded border-2 border-gray-600 filter sepia contrast-125"
            />
            <p className="text-green-400 font-mono">IMAGE CONSUMED</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {isDragOver ? (
                <ImageIcon className="w-16 h-16 text-green-400 animate-bounce" />
              ) : (
                <Upload className="w-16 h-16 text-red-400 animate-pulse" />
              )}
            </div>
            <div>
              <p className="text-lg font-mono text-gray-300 mb-2">
                Drop your image here or click to upload
              </p>
              <p className="text-sm text-gray-500 font-mono">
                JPG, PNG, GIF accepted
              </p>
            </div>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
