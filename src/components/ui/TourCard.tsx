'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMultilingual } from '@/hooks/useMultilingual';
import Button from '@/components/ui/Button';
import { FiStar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';

interface Tour {
  _id: string;
  title: {
    en: string;
    ar: string;
    [key: string]: string;
  };
  shortDescription: {
    en: string;
    ar: string;
    [key: string]: string;
  };
  price: number;
  actualPrice?: number;
  duration: number;
  location?: string;
  country?: string;
  city?: string;
  featuredImage?: string;
  category: string;
  difficulty: string;
  ratings: {
    average: number;
    count: number;
  };
  maxGroupSize: number;
  highlights: {
    en: string[];
    ar: string[];
    [key: string]: string[];
  };
  slug: string;
  discountPercentage?: number;
}

interface TourCardProps {
  tour: Tour;
  className?: string;
}

const TourCard: React.FC<TourCardProps> = ({ tour, className = '' }) => {
  const { t } = useLanguage();
  const { getText, getArray } = useMultilingual();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'challenging':
        return 'bg-orange-100 text-orange-800';
      case 'extreme':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'adventure':
        return 'bg-blue-100 text-blue-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'beach':
        return 'bg-cyan-100 text-cyan-800';
      case 'mountain':
        return 'bg-green-100 text-green-800';
      case 'city':
        return 'bg-gray-100 text-gray-800';
      case 'wildlife':
        return 'bg-yellow-100 text-yellow-800';
      case 'luxury':
        return 'bg-pink-100 text-pink-800';
      case 'budget':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={tour.featuredImage || '/images/placeholder-tour.jpg'}
          alt={getText(tour.title)}
          fill
          className="object-cover"
        />
        {tour.discountPercentage && tour.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            -{tour.discountPercentage}%
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tour.category)}`}>
            {tour.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
            {tour.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FiMapPin className="w-4 h-4 mr-1" />
          <span>{tour.location || tour.city || 'N/A'}, {tour.country || 'N/A'}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {getText(tour.title)}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {getText(tour.shortDescription)}
        </p>

        {/* Highlights */}
        {tour.highlights && getArray(tour.highlights).length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {getArray(tour.highlights).slice(0, 2).map((highlight, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {highlight}
                </span>
              ))}
              {getArray(tour.highlights).length > 2 && (
                <span className="text-xs text-gray-500">
                  +{getArray(tour.highlights).length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900">
                {(tour.ratings?.average || 0).toFixed(1)}
              </span>
            </div>
            <span className="ml-1 text-sm text-gray-600">
              ({tour.ratings?.count || 0} {t('home.reviews')})
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FiUsers className="w-4 h-4 mr-1" />
            <span>Max {tour.maxGroupSize || 0}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <FiClock className="w-4 h-4 mr-1" />
          <span>{tour.duration ? `${tour.duration} days` : 'N/A'}</span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">
              ${tour.price || 0}
            </span>
            {tour.actualPrice && tour.actualPrice > (tour.price || 0) && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${tour.actualPrice}
              </span>
            )}
            <span className="ml-1 text-sm text-gray-600">
              {t('home.from')}
            </span>
          </div>
          <div className="flex space-x-2">
            <Link href={`/tours/${tour.slug}`}>
              <Button variant="outline" size="sm">
                {t('home.learnMore')}
              </Button>
            </Link>
            <Button size="sm">
              {t('home.bookNow')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
