import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { pricingPlans } from '../data/mockData';

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Choose Your <span className="text-red-600">Sudscription</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pick the perfect plan for your binge-washing lifestyle. Cancel anytime, but why would you?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-br from-red-600/20 to-red-800/20 border-red-500 scale-105'
                  : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-gray-700 hover:border-red-500'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-600 text-white px-4 py-2">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-black text-red-600">₹{plan.price}</span>
                  <span className="text-gray-400">/{plan.duration}</span>
                </div>
                <CardDescription className="text-gray-300">
                  Perfect for {plan.name.toLowerCase().replace('the ', '')}s
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.popular
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  Start {plan.name}
                </Button>

                {/* Netflix-style badge */}
                <div className="text-center text-xs text-gray-400">
                  {plan.id === 1 && "Try 30 Days Free*"}
                  {plan.id === 2 && "Most Binged Plan"}
                  {plan.id === 3 && "Ultimate Experience"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscription Benefits */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-lg border border-gray-700 mb-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            All Sudscriptions Include
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold text-white mb-2">Smart App Control</h4>
              <p className="text-gray-400">Netflix-style interface for your washing machine</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h4 className="text-xl font-semibold text-white mb-2">Premium Soundtracks</h4>
              <p className="text-gray-400">Cinematic audio for every wash cycle</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-xl font-semibold text-white mb-2">Free Delivery</h4>
              <p className="text-gray-400">Monthly deliveries to keep you binge-washing</p>
            </div>
          </div>
        </div>

        {/* Netflix-style Free Trial Banner */}
        <div className="text-center">
          <div className="bg-red-600 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">
              Try 30 Days of Freshness Free*
            </h3>
            <p className="text-red-100 mb-4">
              *with Sudscription. Cancel anytime, but your clothes might miss the drama.
            </p>
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-3"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* Plan Selection Modal */}
      {selectedPlan && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPlan(null)}
        >
          <div 
            className="bg-gray-800 p-8 rounded-lg max-w-md w-full border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Welcome to {selectedPlan.name}!
            </h3>
            <p className="text-gray-300 mb-6">
              You've selected our {selectedPlan.name.toLowerCase()} plan. 
              Ready to start your sudscription journey?
            </p>
            <div className="flex space-x-4">
              <Button className="flex-1 bg-red-600 hover:bg-red-700">
                Confirm Sudscription
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-gray-600 text-gray-300"
                onClick={() => setSelectedPlan(null)}
              >
                Keep Browsing
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingPlans;