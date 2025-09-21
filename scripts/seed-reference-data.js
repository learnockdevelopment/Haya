const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import models
const Category = require('../src/models/Category');
const Type = require('../src/models/Type');
const Tag = require('../src/models/Tag');
const Region = require('../src/models/Region');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/haya-travel');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedReferenceData = async () => {
  try {
    await connectDB();

    console.log('🌱 Seeding reference data...');

    // Seed Categories
    const categories = [
      { title: 'Adventure', description: 'Exciting adventure tours', shortDescription: 'Adventure tours', entityType: 'tour' },
      { title: 'Cultural', description: 'Cultural and heritage tours', shortDescription: 'Cultural tours', entityType: 'tour' },
      { title: 'Beach', description: 'Relaxing beach vacations', shortDescription: 'Beach tours', entityType: 'tour' },
      { title: 'Mountain', description: 'Mountain hiking and trekking', shortDescription: 'Mountain tours', entityType: 'tour' },
      { title: 'City', description: 'Urban city exploration', shortDescription: 'City tours', entityType: 'tour' },
      { title: 'Wildlife', description: 'Wildlife and nature tours', shortDescription: 'Wildlife tours', entityType: 'tour' },
    ];

    for (const cat of categories) {
      await Category.findOneAndUpdate(
        { title: cat.title, entityType: cat.entityType },
        cat,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Categories seeded');

    // Seed Types
    const types = [
      { title: 'Domestic', description: 'Domestic tours within the country', shortDescription: 'Domestic tours', entityType: 'tour' },
      { title: 'International', description: 'International tours abroad', shortDescription: 'International tours', entityType: 'tour' },
      { title: 'Local', description: 'Local day trips and excursions', shortDescription: 'Local tours', entityType: 'tour' },
    ];

    for (const type of types) {
      await Type.findOneAndUpdate(
        { title: type.title, entityType: type.entityType },
        type,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Types seeded');

    // Seed Tags
    const tags = [
      { title: 'Family Friendly', description: 'Suitable for families', entityType: 'tour', color: '#10B981' },
      { title: 'Budget', description: 'Budget-friendly options', entityType: 'tour', color: '#F59E0B' },
      { title: 'Luxury', description: 'Luxury experiences', entityType: 'tour', color: '#8B5CF6' },
      { title: 'Photography', description: 'Great for photography', entityType: 'tour', color: '#EC4899' },
      { title: 'Food & Wine', description: 'Culinary experiences', entityType: 'tour', color: '#EF4444' },
      { title: 'History', description: 'Historical sites and monuments', entityType: 'tour', color: '#6B7280' },
      { title: 'Nature', description: 'Natural landscapes and wildlife', entityType: 'tour', color: '#059669' },
      { title: 'Adventure', description: 'Thrilling activities', entityType: 'tour', color: '#DC2626' },
    ];

    for (const tag of tags) {
      await Tag.findOneAndUpdate(
        { title: tag.title, entityType: tag.entityType },
        tag,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Tags seeded');

    // Seed Regions
    const regions = [
      { name: 'Paris', country: 'France', countryCode: 'FRA', description: 'The City of Light' },
      { name: 'Rome', country: 'Italy', countryCode: 'ITA', description: 'The Eternal City' },
      { name: 'Tokyo', country: 'Japan', countryCode: 'JPN', description: 'Modern metropolis' },
      { name: 'New York', country: 'United States', countryCode: 'USA', description: 'The Big Apple' },
      { name: 'London', country: 'United Kingdom', countryCode: 'GBR', description: 'Historic capital' },
      { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'ARE', description: 'Modern luxury' },
      { name: 'Cairo', country: 'Egypt', countryCode: 'EGY', description: 'Ancient wonders' },
      { name: 'Barcelona', country: 'Spain', countryCode: 'ESP', description: 'Art and architecture' },
      { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NLD', description: 'Canals and culture' },
      { name: 'Sydney', country: 'Australia', countryCode: 'AUS', description: 'Harbor city' },
    ];

    for (const region of regions) {
      await Region.findOneAndUpdate(
        { name: region.name, country: region.country },
        region,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Regions seeded');

    console.log('🎉 Reference data seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding reference data:', error);
    process.exit(1);
  }
};

seedReferenceData();
