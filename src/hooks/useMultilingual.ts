import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getLocalizedString, 
  getLocalizedArray, 
  SupportedLanguage,
  MultilingualContent,
  MultilingualArray
} from '@/lib/multilingual';

export function useMultilingual() {
  const { currentLanguage } = useLanguage();

  const getText = (content: MultilingualContent, fallbackLanguage: SupportedLanguage = 'en'): string => {
    return getLocalizedString(content, currentLanguage as SupportedLanguage, fallbackLanguage);
  };

  const getArray = (content: MultilingualArray, fallbackLanguage: SupportedLanguage = 'en'): string[] => {
    return getLocalizedArray(content, currentLanguage as SupportedLanguage, fallbackLanguage);
  };

  const getTextOrFallback = (content: MultilingualContent | string, fallbackLanguage: SupportedLanguage = 'en'): string => {
    if (typeof content === 'string') {
      return content;
    }
    return getLocalizedString(content, currentLanguage as SupportedLanguage, fallbackLanguage);
  };

  const getArrayOrFallback = (content: MultilingualArray | string[], fallbackLanguage: SupportedLanguage = 'en'): string[] => {
    if (Array.isArray(content)) {
      return content;
    }
    return getLocalizedArray(content, currentLanguage as SupportedLanguage, fallbackLanguage);
  };

  return {
    currentLanguage: currentLanguage as SupportedLanguage,
    getText,
    getArray,
    getTextOrFallback,
    getArrayOrFallback
  };
}



