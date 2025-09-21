'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tourCount: number;
  description: string;
  slug: string;
}

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, className = '' }) => {
  const { t } = useLanguage();

  return (
    <div className={`relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Image */}
      <div className="relative h-64 w-full">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center text-sm mb-2">
              <FiMapPin className="w-4 h-4 mr-1" />
              <span>{destination.country}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
            <p className="text-sm text-gray-200 mb-3 line-clamp-2">
              {destination.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {destination.tourCount} tours available
              </span>
              <Link href={`/destinations/${destination.slug}`}>
                <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                  {t('home.exploreDestination')}
                  <FiArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;



