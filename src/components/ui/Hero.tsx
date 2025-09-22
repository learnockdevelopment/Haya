// components/HeroSlider.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = ({ 
  slides, 
  autoPlay = true, 
  interval = 5000,
  showNavigation = true,
  showIndicators = true 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center w-full">
                 <p className="text-2xl md:text-4xl mb-8   mx-auto font-marck text-primary-700  px-4 py-2 ">
                {slide.subtitle}
              </p>
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto ${slide.titleColor || 'text-white'}`}>
                {slide.title}
              </h1>
             
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {slide.user ? (
                  <Link href={slide.dashboardLink || "/dashboard"}>
                    <button className="text-white bg-primary-600  px-6 py-3 rounded-full font-medium flex items-center">
                      {slide.dashboardText}
                      <FiArrowRight className="ml-2" />
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link href={slide.registerLink || "/register"}>
                      <button className="text-white bg-primary-600  px-6 py-3 rounded-full font-medium flex items-center">
                        {slide.registerText}
                        <FiArrowRight className="ml-2" />
                      </button>
                    </Link>
                    {/* <Link href={slide.loginLink || "/login"}>
                      <button className="border border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-medium">
                        {slide.loginText}
                      </button>
                    </Link> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-600  text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-600  text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicator dots */}
      {/* {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      )} */}
    </section>
  );
};

export default HeroSlider;