import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import AudioSimulator from './AudioSimulator';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setShowBubbles(true);
  }, []);

  const handleNetflixSound = () => {
    console.log('Netflix ta-dum sound played!');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-red-950 to-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1604991347727-a237c439b866?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmd8ZW58MHx8fHJlZHwxNzUzMDAxNDEyfDA&ixlib=rb-4.1.0&q=85')`
        }}
      />

      {/* Floating Bubbles Animation */}
      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(window.innerWidth < 640 ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20 animate-bounce"
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
      )}

      {/* Netflix Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <div 
          className="text-red-600 font-bold text-xl sm:text-2xl cursor-pointer transition-transform hover:scale-110"
          onClick={handleNetflixSound}
        >
          NETFLIX
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className={`transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Title */}
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black text-white mb-4 sm:mb-6 leading-none">
            <span className="text-red-600">NETFLIX</span>
            <br />
            DETERGENT
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-2 sm:mb-4 font-light">
            Now Streaming Freshness
          </p>
          
          <p className="text-sm sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Clean Has Never Been This Cinematic
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-none transform transition-all hover:scale-105 w-full sm:w-auto"
            >
              Start Your Wash Journey
            </Button>
            
            <AudioSimulator
              effectName="Try a Wash Sound"
              duration={2000}
              onPlay={handleNetflixSound}
              className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600 px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl rounded-none w-full sm:w-auto"
            />
          </div>
        </div>

        {/* 3D Spinning Bottle Animation */}
        <div className={`transition-all duration-2000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative w-20 h-32 sm:w-32 sm:h-48 mx-auto">
            <div 
              className="w-full h-full bg-gradient-to-b from-red-500 to-red-800 rounded-t-lg rounded-b-sm animate-spin shadow-2xl cursor-pointer transform transition-all hover:scale-110"
              style={{ 
                animation: 'spin 4s linear infinite',
                background: 'linear-gradient(45deg, #ef4444, #b91c1c, #991b1b)'
              }}
              onClick={handleNetflixSound}
            >
              {/* Bottle Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs sm:text-xs font-bold text-center">
                <div>NETFLIX</div>
                <div>DETERGENT</div>
              </div>
            </div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-red-500 rounded-t-lg rounded-b-sm opacity-20 blur-lg animate-pulse"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-4 h-6 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .floating-bubble {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;