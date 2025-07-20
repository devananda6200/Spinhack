import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { moods, products } from '../data/mockData';

const MoodMatcher = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const matchedProduct = products.find(p => p.name === mood.scent);
      setMatchResult({
        mood,
        product: matchedProduct,
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetMatcher = () => {
    setSelectedMood(null);
    setMatchResult(null);
    setIsAnalyzing(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-950 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            MoodMatch™ <span className="text-red-600">AI</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Just like Netflix knows what you want to watch, our AI knows what scent matches your mood.
          </p>
        </div>

        {!matchResult ? (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              How are you feeling today?
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              {moods.map((mood) => (
                <Card
                  key={mood.name}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                    selectedMood?.name === mood.name
                      ? 'bg-red-600 border-red-500 scale-105'
                      : 'bg-gray-800/60 border-gray-700 hover:border-red-500'
                  }`}
                  onClick={() => handleMoodSelect(mood)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{mood.emoji}</div>
                    <h4 className="text-white font-semibold text-lg">{mood.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isAnalyzing && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                <p className="text-xl text-white">Analyzing your mood...</p>
                <p className="text-gray-400">Our AI is matching you with the perfect scent</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-lg border border-red-600">
              <div className="text-center mb-8">
                <Badge className="bg-red-600 text-white text-lg px-4 py-2 mb-4">
                  Perfect Match Found!
                </Badge>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Your mood: {matchResult.mood.name} {matchResult.mood.emoji}
                </h3>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className="bg-red-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${matchResult.confidence}%` }}
                  ></div>
                </div>
                <p className="text-gray-400">{matchResult.confidence}% Match Confidence</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <img
                    src={matchResult.product.image}
                    alt={matchResult.product.name}
                    className="w-48 h-48 mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">
                    {matchResult.product.name}
                  </h4>
                  <p className="text-gray-300 text-lg">
                    {matchResult.mood.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-red-600">
                      ₹{matchResult.product.price}
                    </span>
                    <Badge className={`${matchResult.product.color} text-white`}>
                      {matchResult.product.genre}
                    </Badge>
                  </div>
                  <div className="space-x-4">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Add to Sudscription
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-gray-300"
                      onClick={resetMatcher}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Poster Mockup */}
            <div className="mt-8 text-center">
              <div className="inline-block bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h5 className="text-white text-lg font-semibold mb-4">Your Personal Show Poster</h5>
                <div className="w-48 h-64 bg-gradient-to-b from-red-600 to-black rounded-lg mx-auto relative">
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <div className="text-4xl mb-2">{matchResult.mood.emoji}</div>
                    <h6 className="font-bold text-center">{matchResult.product.name}</h6>
                    <p className="text-xs text-center mt-2">A {matchResult.product.genre} Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoodMatcher;