import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import AudioSimulator from './AudioSimulator';
import { features } from '../data/mockData';

const FeatureShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Cinematic <span className="text-red-600">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience laundry like never before with our Netflix-inspired washing technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-lg border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:scale-105 group"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-red-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </CardDescription>
                
                {feature.demo && (
                  <div className="pt-4 border-t border-gray-700">
                    <AudioSimulator
                      effectName={`Try ${feature.title.split(' ')[0]}`}
                      duration={1500}
                      onPlay={() => console.log(`Demo: ${feature.title}`)}
                      className="w-full border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Netflix-style Interface Demo */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-black p-8 rounded-lg border border-gray-700">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">
            Smart Laundry Companion Preview
          </h3>
          
          <div className="bg-black p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">N</span>
              </div>
              <h4 className="text-xl text-white">WashFlix</h4>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left bg-gray-800 border-gray-600 text-white hover:bg-red-600"
              >
                ▶ Continue Washing Season 3, Episode 7
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-left bg-gray-800 border-gray-600 text-white hover:bg-red-600"
              >
                ⏭ Skip Pre-Soak Intro
              </Button>
              
              <div className="text-gray-400 text-sm">
                <p>Recommended for You:</p>
                <p className="text-white">• Romantic Rose Rinse - Based on your mood history</p>
                <p className="text-white">• Comedy Cotton Cleanse - Trending in your area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;