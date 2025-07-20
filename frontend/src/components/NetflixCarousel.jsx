import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import AudioSimulator from './AudioSimulator';
import NetflixVideoPlayer from './NetflixVideoPlayer';
import NetflixProductModal from './NetflixProductModal';

const NetflixCarousel = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const carouselRef = useRef(null);
  
  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= products.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? products.length - itemsPerView : prev - 1
    );
  };

  const handleWatchTrailer = (product) => {
    setPlayingTrailer(product);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Auto-advance carousel when not hovering
  useEffect(() => {
    if (!isHovering && !selectedProduct) {
      const interval = setInterval(() => {
        nextSlide();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isHovering, currentIndex, selectedProduct]);

  return (
    <div 
      className="relative w-full mb-8 sm:mb-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-8 px-2 sm:px-0">
        <h3 className="text-lg sm:text-2xl font-bold text-white truncate">{title}</h3>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            onClick={prevSlide}
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-full p-2 sm:p-3 text-sm sm:text-base"
          >
            ⬅
          </Button>
          <Button
            onClick={nextSlide}
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-full p-2 sm:p-3 text-sm sm:text-base"
          >
            ➡
          </Button>
        </div>
      </div>

      {/* Carousel Container - Fixed responsive issues */}
      <div className="relative overflow-hidden rounded-lg">
        <div 
          className={`flex transition-transform duration-500 ease-in-out gap-2 sm:gap-4`}
          style={{ 
            transform: `translateX(-${(currentIndex) * (100 / itemsPerView)}%)`,
            width: `${(products.length * 100) / itemsPerView}%`
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex-shrink-0 transition-all duration-300 relative ${
                itemsPerView === 1 ? 'w-full' : 
                itemsPerView === 2 ? 'w-1/2 pr-2 sm:pr-4' : 
                'w-1/3 pr-2 sm:pr-4'
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Card 
                className={`bg-gray-800/60 backdrop-blur-lg border-gray-700 transition-all duration-300 transform group overflow-hidden cursor-pointer ${
                  hoveredProduct === product.id 
                    ? 'scale-105 sm:scale-110 border-red-500 shadow-2xl shadow-red-500/30 z-30' 
                    : 'hover:scale-102 sm:hover:scale-105 hover:border-red-400 z-10'
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      hoveredProduct === product.id ? 'scale-125 brightness-110' : 'group-hover:scale-110'
                    }`}
                  />
                  
                  {/* Netflix-style gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  
                  {/* Genre Badge */}
                  <Badge 
                    className={`absolute top-2 right-2 ${product.color} text-white border-none text-xs sm:text-sm`}
                  >
                    {product.genre}
                  </Badge>

                  {/* Match Percentage */}
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white border-none text-xs">
                    {Math.floor(Math.random() * 10) + 90}% Match
                  </Badge>

                  {/* Play Button - Only on Hover for larger screens */}
                  {(hoveredProduct === product.id && window.innerWidth > 640) && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWatchTrailer(product);
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transform transition-all hover:scale-110 shadow-2xl"
                      >
                        <span className="text-white text-sm sm:text-lg ml-0.5">▶</span>
                      </Button>
                    </div>
                  )}

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h4 className="text-white font-bold text-xs sm:text-sm mb-1 truncate">{product.name}</h4>
                    <p className="text-gray-300 text-xs mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-2">
                      {product.description.substring(0, window.innerWidth < 640 ? 30 : 60)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-bold text-xs sm:text-sm">₹{product.price}</span>
                      <div className="hidden sm:flex items-center text-xs text-gray-400">
                        <span>⭐ 4.{Math.floor(Math.random() * 9) + 1}</span>
                        <span className="ml-2">2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
        {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / itemsPerView) === index
                ? 'bg-red-600 w-4 sm:w-6'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Netflix Product Modal */}
      {selectedProduct && (
        <NetflixProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onWatchTrailer={handleWatchTrailer}
        />
      )}

      {/* Netflix Video Player */}
      {playingTrailer && (
        <NetflixVideoPlayer
          product={playingTrailer}
          isPlaying={true}
          onClose={() => setPlayingTrailer(null)}
        />
      )}
    </div>
  );
};

export default NetflixCarousel;