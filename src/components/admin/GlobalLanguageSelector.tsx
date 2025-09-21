'use client';

import React, { useState, useEffect } from 'react';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

interface Language {
  _id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  isDefault: boolean;
}

interface GlobalLanguageSelectorProps {
  onLanguageChange: (language: Language) => void;
  className?: string;
}

const GlobalLanguageSelector: React.FC<GlobalLanguageSelectorProps> = ({
  onLanguageChange,
  className = ''
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/admin/languages');
      const data = await response.json();
      
      if (data.success) {
        setLanguages(data.data.languages);
        // Set default language
        const defaultLang = data.data.languages.find((lang: Language) => lang.isDefault) || data.data.languages[0];
        if (defaultLang) {
          setSelectedLanguage(defaultLang);
          onLanguageChange(defaultLang);
        }
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 ${className}`}>
        <FiGlobe className="w-4 h-4" />
        <span className="text-sm text-gray-500">Loading languages...</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <FiGlobe className="w-4 h-4" />
        {selectedLanguage && (
          <>
            <span>{selectedLanguage.flag}</span>
            <span>{selectedLanguage.nativeName}</span>
          </>
        )}
        <FiChevronDown className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language._id}
              type="button"
              onClick={() => handleLanguageSelect(language)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 ${
                selectedLanguage?._id === language._id ? 'bg-primary-50 text-primary-700' : ''
              }`}
            >
              <span>{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-gray-500">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalLanguageSelector;

