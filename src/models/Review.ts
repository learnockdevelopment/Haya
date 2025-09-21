import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  entityType: 'tour' | 'flight' | 'hotel' | 'visa' | 'room';
  entityId: mongoose.Types.ObjectId;
  isVerified: boolean;
  helpfulVotes: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  author: {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    avatar: {
      type: String,
      trim: true
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  entityType: {
    type: String,
    required: true,
    enum: ['tour', 'flight', 'hotel', 'visa', 'room']
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'entityType'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  helpfulVotes: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes
ReviewSchema.index({ entityType: 1, entityId: 1 });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ isVerified: 1 });
ReviewSchema.index({ createdAt: -1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);



