import React from 'react'
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';

function Start() {
  const { t } = useLanguage();

  return (
    <section className="bg-[url(/images/girlbg.jpg)] bg-cover bg-center py-12 sm:py-16 md:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1500px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center text-center lg:text-left">
          
          {/* Left Text Section */}
          <div className="flex flex-col justify-center items-center lg:items-start">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-700 bg-primary-100 rounded-full px-4 py-2 inline-block font-marck mb-4">
              {t('home.startYourJourneyBadge')}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-950 mb-4 font-manrope leading-snug">
              {t('home.startYourJourneyDescription')}
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary-700 mb-6 font-manrope leading-snug">
              {t('home.startYourJourneyButton')}
            </h2>
            <Link href="/register">
              <Button className="inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-colors duration-200">
                {t('home.booknow')}
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="lg:col-span-2">
            <img 
              src="/images/girl.svg" 
              alt="Start Your Journey" 
              className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-2xl h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Start
