import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';

const SoundVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('netflix-intro');
  const [volume, setVolume] = useState([75]);
  const [visualizerBars, setVisualizerBars] = useState(Array(32).fill(0));
  const [particles, setParticles] = useState([]);

  const soundTracks = [
    { id: 'netflix-intro', name: 'Netflix Ta-Dum', genre: 'Signature', color: 'bg-red-500' },
    { id: 'action-wash', name: 'Action Wash Theme', genre: 'Action', color: 'bg-orange-500' },
    { id: 'romance-rinse', name: 'Romantic Rinse Melody', genre: 'Romance', color: 'bg-pink-500' },
    { id: 'thriller-soak', name: 'Suspenseful Soak', genre: 'Thriller', color: 'bg-purple-500' },
    { id: 'comedy-cycle', name: 'Comedy Spin Cycle', genre: 'Comedy', color: 'bg-yellow-500' },
    { id: 'drama-deep', name: 'Dramatic Deep Clean', genre: 'Drama', color: 'bg-blue-500' }
  ];

  // Simulate audio visualizer
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerBars(prev => 
          prev.map(() => Math.random() * 100)
        );
        
        // Generate sound particles
        if (Math.random() > 0.7) {
          const newParticle = {
            id: Math.random(),
            x: Math.random() * 100,
            y: 50 + Math.random() * 30,
            size: Math.random() * 10 + 5,
            opacity: 1,
            velocity: {
              x: (Math.random() - 0.5) * 4,
              y: (Math.random() - 0.5) * 4
            }
          };
          
          setParticles(prev => [...prev.slice(-20), newParticle]);
        }
      }, 100);

      return () => clearInterval(interval);
    } else {
      setVisualizerBars(Array(32).fill(0));
      setParticles([]);
    }
  }, [isPlaying]);

  // Animate particles
  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles(prev => 
          prev
            .map(particle => ({
              ...particle,
              x: particle.x + particle.velocity.x,
              y: particle.y + particle.velocity.y,
              opacity: particle.opacity - 0.02
            }))
            .filter(particle => particle.opacity > 0)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [particles]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const switchTrack = (trackId) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const currentTrackInfo = soundTracks.find(track => track.id === currentTrack);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
            Sonic <span className="text-purple-400">Experience</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Every wash deserves a soundtrack. Experience our genre-based audio library with real-time visualizations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Visualizer */}
          <Card className="bg-black/60 backdrop-blur-lg border-purple-500/30 mb-8">
            <CardContent className="p-8">
              <div className="relative h-64 bg-gradient-to-br from-purple-900/30 to-black rounded-lg overflow-hidden">
                {/* Sound Particles */}
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className={`absolute w-2 h-2 ${currentTrackInfo?.color || 'bg-white'} rounded-full`}
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      opacity: particle.opacity,
                      transform: `scale(${particle.size / 10})`
                    }}
                  />
                ))}

                {/* Visualizer Bars */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 p-4">
                  {visualizerBars.map((height, index) => (
                    <div
                      key={index}
                      className={`${currentTrackInfo?.color || 'bg-purple-500'} rounded-t-sm transition-all duration-100`}
                      style={{
                        height: `${height}%`,
                        width: '8px',
                        minHeight: '4px',
                        opacity: height > 0 ? 0.8 : 0.3
                      }}
                    />
                  ))}
                </div>

                {/* Center Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`inline-block p-6 rounded-full ${currentTrackInfo?.color || 'bg-purple-500'} mb-4 ${isPlaying ? 'animate-pulse' : ''}`}>
                      <div className="text-4xl text-white">
                        {isPlaying ? '🎵' : '🎶'}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentTrackInfo?.name || 'Select a Track'}
                    </h3>
                    <p className="text-gray-300">
                      {currentTrackInfo?.genre || 'Genre'} • {isPlaying ? 'Playing' : 'Paused'}
                    </p>
                  </div>
                </div>

                {/* Waveform Background */}
                <div className="absolute top-0 left-0 right-0 h-1/3 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 20">
                    <path
                      d={`M0,10 ${visualizerBars.map((height, i) => 
                        `L${(i / visualizerBars.length) * 100},${10 + (height - 50) / 10}`
                      ).join(' ')}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center space-x-6">
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  >
                    ⏮
                  </Button>
                  <Button
                    onClick={togglePlayback}
                    className={`w-16 h-16 rounded-full ${currentTrackInfo?.color || 'bg-purple-500'} hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl text-white">
                      {isPlaying ? '⏸' : '▶'}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  >
                    ⏭
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-4 max-w-md mx-auto">
                  <span className="text-white">🔊</span>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white text-sm w-12">{volume[0]}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Track Selection */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {soundTracks.map(track => (
              <Card
                key={track.id}
                className={`cursor-pointer transition-all transform hover:scale-105 ${
                  currentTrack === track.id
                    ? 'bg-purple-600/20 border-purple-500'
                    : 'bg-black/40 border-gray-700 hover:border-purple-500'
                }`}
                onClick={() => switchTrack(track.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${track.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-2xl">🎵</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{track.name}</h4>
                  <p className="text-gray-400 text-sm">{track.genre}</p>
                  {currentTrack === track.id && isPlaying && (
                    <div className="mt-3">
                      <div className="flex justify-center space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 ${track.color} animate-pulse`}
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sound Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg border-red-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">6</div>
                <div className="text-white text-sm">Signature Tracks</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-lg border-purple-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-white text-sm">Streaming Hours</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">🎵</div>
                <div className="text-white text-sm">Premium Quality</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">5.1</div>
                <div className="text-white text-sm">Surround Sound</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoundVisualizer;