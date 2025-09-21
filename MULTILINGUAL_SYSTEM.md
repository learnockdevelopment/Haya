# 🌍 Multilingual Content System

This document describes the comprehensive multilingual content system implemented for the Haya Travel platform.

## 📋 Overview

The multilingual system allows content to be managed in multiple languages with:
- **12 supported languages**: English, Arabic, French, Spanish, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Hindi
- **Fallback system**: Automatic fallback to English or Arabic if content is not available in the requested language
- **Admin controls**: Enable/disable translation features and manage language settings
- **Type safety**: Full TypeScript support for multilingual content

## 🏗️ Architecture

### Database Models

All content models now support multilingual fields:

```typescript
interface MultilingualContent {
  en: string;    // Required
  ar: string;    // Required
  fr?: string;   // Optional
  es?: string;   // Optional
  de?: string;   // Optional
  it?: string;   // Optional
  pt?: string;   // Optional
  ru?: string;   // Optional
  zh?: string;   // Optional
  ja?: string;   // Optional
  ko?: string;   // Optional
  hi?: string;   // Optional
}

interface MultilingualArray {
  en: string[];
  ar: string[];
  fr?: string[];
  // ... other languages
}
```

### Supported Models

- **Tours**: `title`, `description`, `shortDescription`, `highlights`, `inclusions`, `exclusions`, `itinerary`
- **Categories**: `title`, `description`, `shortDescription`
- **Types**: `title`, `description`, `shortDescription`
- **Regions**: `name`, `country`, `city`, `description`

## 🛠️ Components

### 1. MultilingualInput Component

A comprehensive input component for managing multilingual content:

```tsx
import MultilingualInput from '@/components/admin/MultilingualInput';

<MultilingualInput
  value={multilingualContent}
  onChange={handleChange}
  type="text" // or "textarea" or "array"
  label="Title"
  required
/>
```

**Features:**
- Language selector dropdown
- Visual indicators for available languages
- Support for text, textarea, and array inputs
- Real-time validation

### 2. TranslationSettings Component

Admin interface for managing translation settings:

```tsx
import TranslationSettings from '@/components/admin/TranslationSettings';

<TranslationSettings />
```

**Features:**
- Enable/disable multilingual content
- Select default language
- Choose enabled languages
- Configure auto-translation
- Set up translation providers

## 🔧 Utilities

### Multilingual Helper Functions

```typescript
import { 
  getLocalizedString, 
  getLocalizedArray,
  createMultilingualContent,
  createMultilingualArray,
  hasLanguageContent,
  getAvailableLanguages
} from '@/lib/multilingual';

// Get content in current language
const title = getLocalizedString(content, 'en');

// Get array content
const highlights = getLocalizedArray(content, 'en');

// Create multilingual content
const newContent = createMultilingualContent({
  en: 'English text',
  ar: 'النص العربي'
});

// Check if content exists in language
const hasArabic = hasLanguageContent(content, 'ar');

// Get all available languages
const languages = getAvailableLanguages(content);
```

### React Hook

```typescript
import { useMultilingual } from '@/hooks/useMultilingual';

function MyComponent() {
  const { getText, getArray, currentLanguage } = useMultilingual();
  
  const title = getText(tour.title);
  const highlights = getArray(tour.highlights);
  
  return <div>{title}</div>;
}
```

## 🎛️ Admin Panel Features

### Translation Settings

Access via: **Admin Panel → Settings → Translation Settings**

**Configuration Options:**
- ✅ **Enable Multilingual Content**: Toggle translation features
- 🌍 **Default Language**: Set primary language (English/Arabic)
- 🔧 **Enabled Languages**: Choose which languages to support
- 🤖 **Auto Translate**: Enable automatic translation
- 🔌 **Translation Provider**: Choose translation service (Manual/Google/Azure/OpenAI)

### Multilingual Content Management

**Tour Creation:**
- **Standard**: `/admin/tours/new` - Basic tour creation
- **Multilingual**: `/admin/tours/new-multilingual` - Full multilingual support

**Content Management:**
- All admin pages support multilingual content
- Language-specific editing
- Visual indicators for missing translations
- Bulk translation tools

## 📊 Database Migration

### Running the Migration

```bash
# Run the migration script
node scripts/migrate-to-multilingual.js
```

**What it does:**
- Preserves existing data
- Creates multilingual fields
- Copies existing content to English/Arabic fields
- Sets up translation settings

### Migration Safety

- ✅ **Non-destructive**: Original fields are preserved
- ✅ **Rollback safe**: Can revert to original structure
- ✅ **Data integrity**: All existing data is maintained
- ✅ **Progressive**: Can run multiple times safely

## 🌐 Frontend Integration

### Displaying Multilingual Content

```tsx
import { useMultilingual } from '@/hooks/useMultilingual';

function TourCard({ tour }) {
  const { getText, getArray } = useMultilingual();
  
  return (
    <div>
      <h3>{getText(tour.title)}</h3>
      <p>{getText(tour.shortDescription)}</p>
      <ul>
        {getArray(tour.highlights).map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Language Switching

The system automatically uses the current language from `LanguageContext`:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageSwitcher() {
  const { setLanguage, currentLanguage } = useLanguage();
  
  return (
    <select value={currentLanguage} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="ar">العربية</option>
      <option value="fr">Français</option>
      {/* ... other languages */}
    </select>
  );
}
```

## 🔄 API Integration

### Creating Multilingual Content

```typescript
// POST /api/admin/tours
{
  "title": {
    "en": "Amazing Paris Tour",
    "ar": "جولة باريس الرائعة",
    "fr": "Visite Incroyable de Paris"
  },
  "description": {
    "en": "Discover the beauty of Paris...",
    "ar": "اكتشف جمال باريس...",
    "fr": "Découvrez la beauté de Paris..."
  },
  "isTranslatable": true,
  "defaultLanguage": "en"
}
```

### Retrieving Content

The API automatically returns content in the requested language:

```typescript
// GET /api/tours?lang=ar
{
  "title": "جولة باريس الرائعة",
  "description": "اكتشف جمال باريس...",
  // ... other fields in Arabic
}
```

## 🎯 Best Practices

### Content Management

1. **Always provide English and Arabic** - These are required languages
2. **Use consistent terminology** - Maintain translation consistency
3. **Validate content** - Check for missing translations
4. **Test all languages** - Ensure content displays correctly

### Performance

1. **Lazy load translations** - Load only needed languages
2. **Cache translations** - Store frequently used content
3. **Optimize queries** - Use efficient database queries
4. **Minimize API calls** - Batch translation requests

### User Experience

1. **Clear language indicators** - Show current language clearly
2. **Smooth transitions** - Animate language changes
3. **Fallback handling** - Gracefully handle missing content
4. **RTL support** - Proper right-to-left layout for Arabic

## 🚀 Future Enhancements

### Planned Features

- **Auto-translation integration** - Google Translate, Azure Translator
- **Translation management** - Professional translation workflow
- **Content versioning** - Track translation changes
- **Bulk operations** - Mass translate/update content
- **Translation analytics** - Usage statistics and insights

### Advanced Features

- **AI-powered translations** - OpenAI integration
- **Translation memory** - Reuse existing translations
- **Quality assurance** - Translation validation tools
- **Collaborative editing** - Multi-user translation workflow

## 📚 Examples

### Complete Tour Creation

```tsx
const tourData = {
  title: createMultilingualContent({
    en: "Amazing Paris Adventure",
    ar: "مغامرة باريس المذهلة",
    fr: "Aventure Incroyable de Paris"
  }),
  description: createMultilingualContent({
    en: "Experience the magic of Paris with our guided tour...",
    ar: "استمتع بسحر باريس مع جولتنا المرشدة...",
    fr: "Découvrez la magie de Paris avec notre visite guidée..."
  }),
  highlights: createMultilingualArray({
    en: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
    ar: ["برج إيفل", "متحف اللوفر", "رحلة نهر السين"],
    fr: ["Tour Eiffel", "Musée du Louvre", "Croisière sur la Seine"]
  }),
  isTranslatable: true,
  defaultLanguage: "en"
};
```

### Displaying Content

```tsx
function TourDisplay({ tour }) {
  const { getText, getArray } = useMultilingual();
  
  return (
    <div className="tour-card">
      <h2>{getText(tour.title)}</h2>
      <p>{getText(tour.description)}</p>
      <h3>Highlights:</h3>
      <ul>
        {getArray(tour.highlights).map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🛡️ Security & Validation

### Content Validation

- **Required languages**: English and Arabic must be provided
- **Content length**: Respects character limits per language
- **HTML sanitization**: Prevents XSS attacks
- **Input validation**: Validates all multilingual inputs

### Access Control

- **Admin only**: Translation settings require admin access
- **Role-based**: Different permissions for different languages
- **Audit trail**: Track who made translation changes
- **Backup system**: Regular backups of translation data

---

## 📞 Support

For questions or issues with the multilingual system:

1. Check this documentation
2. Review the code examples
3. Test with the migration script
4. Contact the development team

The multilingual system is designed to be robust, scalable, and user-friendly. It provides a solid foundation for building truly international travel platforms! 🌍✈️



