import mongoose, { Document, Schema } from 'mongoose';

export interface ILanguage extends Document {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  isActive: boolean;
  isDefault: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const LanguageSchema = new Schema<ILanguage>({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 5
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  nativeName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  flag: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10
  },
  rtl: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
LanguageSchema.index({ code: 1 }, { unique: true });
LanguageSchema.index({ isActive: 1, sortOrder: 1 });

export default mongoose.models.Language || mongoose.model<ILanguage>('Language', LanguageSchema);

