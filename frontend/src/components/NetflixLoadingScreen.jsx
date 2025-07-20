import React, { useState, useEffect } from 'react';
import AudioSimulator from './AudioSimulator';

const NetflixLoadingScreen = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('Initializing');
  const [showLogo, setShowLogo] = useState(false);
  const [playTaDum, setPlayTaDum] = useState(false);

  const loadingPhases = [
    'Initializing Netflix Detergent...',
    'Loading Genre Formulations...',
    'Preparing Wash Theater...',
    'Calibrating MoodMatch™ AI...',
    'Streaming Freshness...',
    'Ready to Binge Wash!'
  ];

  useEffect(() => {
    // Show logo after initial delay
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
      setPlayTaDum(true);
    }, 1000);

    // Progress loading simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * loadingPhases.length);
        if (phaseIndex < loadingPhases.length) {
          setCurrentPhase(loadingPhases[phaseIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onLoadingComplete();
          }, 1500); // Wait a bit before completing
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Background with subtle animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black animate-pulse" />
        
        {/* Floating bubbles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md w-full px-8">
        {/* Netflix Detergent Logo */}
        <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          {/* Netflix Logo with Detergent Twist */}
          <div className="mb-8">
            <div className="text-red-600 font-black text-6xl mb-4 animate-pulse">
              NETFLIX
            </div>
            <div className="relative">
              {/* 3D Detergent Bottle */}
              <div className="w-24 h-32 mx-auto bg-gradient-to-b from-red-500 to-red-800 rounded-t-lg rounded-b-sm relative animate-spin shadow-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold text-center">
                  <div>NETFLIX</div>
                  <div>DETERGENT</div>
                </div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-red-500 rounded-t-lg rounded-b-sm opacity-50 blur-lg animate-pulse"></div>
              </div>
              
              {/* Detergent text */}
              <div className="text-white font-bold text-2xl mt-4">
                DETERGENT
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-gray-300 text-lg mb-8 animate-fade-in">
            Now Streaming Freshness
          </div>
        </div>

        {/* Loading Progress */}
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Loading Percentage */}
          <div className="text-white text-xl font-semibold">
            {Math.floor(loadingProgress)}%
          </div>

          {/* Current Phase */}
          <div className="text-gray-400 text-sm animate-pulse">
            {currentPhase}
          </div>

          {/* Loading Dots Animation */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Ta-dum Sound Effect */}
        {playTaDum && (
          <div className="mt-8">
            <AudioSimulator
              effectName=""
              duration={2000}
              onPlay={() => console.log('Netflix Ta-dum played!')}
              className="opacity-0 pointer-events-none"
            />
          </div>
        )}

        {/* Loading complete message */}
        {loadingProgress >= 100 && (
          <div className="mt-6 text-green-400 animate-fade-in">
            <div className="text-lg font-semibold mb-2">Ready!</div>
            <div className="text-sm">Welcome to the ultimate wash experience</div>
          </div>
        )}
      </div>

      {/* Netflix-style sound wave visualization */}
      {showLogo && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="flex items-end space-x-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-red-500 w-1 animate-pulse"
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NetflixLoadingScreen;