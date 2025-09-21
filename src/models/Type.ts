import mongoose, { Document, Schema } from 'mongoose';

export interface IType extends Document {
  title: string;
  description: string;
  shortDescription: string;
  icon?: string;
  entityType: 'tour' | 'flight' | 'hotel' | 'visa' | 'room';
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TypeSchema = new Schema<IType>({
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
  icon: {
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
TypeSchema.index({ entityType: 1, isActive: 1 });
TypeSchema.index({ title: 1, entityType: 1 }, { unique: true });

export default mongoose.models.Type || mongoose.model<IType>('Type', TypeSchema);



