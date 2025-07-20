import React from 'react';
import NetflixCarousel from './NetflixCarousel';
import { products } from '../data/mockData';

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Genre-Scented <span className="text-red-600">Collection</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each bottle is a different entertainment experience. Choose your genre, choose your freshness.
          </p>
        </div>

        {/* Netflix-style Carousels */}
        <div className="space-y-16">
          <NetflixCarousel 
            products={products} 
            title="🔥 Trending Now in Freshness" 
          />
          
          <NetflixCarousel 
            products={products.filter(p => ['Action', 'Thriller'].includes(p.genre))} 
            title="💥 Explosive Action Blends" 
          />
          
          <NetflixCarousel 
            products={products.filter(p => ['Romance', 'Drama'].includes(p.genre))} 
            title="💖 Feel-Good Freshness" 
          />
          
          <NetflixCarousel 
            products={products.filter(p => ['Comedy'].includes(p.genre))} 
            title="😂 Comedy Classics" 
          />
        </div>

        {/* Browse All CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg p-8 rounded-lg border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Binge Wash Journey?
            </h3>
            <p className="text-gray-300 mb-6">
              Discover all genres and create your perfect washing experience.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-sm transform transition-all hover:scale-105 shadow-2xl">
              Explore All Collections →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;