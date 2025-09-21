'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getLocalizedString, 
  getLocalizedArray, 
  createMultilingualContent, 
  createMultilingualArray,
  getLanguageDisplayName,
  getLanguageFlag,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  MultilingualContent,
  MultilingualArray
} from '@/lib/multilingual';
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi';

interface MultilingualInputProps {
  value: MultilingualContent | MultilingualArray;
  onChange: (value: MultilingualContent | MultilingualArray) => void;
  type?: 'text' | 'textarea' | 'array';
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const MultilingualInput: React.FC<MultilingualInputProps> = ({
  value,
  onChange,
  type = 'text',
  label,
  placeholder,
  required = false,
  rows = 3,
  className = ''
}) => {
  const { currentLanguage } = useLanguage();
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>(currentLanguage.code as SupportedLanguage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localValue, setLocalValue] = useState<string | string[]>(() => {
    if (type === 'array') {
      return getLocalizedArray(value as MultilingualArray, activeLanguage);
    }
    return getLocalizedString(value as MultilingualContent, activeLanguage);
  });

  useEffect(() => {
    if (type === 'array') {
      setLocalValue(getLocalizedArray(value as MultilingualArray, activeLanguage));
    } else {
      setLocalValue(getLocalizedString(value as MultilingualContent, activeLanguage));
    }
  }, [value, activeLanguage, type]);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setActiveLanguage(language);
    setIsDropdownOpen(false);
  };

  const handleValueChange = (newValue: string | string[]) => {
    setLocalValue(newValue);
    
    if (type === 'array') {
      const currentArray = value as MultilingualArray;
      const updatedArray = {
        ...currentArray,
        [activeLanguage]: newValue as string[]
      };
      onChange(createMultilingualArray(updatedArray, activeLanguage));
    } else {
      const currentContent = value as MultilingualContent;
      const updatedContent = {
        ...currentContent,
        [activeLanguage]: newValue as string
      };
      onChange(createMultilingualContent(updatedContent, activeLanguage));
    }
  };

  const handleArrayItemAdd = () => {
    if (type === 'array') {
      const currentArray = localValue as string[];
      handleValueChange([...currentArray, '']);
    }
  };

  const handleArrayItemChange = (index: number, itemValue: string) => {
    if (type === 'array') {
      const currentArray = localValue as string[];
      const updatedArray = [...currentArray];
      updatedArray[index] = itemValue;
      handleValueChange(updatedArray);
    }
  };

  const handleArrayItemRemove = (index: number) => {
    if (type === 'array') {
      const currentArray = localValue as string[];
      const updatedArray = currentArray.filter((_, i) => i !== index);
      handleValueChange(updatedArray);
    }
  };

  const getAvailableLanguages = () => {
    return SUPPORTED_LANGUAGES.filter(lang => {
      if (type === 'array') {
        const arrayValue = value as MultilingualArray;
        return arrayValue[lang] && arrayValue[lang].length > 0;
      } else {
        const contentValue = value as MultilingualContent;
        return contentValue[lang] && contentValue[lang].trim() !== '';
      }
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiGlobe className="w-4 h-4" />
              <span>{getLanguageFlag(activeLanguage)}</span>
              <span>{getLanguageDisplayName(activeLanguage)}</span>
              <FiChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {SUPPORTED_LANGUAGES.map(lang => {
                    const isActive = lang === activeLanguage;
                    const hasContent = getAvailableLanguages().includes(lang);
                    
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
                          isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{getLanguageFlag(lang)}</span>
                          <span>{getLanguageDisplayName(lang)}</span>
                        </div>
                        {hasContent && <FiCheck className="w-4 h-4 text-green-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Field */}
      {type === 'text' && (
        <input
          type="text"
          value={localValue as string}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {type === 'textarea' && (
        <textarea
          value={localValue as string}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {type === 'array' && (
        <div className="space-y-2">
          {(localValue as string[]).map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayItemChange(index, e.target.value)}
                placeholder={`${placeholder} ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleArrayItemRemove(index)}
                className="px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleArrayItemAdd}
            className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Item
          </button>
        </div>
      )}

      {/* Language Status */}
      <div className="flex flex-wrap gap-1">
        {getAvailableLanguages().map(lang => (
          <span
            key={lang}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              lang === activeLanguage
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {getLanguageFlag(lang)} {lang.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultilingualInput;


