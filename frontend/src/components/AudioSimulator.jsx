import React, { useState } from 'react';
import { Button } from './ui/button';

const AudioSimulator = ({ effectName, duration = 1000, onPlay, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    onPlay && onPlay();
    
    // Simulate audio duration
    setTimeout(() => {
      setIsPlaying(false);
    }, duration);
  };

  return (
    <Button
      onClick={handlePlay}
      disabled={isPlaying}
      variant="outline"
      size="sm"
      className={`relative overflow-hidden ${className}`}
    >
      {isPlaying ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 relative">
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
            <div className="relative rounded-full h-4 w-4 bg-red-600"></div>
          </div>
          <span>Playing...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span>▶</span>
          <span>{effectName}</span>
        </div>
      )}
      
      {/* Visual audio wave animation when playing */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-700 animate-pulse"></div>
      )}
    </Button>
  );
};

export default AudioSimulator;