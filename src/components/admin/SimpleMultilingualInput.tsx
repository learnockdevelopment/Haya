'use client';

import React, { useState } from 'react';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

interface MultilingualContent {
  en: string;
  ar: string;
}

interface MultilingualArray {
  en: string[];
  ar: string[];
}

interface SimpleMultilingualInputProps {
  value: MultilingualContent | MultilingualArray;
  onChange: (value: MultilingualContent | MultilingualArray) => void;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const SimpleMultilingualInput: React.FC<SimpleMultilingualInputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  rows = 3,
  className = ''
}) => {
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ar'>('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const getCurrentValue = () => {
    if (type === 'array') {
      return (value as MultilingualArray)[activeLanguage] || [];
    }
    return (value as MultilingualContent)[activeLanguage] || '';
  };

  const handleValueChange = (newValue: string | string[]) => {
    const updatedValue = {
      ...value,
      [activeLanguage]: newValue
    };
    onChange(updatedValue as MultilingualContent | MultilingualArray);
  };

  const handleArrayItemChange = (index: number, newItem: string) => {
    if (type === 'array') {
      const currentArray = getCurrentValue() as string[];
      const updatedArray = [...currentArray];
      updatedArray[index] = newItem;
      handleValueChange(updatedArray);
    }
  };

  const addArrayItem = () => {
    if (type === 'array') {
      const currentArray = getCurrentValue() as string[];
      handleValueChange([...currentArray, '']);
    }
  };

  const removeArrayItem = (index: number) => {
    if (type === 'array') {
      const currentArray = getCurrentValue() as string[];
      const updatedArray = currentArray.filter((_, i) => i !== index);
      handleValueChange(updatedArray);
    }
  };

  const renderInput = () => {
    if (type === 'array') {
      const arrayValue = getCurrentValue() as string[];
      return (
        <div className="space-y-2">
          {arrayValue.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayItemChange(index, e.target.value)}
                placeholder={`${placeholder} ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addArrayItem}
            className="px-4 py-2 text-primary-600 hover:text-primary-800 border border-primary-300 rounded-md"
          >
            + Add Item
          </button>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          value={getCurrentValue() as string}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
        />
      );
    }

    return (
      <input
        type="text"
        value={getCurrentValue() as string}
        onChange={(e) => handleValueChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      />
    );
  };

  return (
    <div className="space-y-2">
      {/* Language Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
        >
          <FiGlobe className="w-4 h-4" />
          <span>{languages.find(lang => lang.code === activeLanguage)?.flag}</span>
          <span>{languages.find(lang => lang.code === activeLanguage)?.name}</span>
          <FiChevronDown className="w-4 h-4" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => {
                  setActiveLanguage(language.code as 'en' | 'ar');
                  setIsDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 ${
                  activeLanguage === language.code ? 'bg-primary-50 text-primary-700' : ''
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Field */}
      {renderInput()}

      {/* Language Indicators */}
      <div className="flex gap-2 text-xs text-gray-500">
        {languages.map((language) => (
          <span
            key={language.code}
            className={`px-2 py-1 rounded ${
              activeLanguage === language.code
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100'
            }`}
          >
            {language.flag} {language.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleMultilingualInput;

