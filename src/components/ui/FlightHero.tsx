// components/AlternativeHeroSlider.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';

const FlightHero = ({ 
  slides = [], 
  autoPlay = true, 
  interval = 5000,
  showNavigation = true,
  showIndicators = true,
  showPlayPause = true
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [isPlaying, interval, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <p className="text-lg md:text-xl mb-4 font-light text-primary-300">
                    {slide.subtitle}
                  </p>
                  <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${slide.titleColor || 'text-white'}`}>
                    {slide.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    {slide.user ? (
                      <Link href={slide.dashboardLink || "/dashboard"}>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-105">
                          {slide.dashboardText}
                          <FiArrowRight className="text-xl" />
                        </button>
                      </Link>
                    ) : (
                      <>
                        <Link href={slide.registerLink || "/register"}>
                          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-105">
                            {slide.registerText}
                            <FiArrowRight className="text-xl" />
                          </button>
                        </Link>
                        <Link href={slide.loginLink || "/login"}>
                          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                            {slide.loginText}
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="bg-white/20 rounded-full h-1">
            <div 
              className="bg-primary-600 h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentSlide + 1) / slides.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
        {/* Play/Pause Button */}
        {showPlayPause && (
          <button
            onClick={togglePlayPause}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
          >
            {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
          </button>
        )}

        {/* Indicator Dots */}
        {showIndicators && slides.length > 1 && (
          <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-full p-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-primary-600 scale-125' 
                    : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Slide Numbers */}
        <div className="text-white font-mono text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all z-20"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all z-20"
          >
            <FiChevronRight size={28} />
          </button>
        </>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 pointer-events-none"></div>
    </section>
  );
};

export default FlightHero;