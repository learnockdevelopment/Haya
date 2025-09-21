'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatsCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ number, label, icon, className = '' }) => {
  const { t } = useLanguage();

  return (
    <div className={`text-center ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
        {icon}
      </div>
      <div className="text-3xl font-bold text-primary-600 mb-2">
        {number}
      </div>
      <div className="text-gray-600 font-medium">
        {t(label)}
      </div>
    </div>
  );
};

export default StatsCard;



