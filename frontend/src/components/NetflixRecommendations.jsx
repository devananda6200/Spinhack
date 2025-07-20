import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const NetflixRecommendations = () => {
  const [activeRow, setActiveRow] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    favoriteGenres: ['Action'],
    lastWatched: 'Action Apple Rush'
  });

  // Condensed, high-impact recommendations
  const recommendations = [
    {
      title: `Because you loved ${userPreferences.lastWatched}...`,
      subtitle: "More explosive freshness awaits",
      items: [
        { name: "Turbo Tornado Clean", genre: "Action", match: 98, trending: true, image: "/images/turbo tornado clean.png" },
        { name: "Game of Foams", genre: "Action", match: 96, new: true, image: "/images/Game of foams.png" },
        { name: "High Speed Herbal Hit", genre: "Action", match: 94, image: "/images/High-Speed Herbal bit.png" },
        { name: "How I Met The Washing Machine", genre: "Comedy", match: 92, image: "/images/how i met the washing machine.png" }
      ]
    },
    {
      title: "Netflix Detergent Originals",
      subtitle: "Exclusively on WashFlix",
      items: [
        { name: "Stranger Fresh", genre: "Sci-Fi", match: 95, original: true, image: "/images/stranger-fresh.png"},
        { name: "Brigerton Blossom", genre: "Drama", match: 91, original: true, image: "/images/bridgerton-blossom.png" },
        { name: "Money Heist Mint", genre: "Thriller", match: 89, original: true, image: "/images/money heist mint.png" },
        { name: "Squid Citrus", genre: "Drama", match: 93, original: true, image: "/images/squid-citurs.png" }
      ]
    },
    {
      title: "Trending This Week",
      subtitle: "What everyone's washing with",
      items: [
        { name: "Viral Vanilla Vibe", genre: "Comedy", match: 87, trending: true, image: "/images/viral vanilla vibe.png" },
        { name: "Friends with Clothes", genre: "Comedy", match: 85, trending: true, image: "/images/Friends with clothes.png" },
        { name: "Meme Machine Clean", genre: "Comedy", match: 88, new: true, image: "/images/meme machine clean.png" },
        { name: "Social Soap Sensation", genre: "Comedy", match: 90, trending: true, image: "/images/social soap sensation.png" }
      ]
    }
  ];

  // Auto-rotate through sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % recommendations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (item) => {
    console.log(`Clicked on: ${item.name}`);
    // Add to user preferences
    setUserPreferences(prev => ({
      ...prev,
      lastWatched: item.name
    }));
  };

  const currentSection = recommendations[activeRow];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            Made Just <span className="text-red-600">For You</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            AI-curated freshness based on your washing personality
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {recommendations.map((section, index) => (
              <Button
                key={index}
                onClick={() => setActiveRow(index)}
                variant="ghost"
                className={`px-3 sm:px-6 py-2 text-sm sm:text-base rounded-md transition-all ${
                  activeRow === index
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {index === 0 ? '🎯' : index === 1 ? '⭐' : '🔥'}
                <span className="hidden sm:inline ml-2">
                  {index === 0 ? 'For You' : index === 1 ? 'Originals' : 'Trending'}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Active Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {currentSection.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">{currentSection.subtitle}</p>
          </div>

          {/* Items Grid - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {currentSection.items.map((item, itemIndex) => (
              <Card
                key={itemIndex}
                className="bg-gray-800/60 backdrop-blur-lg border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden"
                onClick={() => handleItemClick(item)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${
                  item.genre === 'Action' ? 'from-red-500 to-orange-500' :
                  item.genre === 'Romance' ? 'from-pink-500 to-rose-500' :
                  item.genre === 'Thriller' ? 'from-purple-500 to-indigo-500' :
                  item.genre === 'Comedy' ? 'from-yellow-500 to-orange-500' :
                  item.genre === 'Drama' ? 'from-blue-500 to-teal-500' :
                  item.genre === 'Sci-Fi' ? 'from-green-500 to-cyan-500' :
                  'from-gray-500 to-gray-700'
                } group-hover:opacity-40 transition-opacity duration-300`} />

                <div className="relative h-32 sm:h-40 overflow-hidden">
                  {/* Main Visual */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-110 transition-transform duration-300">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-x-1">
                    {item.new && (
                      <Badge className="bg-red-600 text-white text-xs">NEW</Badge>
                    )}
                    {item.trending && (
                      <Badge className="bg-orange-600 text-white text-xs">🔥</Badge>
                    )}
                    {item.original && (
                      <Badge className="bg-black text-white text-xs">N</Badge>
                    )}
                  </div>

                  {/* Match Percentage */}
                  <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold">
                    {item.match}%
                  </Badge>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition-transform shadow-2xl">
                      <span className="text-black text-lg sm:text-2xl ml-1">▶</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-3 sm:p-4 relative z-10">
                  <h4 className="text-white font-bold text-sm sm:text-base mb-1 truncate group-hover:text-red-400 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-400">{item.genre}</span>
                    <div className="flex items-center text-yellow-400">
                      <span>⭐</span>
                      <span className="ml-1">4.{Math.floor(item.match / 10)}</span>
                    </div>
                  </div>

                  {/* Quick Action Bar */}
                  <div className="flex justify-between items-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-white/20 p-1 rounded-full w-7 h-7 text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        👍
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-white/20 p-1 rounded-full w-7 h-7 text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        +
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white p-1 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ℹ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-lg border-red-500/30 max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Ready for Your Next Binge Wash?
              </h3>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Join 2M+ users who've discovered their perfect detergent match
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-bold transform hover:scale-105 transition-all">
                🎬 Start Your Journey
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {recommendations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === activeRow ? 'bg-red-600 w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetflixRecommendations;