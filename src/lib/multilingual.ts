import { MultilingualContent, MultilingualArray } from '@/models/Tour';

// Supported languages
export const SUPPORTED_LANGUAGES = ['en', 'ar', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Language fallback order
const LANGUAGE_FALLBACK_ORDER: SupportedLanguage[] = ['en', 'ar', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi'];

/**
 * Get content in the specified language with fallback
 */
export function getLocalizedContent<T extends MultilingualContent | MultilingualArray>(
  content: T,
  language: SupportedLanguage,
  fallbackLanguage: SupportedLanguage = 'en'
): string | string[] {
  if (!content) return fallbackLanguage === 'en' ? '' : [];

  // Try requested language first
  if (content[language]) {
    return content[language] as string | string[];
  }

  // Try fallback language
  if (content[fallbackLanguage]) {
    return content[fallbackLanguage] as string | string[];
  }

  // Try other languages in fallback order
  for (const lang of LANGUAGE_FALLBACK_ORDER) {
    if (content[lang]) {
      return content[lang] as string | string[];
    }
  }

  // Return empty value if nothing found
  return fallbackLanguage === 'en' ? '' : [];
}

/**
 * Get localized string content
 */
export function getLocalizedString(
  content: MultilingualContent,
  language: SupportedLanguage,
  fallbackLanguage: SupportedLanguage = 'en'
): string {
  return getLocalizedContent(content, language, fallbackLanguage) as string;
}

/**
 * Get localized array content
 */
export function getLocalizedArray(
  content: MultilingualArray,
  language: SupportedLanguage,
  fallbackLanguage: SupportedLanguage = 'en'
): string[] {
  return getLocalizedContent(content, language, fallbackLanguage) as string[];
}

/**
 * Check if content is available in a specific language
 */
export function hasLanguageContent<T extends MultilingualContent | MultilingualArray>(
  content: T,
  language: SupportedLanguage
): boolean {
  return !!(content && content[language]);
}

/**
 * Get all available languages for content
 */
export function getAvailableLanguages<T extends MultilingualContent | MultilingualArray>(
  content: T
): SupportedLanguage[] {
  if (!content) return [];
  
  return SUPPORTED_LANGUAGES.filter(lang => 
    content[lang] && 
    (Array.isArray(content[lang]) ? (content[lang] as string[]).length > 0 : (content[lang] as string).trim() !== '')
  );
}

/**
 * Create multilingual content object
 */
export function createMultilingualContent(
  content: Record<string, string>,
  defaultLanguage: SupportedLanguage = 'en'
): MultilingualContent {
  const result: Partial<MultilingualContent> = {};
  
  for (const [lang, value] of Object.entries(content)) {
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      result[lang as SupportedLanguage] = value;
    }
  }
  
  return result as MultilingualContent;
}

/**
 * Create multilingual array object
 */
export function createMultilingualArray(
  content: Record<string, string[]>,
  defaultLanguage: SupportedLanguage = 'en'
): MultilingualArray {
  const result: Partial<MultilingualArray> = {};
  
  for (const [lang, value] of Object.entries(content)) {
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      result[lang as SupportedLanguage] = value;
    }
  }
  
  return result as MultilingualArray;
}

/**
 * Validate multilingual content
 */
export function validateMultilingualContent(
  content: MultilingualContent,
  requiredLanguages: SupportedLanguage[] = ['en', 'ar']
): { isValid: boolean; missingLanguages: SupportedLanguage[] } {
  const missingLanguages: SupportedLanguage[] = [];
  
  for (const lang of requiredLanguages) {
    if (!content[lang] || content[lang].trim() === '') {
      missingLanguages.push(lang);
    }
  }
  
  return {
    isValid: missingLanguages.length === 0,
    missingLanguages
  };
}

/**
 * Get language display name
 */
export function getLanguageDisplayName(language: SupportedLanguage): string {
  const names: Record<SupportedLanguage, string> = {
    en: 'English',
    ar: 'العربية',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    zh: '中文',
    ja: '日本語',
    ko: '한국어',
    hi: 'हिन्दी'
  };
  
  return names[language] || language;
}

/**
 * Get language flag emoji
 */
export function getLanguageFlag(language: SupportedLanguage): string {
  const flags: Record<SupportedLanguage, string> = {
    en: '🇺🇸',
    ar: '🇸🇦',
    fr: '🇫🇷',
    es: '🇪🇸',
    de: '🇩🇪',
    it: '🇮🇹',
    pt: '🇵🇹',
    ru: '🇷🇺',
    zh: '🇨🇳',
    ja: '🇯🇵',
    ko: '🇰🇷',
    hi: '🇮🇳'
  };
  
  return flags[language] || '🌐';
}



