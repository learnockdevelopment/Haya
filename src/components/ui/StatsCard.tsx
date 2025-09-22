'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatsCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
  buttonText?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ number, label, icon, className = '', buttonText }) => {
  const { t } = useLanguage();

  return (
    <div className={`text-center ${className} bg-[#f6f3ec] px-5 py-5 rounded-lg`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
        {icon}
      </div>
      <div className="text-2xl font-bold text-text-500 mb-2 ">
        {number}
      </div>
      <div className="text-text-600 text-lg mb-2">
        {t(label)}
      </div>
      <button className="bg-primary-500 text-white px-4 py-2 rounded-full font-bold">
        {buttonText}
      </button>
    </div>
  );
};

export default StatsCard;