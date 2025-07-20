import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import AudioSimulator from './AudioSimulator';

const NetflixProductModal = ({ product, onClose, onWatchTrailer }) => {
  const [isInMyList, setIsInMyList] = useState(false);
  const [isLiked, setIsLiked] = useState(null); // null, true (thumbs up), false (thumbs down)
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Netflix-style similar products
  useEffect(() => {
    const similar = [
      { name: 'Action Adventure Clean', genre: 'Action', rating: 4.8 },
      { name: 'Romantic Evening Rinse', genre: 'Romance', rating: 4.6 },
      { name: 'Thriller Night Wash', genre: 'Thriller', rating: 4.9 }
    ];
    setSimilarProducts(similar);
  }, []);

  // Funny Netflix detergent episodes
  const episodes = [
    { 
      title: "Pilot Wash", 
      duration: "42min", 
      description: "Our hero detergent meets its first load of dirty laundry. Drama ensues when a red sock infiltrates the white wash."
    },
    { 
      title: "The Stain Strikes Back", 
      duration: "45min", 
      description: "A mysterious stain appears that seems impossible to remove. Will our detergent hero save the day?"
    },
    { 
      title: "Rinse and Repeat", 
      duration: "38min", 
      description: "The washing machine develops amnesia and keeps forgetting to rinse. A psychological thriller unfolds."
    },
    { 
      title: "The Fabric Softener Affair", 
      duration: "41min", 
      description: "Romance blooms when detergent meets fabric softener. But their love is forbidden by the washing machine."
    }
  ];

  const detergentDetails = {
    director: "Steven Sudberg",
    cast: ["Tide Turner", "Downy McSoftener", "Gain Freshworth"],
    writers: ["Clean Eastwood", "Wash Anderson"],
    maturityRating: "F (For Fresh)",
    year: "2025",
    seasons: 3,
    episodes: 24,
    genres: [product.genre, "Fresh", "Sudsy", "Cinematic"],
    awards: ["Golden Bubble Award", "Best Scent Performance", "Outstanding Achievement in Freshness"]
  };

  const handleAddToMyList = () => {
    setIsInMyList(!isInMyList);
    // Save to localStorage
    const myList = JSON.parse(localStorage.getItem('netflixDetergentMyList') || '[]');
    if (!isInMyList) {
      myList.push(product.id);
    } else {
      const index = myList.indexOf(product.id);
      if (index > -1) myList.splice(index, 1);
    }
    localStorage.setItem('netflixDetergentMyList', JSON.stringify(myList));
  };

  const handleLike = (liked) => {
    setIsLiked(liked);
    // Save to localStorage
    const ratings = JSON.parse(localStorage.getItem('netflixDetergentRatings') || '{}');
    ratings[product.id] = liked;
    localStorage.setItem('netflixDetergentRatings', JSON.stringify(ratings));
  };

  // Load saved preferences
  useEffect(() => {
    const myList = JSON.parse(localStorage.getItem('netflixDetergentMyList') || '[]');
    setIsInMyList(myList.includes(product.id));
    
    const ratings = JSON.parse(localStorage.getItem('netflixDetergentRatings') || '{}');
    setIsLiked(ratings[product.id] || null);
  }, [product.id]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="min-h-screen p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          {/* Hero Section */}
          <div className="relative h-64 sm:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              ✕
            </Button>

            {/* Hero Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">{product.name}</h1>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Button
                  onClick={() => onWatchTrailer(product)}
                  className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-2 text-sm sm:text-base"
                >
                  ▶ Watch Trailer
                </Button>
                
                <Button
                  onClick={handleAddToMyList}
                  variant="outline"
                  className={`border-gray-500 text-white hover:bg-gray-700 px-6 py-2 text-sm sm:text-base ${
                    isInMyList ? 'bg-gray-700' : ''
                  }`}
                >
                  {isInMyList ? '✓ In My Wash List' : '+ Add to Wash List'}
                </Button>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleLike(true)}
                    variant="ghost"
                    className={`border border-gray-500 rounded-full w-10 h-10 p-0 ${
                      isLiked === true ? 'bg-green-600 border-green-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    👍
                  </Button>
                  <Button
                    onClick={() => handleLike(false)}
                    variant="ghost"
                    className={`border border-gray-500 rounded-full w-10 h-10 p-0 ${
                      isLiked === false ? 'bg-red-600 border-red-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    👎
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                <Badge className="bg-green-600">97% Match</Badge>
                <span>{detergentDetails.year}</span>
                <span>{detergentDetails.seasons} Seasons</span>
                <Badge variant="outline" className="border-gray-500 text-gray-300">
                  {detergentDetails.maturityRating}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <p className="text-white text-lg mb-4 leading-relaxed">
                    {product.description} This isn't just a detergent - it's a complete sensory experience 
                    that will revolutionize your laundry routine forever. Prepare for the most binge-worthy 
                    wash cycles of your life.
                  </p>
                  
                  <div className="text-gray-400 text-sm">
                    <span className="text-white font-semibold">Scent Profile:</span> Deep, complex notes with 
                    hints of {product.genre.toLowerCase()} and unprecedented freshness.
                  </div>
                </div>

                {/* Episodes Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">Wash Episodes</h3>
                    <select 
                      value={currentSeason}
                      onChange={(e) => setCurrentSeason(parseInt(e.target.value))}
                      className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1"
                    >
                      <option value={1}>Season 1</option>
                      <option value={2}>Season 2</option>
                      <option value={3}>Season 3</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {episodes.map((episode, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="text-white font-bold text-xl min-w-8">{index + 1}</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-semibold">{episode.title}</h4>
                                <span className="text-gray-400 text-sm">{episode.duration}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{episode.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              className="text-white hover:bg-gray-700 rounded-full w-10 h-10 p-0"
                            >
                              ▶
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* More Like This */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">More Like This</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {similarProducts.map((similar, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <div className="w-full h-24 bg-gradient-to-br from-red-500 to-red-800 rounded mb-3 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">🧼</span>
                          </div>
                          <h4 className="text-white font-semibold text-sm mb-1">{similar.name}</h4>
                          <div className="text-gray-400 text-xs">
                            <span>⭐ {similar.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{similar.genre}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Cast & Crew */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Cast & Crew</h4>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div><span className="text-gray-500">Director:</span> {detergentDetails.director}</div>
                    <div><span className="text-gray-500">Cast:</span> {detergentDetails.cast.join(', ')}</div>
                    <div><span className="text-gray-500">Writers:</span> {detergentDetails.writers.join(', ')}</div>
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {detergentDetails.genres.map(genre => (
                      <Badge key={genre} variant="outline" className="border-gray-600 text-gray-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Awards & Recognition</h4>
                  <div className="space-y-2">
                    {detergentDetails.awards.map((award, index) => (
                      <div key={index} className="flex items-center text-yellow-400 text-sm">
                        <span className="mr-2">🏆</span>
                        {award}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">₹{product.price}</div>
                    <div className="text-gray-400 text-sm mb-4">Per bottle / Season</div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
                      🛒 Add to Sudscription
                    </Button>
                    <div className="text-xs text-gray-500 mt-2">Cancel anytime (but why would you?)</div>
                  </CardContent>
                </Card>

                {/* Fun Features */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Special Features</h4>
                  <div className="space-y-3">
                    <AudioSimulator
                      effectName="▶ Play Theme Song"
                      duration={3000}
                      className="w-full border-gray-600 text-gray-300 text-sm"
                    />
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
                    >
                      📱 Download for Offline Washing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
                    >
                      🎬 Behind the Suds
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixProductModal;