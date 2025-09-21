import mongoose, { Document, Schema } from 'mongoose';

export interface IVisa extends Document {
  title: string;
  description: string;
  shortDescription: string;
  details: string;
  price: number;
  actualPrice?: number;
  images: string[];
  tags: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
  type: mongoose.Types.ObjectId;
  region: mongoose.Types.ObjectId;
  processingTime: string;
  validityPeriod: string;
  requirements: string[];
  documents: string[];
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const VisaSchema = new Schema<IVisa>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  details: {
    type: String,
    required: true,
    trim: true
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
  images: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
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
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },
  processingTime: {
    type: String,
    required: true,
    trim: true
  },
  validityPeriod: {
    type: String,
    required: true,
    trim: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  documents: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
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
  }
}, {
  timestamps: true
});

// Indexes
VisaSchema.index({ category: 1, isActive: 1 });
VisaSchema.index({ region: 1, isActive: 1 });
VisaSchema.index({ isFeatured: 1, isActive: 1 });
VisaSchema.index({ price: 1, isActive: 1 });

export default mongoose.models.Visa || mongoose.model<IVisa>('Visa', VisaSchema);



