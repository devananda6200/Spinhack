import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

const InteractiveBottleLab = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [intensity, setIntensity] = useState([50]);
  const [customBottle, setCustomBottle] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [particles, setParticles] = useState([]);

  const genres = [
    { name: 'Action', color: 'bg-red-500', icon: '💥' },
    { name: 'Romance', color: 'bg-pink-500', icon: '💖' },
    { name: 'Thriller', color: 'bg-purple-500', icon: '🔪' },
    { name: 'Comedy', color: 'bg-yellow-500', icon: '😂' },
    { name: 'Drama', color: 'bg-blue-500', icon: '🎭' },
    { name: 'Horror', color: 'bg-gray-900', icon: '👻' },
    { name: 'Sci-Fi', color: 'bg-green-500', icon: '🚀' },
    { name: 'Fantasy', color: 'bg-indigo-500', icon: '🧙‍♂️' }
  ];

  const toggleGenre = (genre) => {
    if (selectedGenres.find(g => g.name === genre.name)) {
      setSelectedGenres(selectedGenres.filter(g => g.name !== genre.name));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const createCustomBottle = async () => {
    if (selectedGenres.length === 0) return;
    
    setIsCreating(true);
    
    // Create particles effect
    const newParticles = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: selectedGenres[Math.floor(Math.random() * selectedGenres.length)].color
    }));
    setParticles(newParticles);

    // Simulate creation process
    setTimeout(() => {
      const bottle = {
        name: `${selectedGenres.map(g => g.name).join('-')} Fusion`,
        genres: selectedGenres,
        intensity: intensity[0],
        price: Math.round(299 + (selectedGenres.length * 50) + (intensity[0] * 2)),
        description: `A ${intensity[0] > 70 ? 'powerful' : intensity[0] > 40 ? 'balanced' : 'gentle'} blend of ${selectedGenres.map(g => g.name).join(', ')} essences.`,
        uniqueId: Date.now(),
        rarity: selectedGenres.length >= 3 ? 'Legendary' : selectedGenres.length >= 2 ? 'Rare' : 'Common'
      };
      
      setCustomBottle(bottle);
      setIsCreating(false);
      
      // Clear particles after creation
      setTimeout(() => setParticles([]), 3000);

      // Save to localStorage
      const savedBottles = JSON.parse(localStorage.getItem('customBottles') || '[]');
      savedBottles.push(bottle);
      localStorage.setItem('customBottles', JSON.stringify(savedBottles.slice(-10))); // Keep last 10
    }, 3000);
  };

  const resetLab = () => {
    setSelectedGenres([]);
    setIntensity([50]);
    setCustomBottle(null);
    setParticles([]);
  };

  const getBottleGradient = () => {
    if (selectedGenres.length === 0) return 'from-gray-400 to-gray-600';
    const colors = selectedGenres.map(g => g.color.replace('bg-', ''));
    return `from-${colors[0]} via-${colors[Math.floor(colors.length/2)] || colors[0]} to-${colors[colors.length-1]}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
            Detergent <span className="text-purple-400">Laboratory</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Mix and match genres to create your own signature Netflix Detergent blend. 
            Be the showrunner of your laundry experience.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Lab Controls */}
          <div className="space-y-8">
            {/* Genre Selection */}
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  🧪 Genre Mixer
                  <Badge className="ml-4 bg-purple-600">{selectedGenres.length}/3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {genres.map(genre => (
                    <Button
                      key={genre.name}
                      onClick={() => toggleGenre(genre)}
                      className={`p-4 text-center transition-all transform ${
                        selectedGenres.find(g => g.name === genre.name)
                          ? `${genre.color} scale-110 shadow-lg shadow-current/50`
                          : 'bg-gray-800 hover:bg-gray-700 hover:scale-105'
                      }`}
                      disabled={!selectedGenres.find(g => g.name === genre.name) && selectedGenres.length >= 3}
                    >
                      <div className="text-2xl mb-2">{genre.icon}</div>
                      <div className="text-sm font-semibold">{genre.name}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intensity Control */}
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white">⚡ Intensity Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-white">
                    <span>Gentle</span>
                    <span className="font-bold">{intensity[0]}%</span>
                    <span>Maximum</span>
                  </div>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className={`h-2 rounded-full bg-gradient-to-r ${
                    intensity[0] > 80 ? 'from-red-500 to-red-700' :
                    intensity[0] > 60 ? 'from-orange-500 to-red-500' :
                    intensity[0] > 40 ? 'from-yellow-500 to-orange-500' :
                    'from-green-500 to-yellow-500'
                  }`} />
                </div>
              </CardContent>
            </Card>

            {/* Creation Button */}
            <Button
              onClick={createCustomBottle}
              disabled={selectedGenres.length === 0 || isCreating}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-xl font-bold transform transition-all hover:scale-105 disabled:scale-100"
            >
              {isCreating ? '🧪 Creating Magic...' : '✨ Create My Blend'}
            </Button>

            <Button
              onClick={resetLab}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              🔄 Reset Laboratory
            </Button>
          </div>

          {/* 3D Bottle Preview */}
          <div className="relative">
            <Card className="bg-black/60 backdrop-blur-lg border-purple-500/30 min-h-96">
              <CardContent className="p-8 relative overflow-hidden">
                {/* Particles Effect */}
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className={`absolute w-2 h-2 ${particle.color} rounded-full animate-ping`}
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}

                {/* Bottle Display */}
                <div className="text-center">
                  {!isCreating && !customBottle && (
                    <div className="text-gray-500 py-16">
                      <div className="text-6xl mb-4">🧪</div>
                      <p className="text-xl">Select genres to start creating</p>
                    </div>
                  )}

                  {isCreating && (
                    <div className="py-16">
                      <div className="text-8xl mb-6 animate-spin">⚗️</div>
                      <p className="text-2xl text-white animate-pulse">Mixing genres...</p>
                      <div className="w-full bg-gray-700 h-2 rounded-full mt-6">
                        <div className="bg-purple-500 h-2 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}

                  {customBottle && !isCreating && (
                    <div className="space-y-6">
                      {/* 3D Bottle */}
                      <div className="relative">
                        <div className={`w-32 h-48 mx-auto rounded-t-3xl rounded-b-lg bg-gradient-to-b ${getBottleGradient()} shadow-2xl transform hover:scale-110 transition-all duration-500 animate-pulse`}>
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold text-center">
                            <div>NETFLIX</div>
                            <div>CUSTOM</div>
                          </div>
                          
                          {/* Genre Icons on Bottle */}
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {selectedGenres.map((genre, i) => (
                              <span key={i} className="text-lg">{genre.icon}</span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Glowing Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-b ${getBottleGradient()} rounded-t-3xl rounded-b-lg opacity-30 blur-lg animate-pulse`} />
                      </div>

                      {/* Bottle Info */}
                      <div className="text-white space-y-3">
                        <h3 className="text-2xl font-bold">{customBottle.name}</h3>
                        <Badge className={`${
                          customBottle.rarity === 'Legendary' ? 'bg-yellow-500' :
                          customBottle.rarity === 'Rare' ? 'bg-purple-500' :
                          'bg-gray-500'
                        } text-black font-bold`}>
                          {customBottle.rarity}
                        </Badge>
                        <p className="text-gray-300">{customBottle.description}</p>
                        <div className="text-3xl font-bold text-green-400">₹{customBottle.price}</div>
                        
                        <div className="flex justify-center space-x-2 mt-4">
                          {customBottle.genres.map((genre, i) => (
                            <Badge key={i} className={`${genre.color} text-white`}>
                              {genre.icon} {genre.name}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-6">
                          🛒 Add to Collection
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lab Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
              <div className="bg-black/40 backdrop-blur-lg p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">
                  {JSON.parse(localStorage.getItem('customBottles') || '[]').length}
                </div>
                <div className="text-gray-300 text-sm">Bottles Created</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">
                  {selectedGenres.length * intensity[0]}
                </div>
                <div className="text-gray-300 text-sm">Mix Power</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveBottleLab;