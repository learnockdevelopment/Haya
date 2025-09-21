import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
  entityType: 'tour' | 'flight' | 'hotel' | 'visa' | 'room';
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  image: {
    type: String,
    trim: true
  },
  entityType: {
    type: String,
    required: true,
    enum: ['tour', 'flight', 'hotel', 'visa', 'room']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
CategorySchema.index({ entityType: 1, isActive: 1 });
CategorySchema.index({ title: 1, entityType: 1 }, { unique: true });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);



