import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  email?: string;
  location: string;
  country: string;
  rating: number;
  title: string;
  content: string;
  tourId?: mongoose.Types.ObjectId;
  tourName?: string;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  isFeatured: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
  videoUrl?: string;
  response?: {
    content: string;
    respondedAt: Date;
    respondedBy: mongoose.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location cannot be more than 100 characters'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      maxlength: [50, 'Country cannot be more than 50 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxlength: [1000, 'Content cannot be more than 1000 characters'],
    },
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
    tourName: {
      type: String,
      trim: true,
      maxlength: [100, 'Tour name cannot be more than 100 characters'],
    },
    avatar: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
      min: [0, 'Helpful count cannot be negative'],
    },
    notHelpful: {
      type: Number,
      default: 0,
      min: [0, 'Not helpful count cannot be negative'],
    },
    images: [{
      type: String,
      trim: true,
    }],
    videoUrl: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+/,
        'Please provide a valid video URL',
      ],
    },
    response: {
      content: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, 'Response cannot be more than 500 characters'],
      },
      respondedAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
      respondedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
testimonialSchema.index({ isActive: 1, isFeatured: 1 });
testimonialSchema.index({ rating: -1 });
testimonialSchema.index({ tourId: 1 });
testimonialSchema.index({ createdAt: -1 });
testimonialSchema.index({ country: 1 });

// Virtual for helpful percentage
testimonialSchema.virtual('helpfulPercentage').get(function() {
  const total = this.helpful + this.notHelpful;
  if (total === 0) return 0;
  return Math.round((this.helpful / total) * 100);
});

// Ensure virtual fields are serialized
testimonialSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', testimonialSchema);



