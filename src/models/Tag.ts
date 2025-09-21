import mongoose, { Document, Schema } from 'mongoose';

export interface ITag extends Document {
  title: string;
  description?: string;
  color?: string;
  entityType: 'tour' | 'flight' | 'hotel' | 'visa' | 'room';
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema<ITag>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  },
  color: {
    type: String,
    trim: true,
    default: '#3B82F6'
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
TagSchema.index({ entityType: 1, isActive: 1 });
TagSchema.index({ title: 1, entityType: 1 }, { unique: true });

export default mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema);



