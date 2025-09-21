'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  country: string;
  rating: number;
  title: string;
  content: string;
  tourName?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className = '' }) => {
  const { t } = useLanguage();

  const renderStars = (rating: number) => {
    const safeRating = rating || 0;
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < safeRating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-lg">
                  {testimonial.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <h4 className="font-semibold text-gray-900">{testimonial.name || 'Anonymous'}</h4>
              {testimonial.isVerified && (
                <FiCheckCircle className="w-4 h-4 text-green-500 ml-1" />
              )}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <FiMapPin className="w-3 h-3 mr-1" />
              <span>{testimonial.location || 'N/A'}, {testimonial.country || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {renderStars(testimonial.rating)}
        </div>
      </div>

      {/* Tour Name */}
      {testimonial.tourName && (
        <div className="mb-3">
          <span className="text-sm text-primary-600 font-medium">
            {testimonial.tourName}
          </span>
        </div>
      )}

      {/* Title */}
      <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {testimonial.title}
      </h5>

      {/* Content */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
        "{testimonial.content}"
      </p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {new Date(testimonial.createdAt).toLocaleDateString()}
          </span>
          {testimonial.isVerified && (
            <span className="flex items-center text-green-600">
              <FiCheckCircle className="w-3 h-3 mr-1" />
              {t('home.verified')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
