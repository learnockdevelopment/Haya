const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User schema for migration
const userSchema = new mongoose.Schema({
  name: String,
  fullName: String,
  userName: String,
  email: String,
  password: String,
  role: String,
  avatar: String,
  phone: String,
  dateOfBirth: Date,
  bio: String,
  location: String,
  website: String,
  deviceId: String,
  deviceType: String,
  deviceToken: String,
  platform: String,
  appVersion: String,
  lastLogin: Date,
  lastLogout: Date,
  isActive: Boolean,
  preferences: {
    theme: String,
    language: String,
    notifications: {
      push: Boolean,
      email: Boolean,
      inApp: Boolean,
    },
  },
  notificationSettings: {
    push: Boolean,
    email: Boolean,
    inApp: Boolean,
  },
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model('User', userSchema);

const migrateUsers = async () => {
  try {
    console.log('Starting user schema migration...');
    
    // Find all users that have the old 'name' field but not 'fullName' or 'userName'
    const usersToMigrate = await User.find({
      name: { $exists: true },
      $or: [
        { fullName: { $exists: false } },
        { userName: { $exists: false } }
      ]
    });

    console.log(`Found ${usersToMigrate.length} users to migrate`);

    for (const user of usersToMigrate) {
      const updates = {};
      
      // Migrate name to fullName
      if (user.name && !user.fullName) {
        updates.fullName = user.name;
      }
      
      // Generate userName from email if not exists
      if (!user.userName) {
        const emailPrefix = user.email.split('@')[0];
        // Clean the email prefix to make it a valid username
        const cleanUserName = emailPrefix.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
        // Ensure it's at least 3 characters
        const userName = cleanUserName.length >= 3 ? cleanUserName : cleanUserName + '123';
        
        // Check if this username is already taken
        let finalUserName = userName;
        let counter = 1;
        while (await User.findOne({ userName: finalUserName })) {
          finalUserName = userName + counter;
          counter++;
        }
        
        updates.userName = finalUserName;
      }
      
      // Update the user
      if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(user._id, updates);
        console.log(`Migrated user: ${user.email} -> fullName: ${updates.fullName}, userName: ${updates.userName}`);
      }
    }
    
    console.log('Migration completed successfully!');
    
    // Show final stats
    const totalUsers = await User.countDocuments();
    const migratedUsers = await User.countDocuments({ fullName: { $exists: true }, userName: { $exists: true } });
    console.log(`Total users: ${totalUsers}, Migrated users: ${migratedUsers}`);
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run migration
connectDB().then(() => {
  migrateUsers();
});



