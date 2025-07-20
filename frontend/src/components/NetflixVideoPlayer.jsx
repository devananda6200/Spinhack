import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const NetflixVideoPlayer = ({ product, isPlaying, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  if (!product) return null;

  return (
    <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-all duration-500 ${isFullscreen ? 'p-0' : 'p-4'}`}>
      {/* Video Player Container */}
      <div className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${isFullscreen ? 'w-full h-full' : 'max-w-6xl w-full aspect-video'}`}>
        {/* Fake Video Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${product.image}')`,
            filter: 'blur(20px) brightness(0.3)'
          }}
        />
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        {/* Netflix Logo */}
        <div className="absolute top-6 left-6 z-20">
          <div className="text-red-600 font-bold text-2xl">NETFLIX</div>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-6 right-6 z-20 text-white hover:bg-white/20"
        >
          ✕
        </Button>

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-4xl px-8">
            {/* Product Title */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 animate-pulse">
              {product.name}
            </h1>
            
            {/* Genre Badge */}
            <div className={`inline-block px-6 py-2 rounded-full text-white font-bold text-xl mb-6 ${product.color}`}>
              {product.genre} Experience
            </div>
            
            {/* Description */}
            <p className="text-2xl text-white mb-8 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Simulated Trailer Play Button */}
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all transform hover:scale-110">
                <div className="w-0 h-0 border-l-8 border-r-0 border-t-6 border-b-6 border-l-white border-t-transparent border-b-transparent ml-2"></div>
              </div>
              <div className="absolute -inset-4 border-2 border-white/40 rounded-full animate-ping"></div>
            </div>

            {/* Episode Info */}
            <div className="mt-8 text-white/80">
              <p>Season 1 • Episode 1 • {product.genre}</p>
              <p>Rated F for Fresh • 2025</p>
            </div>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-1 rounded mb-4">
            <div 
              className="bg-red-600 h-1 rounded transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                {isPlaying ? '⏸' : '▶'}
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                ⏭
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm">🔊</span>
                <div className="w-20 bg-gray-700 h-1 rounded">
                  <div 
                    className="bg-white h-1 rounded"
                    style={{ width: `${volume}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                🗨
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                ⛶
              </Button>
            </div>
          </div>
        </div>

        {/* Netflix-style Skip Intro Button */}
        <Button className="absolute bottom-24 right-6 bg-gray-800/80 hover:bg-gray-700 text-white border border-gray-600">
          Skip Intro
        </Button>
      </div>
    </div>
  );
};

export default NetflixVideoPlayer;