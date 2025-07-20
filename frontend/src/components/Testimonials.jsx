import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            What Viewers Are <span className="text-red-600">Saying</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real reviews from real viewers of the Netflix Detergent experience.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border-gray-700">
            <CardContent className="p-8">
              <div className="text-center">
                {/* Star Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-red-500 text-2xl">★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Avatar and Name */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl text-white font-semibold">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-400">Verified Binge Washer</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
            >
              ← Previous
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
            >
              Next →
            </Button>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                index === currentTestimonial
                  ? 'bg-red-600/20 border-red-500'
                  : 'bg-gray-800/40 border-gray-700 hover:border-red-500'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <CardContent className="p-6">
                {/* Mini Star Rating */}
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-red-500 text-sm">★</span>
                  ))}
                </div>

                {/* Shortened Text */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  "{testimonial.text.substring(0, 80)}..."
                </p>

                {/* Mini Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-sm">
                      {testimonial.name}
                    </h5>
                    <p className="text-gray-400 text-xs">Verified Reviewer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Netflix-style Recommendation */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Because you watched reviews...
            </h3>
            <p className="text-gray-300 mb-6">
              We think you'll love these trending detergent experiences
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              See More Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;