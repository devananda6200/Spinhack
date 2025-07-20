import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const WashingMachineTheater = () => {
  const [isWashing, setIsWashing] = useState(false);
  const [washProgress, setWashProgress] = useState(0);
  const [currentGenre, setCurrentGenre] = useState('Action');
  const [washPhase, setWashPhase] = useState('Pre-Soak');
  const [bubbles, setBubbles] = useState([]);

  const genres = ['Action', 'Romance', 'Thriller', 'Comedy', 'Drama'];
  const phases = ['Pre-Soak', 'Main Wash', 'Rinse Cycle', 'Final Spin', 'Complete'];

  useEffect(() => {
    if (isWashing) {
      const interval = setInterval(() => {
        setWashProgress(prev => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            setIsWashing(false);
            setWashPhase('Complete');
            return 100;
          }
          
          // Update phases
          if (newProgress < 20) setWashPhase('Pre-Soak');
          else if (newProgress < 50) setWashPhase('Main Wash');
          else if (newProgress < 75) setWashPhase('Rinse Cycle');
          else if (newProgress < 95) setWashPhase('Final Spin');
          
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isWashing]);

  // Generate random bubbles
  useEffect(() => {
    if (isWashing) {
      const bubbleInterval = setInterval(() => {
        const newBubble = {
          id: Math.random(),
          x: Math.random() * 100,
          y: 100,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 2 + 1
        };
        setBubbles(prev => [...prev.slice(-20), newBubble]);
      }, 200);

      return () => clearInterval(bubbleInterval);
    }
  }, [isWashing]);

  const startWash = () => {
    setIsWashing(true);
    setWashProgress(0);
    setWashPhase('Pre-Soak');
    setBubbles([]);
  };

  const getGenreColor = (genre) => {
    const colors = {
      Action: 'from-red-500 to-orange-500',
      Romance: 'from-pink-500 to-rose-500',
      Thriller: 'from-purple-500 to-indigo-500',
      Comedy: 'from-yellow-500 to-orange-500',
      Drama: 'from-blue-500 to-teal-500'
    };
    return colors[genre] || 'from-gray-500 to-gray-700';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
            Washing Machine <span className="text-red-600">Theater</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Experience your laundry like a blockbuster movie. Every wash is a premiere.
          </p>
        </div>

        {/* Main Theater Interface */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-xl border-gray-700">
            <CardContent className="p-8">
              {/* Theater Screen */}
              <div className="relative bg-black rounded-xl p-8 mb-8 overflow-hidden min-h-96">
                {/* Washing Machine Drum */}
                <div className="relative w-64 h-64 mx-auto">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${getGenreColor(currentGenre)} p-4 ${isWashing ? 'animate-spin' : ''} transition-all duration-1000`}>
                    <div className="w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                      {/* Bubbles */}
                      {bubbles.map(bubble => (
                        <div
                          key={bubble.id}
                          className="absolute bg-white/40 rounded-full animate-bounce"
                          style={{
                            left: `${bubble.x}%`,
                            bottom: `${bubble.y}%`,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            animationDuration: `${bubble.speed}s`
                          }}
                        />
                      ))}
                      
                      {/* Center Display */}
                      <div className="text-center text-white z-10">
                        <div className="text-4xl font-bold mb-2">{currentGenre}</div>
                        <div className="text-lg">{washPhase}</div>
                        {isWashing && (
                          <div className="text-sm mt-2 animate-pulse">
                            Now Playing...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-white mb-2">
                    <span>{washPhase}</span>
                    <span>{Math.round(washProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getGenreColor(currentGenre)} transition-all duration-300`}
                      style={{ width: `${washProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Genre Particles */}
                {isWashing && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${getGenreColor(currentGenre)} rounded-full animate-ping opacity-70`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Genre Selection */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Select Your Genre</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {genres.map(genre => (
                      <Button
                        key={genre}
                        onClick={() => setCurrentGenre(genre)}
                        className={`p-4 text-lg transition-all ${
                          currentGenre === genre 
                            ? `bg-gradient-to-r ${getGenreColor(genre)} text-white scale-105` 
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                        disabled={isWashing}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Wash Controls */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Theater Controls</h3>
                  <div className="space-y-4">
                    <Button
                      onClick={startWash}
                      disabled={isWashing}
                      size="lg"
                      className={`w-full bg-gradient-to-r ${getGenreColor(currentGenre)} text-white text-xl py-6 transform transition-all hover:scale-105 disabled:scale-100 disabled:opacity-50`}
                    >
                      {isWashing ? '🎬 Now Playing...' : '🎬 Start The Show'}
                    </Button>

                    {/* Netflix-style Options */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="border-gray-600 text-gray-300" disabled={!isWashing}>
                        ⏸ Pause Episode
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300" disabled={!isWashing}>
                        ⏭ Skip to Rinse
                      </Button>
                    </div>

                    {/* Status Badge */}
                    <Badge className={`w-full text-center py-2 ${isWashing ? 'bg-red-600' : 'bg-gray-600'}`}>
                      {isWashing ? '🔴 LIVE' : '⚫ OFFLINE'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Netflix-style Continue Watching */}
              {washProgress > 0 && washProgress < 100 && !isWashing && (
                <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
                  <h4 className="text-xl text-white mb-2">Continue Watching</h4>
                  <p className="text-gray-300 mb-4">
                    {currentGenre} • {washPhase} • {Math.round(washProgress)}% complete
                  </p>
                  <Button 
                    onClick={() => setIsWashing(true)}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    ▶ Resume Wash Cycle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Theater Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">1.2M+</div>
            <div className="text-gray-300">Wash Episodes Streamed</div>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">5⭐</div>
            <div className="text-gray-300">Average Theater Rating</div>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">99%</div>
            <div className="text-gray-300">Viewers Binged Again</div>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-gray-300">Streaming Freshness</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WashingMachineTheater;