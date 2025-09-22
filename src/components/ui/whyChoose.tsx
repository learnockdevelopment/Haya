import React from 'react'
import { FiCheck, FiArrowRight, FiPhone } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

function WhyChoose() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Content - Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="rounded-2xl w-full max-w-md sm:max-w-lg lg:max-w-none flex items-center justify-center">
              <img 
                src="/images/Frame 237.png" 
                alt="Why Choose Us" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center font-marck px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
              {t('home.whyChooseUs.badge')}
            </div>
            
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-4 sm:mb-6">
              {t('home.whyChooseUs.title')}
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              {t('home.whyChooseUs.description')}
            </p>
            
            {/* Benefits */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {t(`home.whyChooseUs.benefit${num}`)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Buttons + Contact */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
              {/* More About Button */}
              <a
                href="/about"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-colors duration-200 text-sm sm:text-base"
              >
                {t('home.whyChooseUs.moreAboutButton')}
                <FiArrowRight className="ml-2 w-5 h-5" />
              </a>
              
              {/* Contact */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <FiPhone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-primary-700">
                    {t('home.whyChooseUs.callUs')}
                  </p>
                  <p className="text-base sm:text-lg text-gray-900 font-medium">
                    00249912329843
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyChoose
