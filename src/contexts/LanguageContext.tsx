'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, supportedLanguages, getLanguageByCode, detectBrowserLanguage, Language } from '@/lib/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  supportedLanguages: Language[];
  currentLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && getLanguageByCode(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const detectedLang = detectBrowserLanguage();
      setLanguageState(detectedLang.code);
    }
  }, []);

  const setLanguage = (lang: string) => {
    const languageObj = getLanguageByCode(lang);
    if (languageObj) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
      // Update document direction and language
      document.documentElement.lang = lang;
      document.documentElement.dir = languageObj.rtl ? 'rtl' : 'ltr';
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    // Get the current language translations
    const currentTranslations = translations[language as keyof typeof translations] || translations.en;
    
    // Get the translation, fallback to key if not found
    let translation = (currentTranslations as any)[key] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return translation;
  };

  const currentLanguage = getLanguageByCode(language) || supportedLanguages[0];
  const isRTL = currentLanguage.rtl;

  // Update document attributes when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL,
    supportedLanguages,
    currentLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
