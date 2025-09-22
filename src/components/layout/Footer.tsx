'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiMapPin, FiPhone, FiMail as FiEmail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img 
                src="/logo.svg" 
                alt="Haya Travel" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.tagline', 'Your trusted partner for visa applications. Making travel dreams come true for Sudanese travelers worldwide.')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FiMail className="w-6 h-6" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <FiMapPin className="w-4 h-4 mr-3" />
                <span>{t('footer.address', 'Street 15, Block 23, New Extension, Khartoum, Sudan')}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiPhone className="w-4 h-4 mr-3" />
                <span>{t('footer.phone', '+249 123.456 789')}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiEmail className="w-4 h-4 mr-3" />
                <span>{t('footer.email', 'info@haya-travel.com')}</span>
              </div>
            </div>
          </div>

          {/* Visa Services */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>{t('footer.visaServices', 'Visa Services')}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/visas/tourist"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.touristVisas', 'Tourist Visas')}
                </Link>
              </li>
              <li>
                <Link
                  href="/visas/business"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.businessVisas', 'Business Visas')}
                </Link>
              </li>
              <li>
                <Link
                  href="/visas/student"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.studentVisas', 'Student Visas')}
                </Link>
              </li>
              <li>
                <Link
                  href="/visas/work"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.workVisas', 'Work Visas')}
                </Link>
              </li>
              <li>
                <Link
                  href="/visas/religious"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.religiousVisas', 'Religious Visas')}
                </Link>
              </li>
              <li>
                <Link
                  href="/visas/express"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.expressVisas', 'Express Visas')}
                </Link>
              </li>
              <li>
                <Link
                  href="/visas/express-processing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.expressProcessing', 'Express Processing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.aboutUs', 'About Us')}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.howItWorks', 'How It Works')}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.pricing', 'Pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.faq', 'FAQ')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.blogs', 'Blogs')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.privacyPolicy', 'Privacy Policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Haya Travel. {t('footer.copyright', 'All rights reserved.')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t('footer.privacyPolicy', 'Privacy Policy')}
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t('footer.termsOfService', 'Terms of Service')}
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t('footer.cookiePolicy', 'Cookie Policy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;