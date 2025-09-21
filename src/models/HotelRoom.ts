import mongoose, { Document, Schema } from 'mongoose';

export interface IHotelRoom extends Document {
  title: string;
  description: string;
  details: string;
  tags: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
  type: mongoose.Types.ObjectId;
  hotel: mongoose.Types.ObjectId;
  price: number;
  actualPrice?: number;
  propertyType?: string;
  bedNumbers: number;
  bathroomNumbers: number;
  maxOccupancy: number;
  images: string[];
  amenities: string[];
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const HotelRoomSchema = new Schema<IHotelRoom>({
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
  details: {
    type: String,
    required: true,
    trim: true
  },
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
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
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
  propertyType: {
    type: String,
    trim: true
  },
  bedNumbers: {
    type: Number,
    required: true,
    min: 0
  },
  bathroomNumbers: {
    type: Number,
    required: true,
    min: 0
  },
  maxOccupancy: {
    type: Number,
    required: true,
    min: 1
  },
  images: [{
    type: String,
    trim: true
  }],
  amenities: [{
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
HotelRoomSchema.index({ hotel: 1, isActive: 1 });
HotelRoomSchema.index({ category: 1, isActive: 1 });
HotelRoomSchema.index({ isFeatured: 1, isActive: 1 });
HotelRoomSchema.index({ price: 1, isActive: 1 });

export default mongoose.models.HotelRoom || mongoose.model<IHotelRoom>('HotelRoom', HotelRoomSchema);



