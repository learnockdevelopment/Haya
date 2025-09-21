import mongoose, { Document, Schema } from 'mongoose';

export interface IFlight extends Document {
  title: string;
  description: string;
  shortDescription: string;
  category: mongoose.Types.ObjectId;
  source: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  price: number;
  actualPrice?: number;
  images: string[];
  departureDate: Date;
  returnDate?: Date;
  departureTime: string;
  arrivalTime: string;
  returnDepartureTime?: string;
  returnArrivalTime?: string;
  airline: string;
  flightNumber: string;
  returnFlightNumber?: string;
  aircraft: string;
  class: 'economy' | 'premium_economy' | 'business' | 'first';
  baggageAllowance: string;
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const FlightSchema = new Schema<IFlight>({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
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
  images: [{
    type: String,
    trim: true
  }],
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  returnDepartureTime: {
    type: String
  },
  returnArrivalTime: {
    type: String
  },
  airline: {
    type: String,
    required: true,
    trim: true
  },
  flightNumber: {
    type: String,
    required: true,
    trim: true
  },
  returnFlightNumber: {
    type: String,
    trim: true
  },
  aircraft: {
    type: String,
    trim: true
  },
  class: {
    type: String,
    required: true,
    enum: ['economy', 'premium_economy', 'business', 'first']
  },
  baggageAllowance: {
    type: String,
    required: true,
    trim: true
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
FlightSchema.index({ category: 1, isActive: 1 });
FlightSchema.index({ source: 1, destination: 1, isActive: 1 });
FlightSchema.index({ departureDate: 1, isActive: 1 });
FlightSchema.index({ isFeatured: 1, isActive: 1 });
FlightSchema.index({ price: 1, isActive: 1 });

export default mongoose.models.Flight || mongoose.model<IFlight>('Flight', FlightSchema);



