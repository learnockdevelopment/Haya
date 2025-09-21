import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  bio?: string;
  location?: string;
  website?: string;
  deviceId?: string;
  deviceType: 'web' | 'mobile' | 'tablet';
  deviceToken?: string;
  platform: 'ios' | 'android' | 'web';
  appVersion?: string;
  lastLogin?: Date;
  lastLogout?: Date;
  isActive: boolean;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: {
      push: boolean;
      email: boolean;
      inApp: boolean;
    };
  };
  notificationSettings: {
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [100, 'Full name cannot be more than 100 characters'],
    },
    userName: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot be more than 30 characters'],
      match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number'],
    },
    dateOfBirth: {
      type: Date,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot be more than 100 characters'],
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid website URL'],
    },
    deviceId: {
      type: String,
      default: null,
    },
    deviceType: {
      type: String,
      enum: ['web', 'mobile', 'tablet'],
      default: 'web',
    },
    deviceToken: {
      type: String,
      default: null,
    },
    platform: {
      type: String,
      enum: ['ios', 'android', 'web'],
      default: 'web',
    },
    appVersion: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    lastLogout: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'auto',
      },
      language: {
        type: String,
        default: 'en',
      },
      notifications: {
        push: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
        inApp: {
          type: Boolean,
          default: true,
        },
      },
    },
    notificationSettings: {
      push: {
        type: Boolean,
        default: true,
      },
      email: {
        type: Boolean,
        default: true,
      },
      inApp: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
// Note: email and userName indexes are automatically created by unique: true
userSchema.index({ deviceId: 1 });
userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
