import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  title: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  summary?: {
    en?: string;
    ar?: string;
  };
  category: string;
  tags: string[];
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  isOfflineAvailable: boolean;
  featured: boolean;
  views: number;
  likes: number;
  comments: Array<{
    user: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }>;
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    title: {
      en: {
        type: String,
        required: [true, 'Please provide a title in English'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
      },
      ar: {
        type: String,
        required: [true, 'Please provide a title in Arabic'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
      },
    },
    content: {
      en: {
        type: String,
        required: [true, 'Please provide content in English'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide content in Arabic'],
        trim: true,
      },
    },
    summary: {
      en: {
        type: String,
        trim: true,
        maxlength: [500, 'Summary cannot be more than 500 characters'],
      },
      ar: {
        type: String,
        trim: true,
        maxlength: [500, 'Summary cannot be more than 500 characters'],
      },
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isOfflineAvailable: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    images: [
      {
        url: String,
        alt: String,
        caption: String,
      },
    ],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
contentSchema.index({ category: 1 });
contentSchema.index({ isPublished: 1 });
contentSchema.index({ featured: 1 });
contentSchema.index({ author: 1 });
contentSchema.index({ 'title.en': 'text', 'title.ar': 'text', 'content.en': 'text', 'content.ar': 'text' });

export default mongoose.models.Content || mongoose.model<IContent>('Content', contentSchema);
