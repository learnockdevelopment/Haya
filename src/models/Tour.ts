import mongoose, { Document, Schema } from 'mongoose';

// Multilingual content interface
export interface MultilingualContent {
  en: string;
  ar: string;
  fr?: string;
  es?: string;
  de?: string;
  it?: string;
  pt?: string;
  ru?: string;
  zh?: string;
  ja?: string;
  ko?: string;
  hi?: string;
}

// Multilingual array interface
export interface MultilingualArray {
  en: string[];
  ar: string[];
  fr?: string[];
  es?: string[];
  de?: string[];
  it?: string[];
  pt?: string[];
  ru?: string[];
  zh?: string[];
  ja?: string[];
  ko?: string[];
  hi?: string[];
}

// Itinerary item interface
export interface ItineraryItem {
  day: number;
  title: MultilingualContent;
  description: MultilingualContent;
  activities: MultilingualArray;
}

export interface ITour extends Document {
  // Multilingual fields
  title: MultilingualContent;
  slug: string;
  description: MultilingualContent;
  shortDescription: MultilingualContent;
  
  // References
  category: mongoose.Types.ObjectId;
  type: mongoose.Types.ObjectId;
  source: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  
  // Pricing
  price: number;
  actualPrice?: number;
  
  // Arrays
  tags: mongoose.Types.ObjectId[];
  images: string[];
  reviews: mongoose.Types.ObjectId[];
  
  // Dates
  departureDate: Date;
  returnDate: Date;
  
  // Status
  isActive: boolean;
  isFeatured: boolean;
  
  // Tour details
  maxGroupSize: number;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'expert';
  
  // Multilingual arrays
  highlights: MultilingualArray;
  inclusions: MultilingualArray;
  exclusions: MultilingualArray;
  itinerary: ItineraryItem[];
  
  // Ratings
  ratings: {
    average: number;
    count: number;
  };
  
  // Translation settings
  isTranslatable: boolean;
  defaultLanguage: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema = new Schema<ITour>({
  title: {
    en: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    ar: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200
    },
    fr: { type: String, trim: true, maxlength: 200 },
    es: { type: String, trim: true, maxlength: 200 },
    de: { type: String, trim: true, maxlength: 200 },
    it: { type: String, trim: true, maxlength: 200 },
    pt: { type: String, trim: true, maxlength: 200 },
    ru: { type: String, trim: true, maxlength: 200 },
    zh: { type: String, trim: true, maxlength: 200 },
    ja: { type: String, trim: true, maxlength: 200 },
    ko: { type: String, trim: true, maxlength: 200 },
    hi: { type: String, trim: true, maxlength: 200 }
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  description: {
    en: {
      type: String,
      required: true,
      trim: true
    },
    ar: {
      type: String,
      required: false,
      trim: true
    },
    fr: { type: String, trim: true },
    es: { type: String, trim: true },
    de: { type: String, trim: true },
    it: { type: String, trim: true },
    pt: { type: String, trim: true },
    ru: { type: String, trim: true },
    zh: { type: String, trim: true },
    ja: { type: String, trim: true },
    ko: { type: String, trim: true },
    hi: { type: String, trim: true }
  },
  shortDescription: {
    en: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    ar: {
      type: String,
      required: false,
      trim: true,
      maxlength: 300
    },
    fr: { type: String, trim: true, maxlength: 300 },
    es: { type: String, trim: true, maxlength: 300 },
    de: { type: String, trim: true, maxlength: 300 },
    it: { type: String, trim: true, maxlength: 300 },
    pt: { type: String, trim: true, maxlength: 300 },
    ru: { type: String, trim: true, maxlength: 300 },
    zh: { type: String, trim: true, maxlength: 300 },
    ja: { type: String, trim: true, maxlength: 300 },
    ko: { type: String, trim: true, maxlength: 300 },
    hi: { type: String, trim: true, maxlength: 300 }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
    required: true
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  actualPrice: {
    type: Number,
    min: 0
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  images: [{
    type: String,
    trim: true
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: 1
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'moderate', 'challenging', 'expert']
  },
  highlights: {
    en: [{ type: String, trim: true }],
    ar: [{ type: String, trim: true }],
    fr: [{ type: String, trim: true }],
    es: [{ type: String, trim: true }],
    de: [{ type: String, trim: true }],
    it: [{ type: String, trim: true }],
    pt: [{ type: String, trim: true }],
    ru: [{ type: String, trim: true }],
    zh: [{ type: String, trim: true }],
    ja: [{ type: String, trim: true }],
    ko: [{ type: String, trim: true }],
    hi: [{ type: String, trim: true }]
  },
  inclusions: {
    en: [{ type: String, trim: true }],
    ar: [{ type: String, trim: true }],
    fr: [{ type: String, trim: true }],
    es: [{ type: String, trim: true }],
    de: [{ type: String, trim: true }],
    it: [{ type: String, trim: true }],
    pt: [{ type: String, trim: true }],
    ru: [{ type: String, trim: true }],
    zh: [{ type: String, trim: true }],
    ja: [{ type: String, trim: true }],
    ko: [{ type: String, trim: true }],
    hi: [{ type: String, trim: true }]
  },
  exclusions: {
    en: [{ type: String, trim: true }],
    ar: [{ type: String, trim: true }],
    fr: [{ type: String, trim: true }],
    es: [{ type: String, trim: true }],
    de: [{ type: String, trim: true }],
    it: [{ type: String, trim: true }],
    pt: [{ type: String, trim: true }],
    ru: [{ type: String, trim: true }],
    zh: [{ type: String, trim: true }],
    ja: [{ type: String, trim: true }],
    ko: [{ type: String, trim: true }],
    hi: [{ type: String, trim: true }]
  },
  itinerary: [{
    day: {
      type: Number,
      required: true
    },
    title: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      fr: { type: String, trim: true },
      es: { type: String, trim: true },
      de: { type: String, trim: true },
      it: { type: String, trim: true },
      pt: { type: String, trim: true },
      ru: { type: String, trim: true },
      zh: { type: String, trim: true },
      ja: { type: String, trim: true },
      ko: { type: String, trim: true },
      hi: { type: String, trim: true }
    },
    description: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      fr: { type: String, trim: true },
      es: { type: String, trim: true },
      de: { type: String, trim: true },
      it: { type: String, trim: true },
      pt: { type: String, trim: true },
      ru: { type: String, trim: true },
      zh: { type: String, trim: true },
      ja: { type: String, trim: true },
      ko: { type: String, trim: true },
      hi: { type: String, trim: true }
    },
    activities: {
      en: [{ type: String, trim: true }],
      ar: [{ type: String, trim: true }],
      fr: [{ type: String, trim: true }],
      es: [{ type: String, trim: true }],
      de: [{ type: String, trim: true }],
      it: [{ type: String, trim: true }],
      pt: [{ type: String, trim: true }],
      ru: [{ type: String, trim: true }],
      zh: [{ type: String, trim: true }],
      ja: [{ type: String, trim: true }],
      ko: [{ type: String, trim: true }],
      hi: [{ type: String, trim: true }]
    }
  }],
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  // Translation settings
  isTranslatable: {
    type: Boolean,
    default: true
  },
  defaultLanguage: {
    type: String,
    default: 'en',
    enum: ['en', 'ar', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi']
  }
}, {
  timestamps: true
});

// Indexes
TourSchema.index({ category: 1, isActive: 1 });
TourSchema.index({ destination: 1, isActive: 1 });
TourSchema.index({ isFeatured: 1, isActive: 1 });
TourSchema.index({ departureDate: 1, isActive: 1 });
TourSchema.index({ price: 1, isActive: 1 });

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);