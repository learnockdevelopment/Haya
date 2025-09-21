'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import { FiMail, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary-600 rounded-lg p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <FiMail className="w-8 h-8 mr-2" />
          <h3 className="text-2xl font-bold">{t('home.newsletter')}</h3>
        </div>
        <p className="text-primary-100 mb-6">
          {t('home.newsletterSubtitle')}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletterPlaceholder')}
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              required
            />
          </div>
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3"
          >
            <FiSend className="w-4 h-4 mr-2" />
            {t('home.subscribe')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;



