import mongoose, { Document, Schema } from 'mongoose';

export interface IRegion extends Document {
  name: string;
  country: string;
  countryCode: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const RegionSchema = new Schema<IRegion>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  countryCode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3,
    uppercase: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  image: {
    type: String,
    trim: true
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
RegionSchema.index({ country: 1, isActive: 1 });
RegionSchema.index({ name: 1, country: 1 }, { unique: true });

export default mongoose.models.Region || mongoose.model<IRegion>('Region', RegionSchema);



