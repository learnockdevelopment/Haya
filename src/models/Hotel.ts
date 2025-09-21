import mongoose, { Document, Schema } from 'mongoose';

export interface IHotel extends Document {
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  location: mongoose.Types.ObjectId;
  images: string[];
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  starRating: number;
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema = new Schema<IHotel>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
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
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },
  images: [{
    type: String,
    trim: true
  }],
  address: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  amenities: [{
    type: String,
    trim: true
  }],
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
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
HotelSchema.index({ location: 1, isActive: 1 });
HotelSchema.index({ isFeatured: 1, isActive: 1 });
HotelSchema.index({ starRating: 1, isActive: 1 });
HotelSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

export default mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);



