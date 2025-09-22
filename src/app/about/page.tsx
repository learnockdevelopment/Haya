'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi';
import WhyChoose from '@/components/ui/whyChoose';
import Start from '@/components/ui/Start';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[url(/images/Frame.png)] text-text-950 py-20 min-h-[80vh] bg-cover bg-center flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('about.title')}
            </h1>
            {/* <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p> */}
          </div>
        </div>
      </section>
      {/* why choose section */ }
      <section>
        <WhyChoose />
      </section>
      {/* Mission Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.mission')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.missionText1')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.missionText2')}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiTarget className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.innovation')}</h3>
                    <p className="text-gray-600">
                      {t('about.innovationText')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiUsers className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.community')}</h3>
                    <p className="text-gray-600">
                      {t('about.communityText')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiAward className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.excellence')}</h3>
                    <p className="text-gray-600">
                      {t('about.excellenceText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* start section */}
      <section>
        <Start />
      </section>
      {/* Values Section */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-16">
      <div className='h-12 w-44 bg-primary-600 rounded-full mx-auto mb-6'>

      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Work It Works Step by Step
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Follow these simple steps to plan your journey.
      </p>
    </div>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Step 1 */}
      <div className="text-center">
        <div className="  rounded-full flex items-center justify-center mx-auto mb-6">
          <img src="/images/img1about.png" alt="Select Destination" className="w-32 h-24" />
        </div>
        <h3 className="text-xl font-semibold text-green-700 mb-3">Select Destination</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.
        </p>
      </div>

      {/* Step 2 */}
      <div className="text-center">
        <div className=" rounded-full flex items-center justify-center mx-auto mb-6">
          <img src="/images/img2about.svg" alt="Make an Appointment" className="w-32 h-24" />
        </div>
        <h3 className="text-xl font-semibold text-green-700 mb-3">Make an Appointment</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.
        </p>
      </div>

      {/* Step 3 */}
      <div className="text-center">
        <div className="  rounded-full flex items-center justify-center mx-auto mb-6">
          <img src="/images/img3about.svg" alt="Enjoy our tour" className="w-32 h-24" />
        </div>
        <h3 className="text-xl font-semibold text-green-700 mb-3">Enjoy our tour</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Technology Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.technology')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.technologySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.nextjs')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('about.nextjsDesc')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.typescript')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('about.typescriptDesc')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.mongodb')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('about.mongodbDesc')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.tailwind')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('about.tailwindDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('about.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              {t('about.getStarted')}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              {t('about.contactUs')}
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutPage;
