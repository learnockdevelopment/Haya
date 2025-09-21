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

    console.log('🌱 Seeding all reference data...');

    // Clear existing data
    await Category.deleteMany({});
    await Type.deleteMany({});
    await Tag.deleteMany({});
    await Region.deleteMany({});

    // Seed Categories
    const categories = [
      { title: 'Adventure', description: 'Exciting adventure tours', shortDescription: 'Adventure tours', entityType: 'tour', sortOrder: 1 },
      { title: 'Cultural', description: 'Cultural and heritage tours', shortDescription: 'Cultural tours', entityType: 'tour', sortOrder: 2 },
      { title: 'Beach', description: 'Relaxing beach vacations', shortDescription: 'Beach tours', entityType: 'tour', sortOrder: 3 },
      { title: 'Mountain', description: 'Mountain hiking and trekking', shortDescription: 'Mountain tours', entityType: 'tour', sortOrder: 4 },
      { title: 'City', description: 'Urban city exploration', shortDescription: 'City tours', entityType: 'tour', sortOrder: 5 },
      { title: 'Wildlife', description: 'Wildlife and nature tours', shortDescription: 'Wildlife tours', entityType: 'tour', sortOrder: 6 },
      { title: 'Religious', description: 'Religious and spiritual tours', shortDescription: 'Religious tours', entityType: 'tour', sortOrder: 7 },
      { title: 'Luxury', description: 'Luxury travel experiences', shortDescription: 'Luxury tours', entityType: 'tour', sortOrder: 8 },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Seed Types
    const types = [
      { title: 'Domestic', description: 'Domestic tours within the country', shortDescription: 'Domestic tours', entityType: 'tour', sortOrder: 1 },
      { title: 'International', description: 'International tours abroad', shortDescription: 'International tours', entityType: 'tour', sortOrder: 2 },
      { title: 'Local', description: 'Local day trips and excursions', shortDescription: 'Local tours', entityType: 'tour', sortOrder: 3 },
      { title: 'Multi-Country', description: 'Tours spanning multiple countries', shortDescription: 'Multi-country tours', entityType: 'tour', sortOrder: 4 },
    ];

    const createdTypes = await Type.insertMany(types);
    console.log(`✅ Created ${createdTypes.length} types`);

    // Seed Tags
    const tags = [
      { title: 'Family Friendly', description: 'Suitable for families', entityType: 'tour', color: '#10B981', sortOrder: 1 },
      { title: 'Budget', description: 'Budget-friendly options', entityType: 'tour', color: '#F59E0B', sortOrder: 2 },
      { title: 'Luxury', description: 'Luxury experiences', entityType: 'tour', color: '#8B5CF6', sortOrder: 3 },
      { title: 'Photography', description: 'Great for photography', entityType: 'tour', color: '#EC4899', sortOrder: 4 },
      { title: 'Food & Wine', description: 'Culinary experiences', entityType: 'tour', color: '#EF4444', sortOrder: 5 },
      { title: 'History', description: 'Historical sites and monuments', entityType: 'tour', color: '#6B7280', sortOrder: 6 },
      { title: 'Nature', description: 'Natural landscapes and wildlife', entityType: 'tour', color: '#059669', sortOrder: 7 },
      { title: 'Adventure', description: 'Thrilling activities', entityType: 'tour', color: '#DC2626', sortOrder: 8 },
      { title: 'Romantic', description: 'Perfect for couples', entityType: 'tour', color: '#F97316', sortOrder: 9 },
      { title: 'Solo Travel', description: 'Great for solo travelers', entityType: 'tour', color: '#06B6D4', sortOrder: 10 },
    ];

    const createdTags = await Tag.insertMany(tags);
    console.log(`✅ Created ${createdTags.length} tags`);

    // Seed Regions
    const regions = [
      { name: 'Paris', country: 'France', countryCode: 'FRA', description: 'The City of Light', sortOrder: 1 },
      { name: 'Rome', country: 'Italy', countryCode: 'ITA', description: 'The Eternal City', sortOrder: 2 },
      { name: 'Tokyo', country: 'Japan', countryCode: 'JPN', description: 'Modern metropolis', sortOrder: 3 },
      { name: 'New York', country: 'United States', countryCode: 'USA', description: 'The Big Apple', sortOrder: 4 },
      { name: 'London', country: 'United Kingdom', countryCode: 'GBR', description: 'Historic capital', sortOrder: 5 },
      { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'ARE', description: 'Modern luxury', sortOrder: 6 },
      { name: 'Cairo', country: 'Egypt', countryCode: 'EGY', description: 'Ancient wonders', sortOrder: 7 },
      { name: 'Barcelona', country: 'Spain', countryCode: 'ESP', description: 'Art and architecture', sortOrder: 8 },
      { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NLD', description: 'Canals and culture', sortOrder: 9 },
      { name: 'Sydney', country: 'Australia', countryCode: 'AUS', description: 'Harbor city', sortOrder: 10 },
      { name: 'Istanbul', country: 'Turkey', countryCode: 'TUR', description: 'Bridge between continents', sortOrder: 11 },
      { name: 'Bangkok', country: 'Thailand', countryCode: 'THA', description: 'Vibrant city life', sortOrder: 12 },
      { name: 'Mumbai', country: 'India', countryCode: 'IND', description: 'Bollywood capital', sortOrder: 13 },
      { name: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BRA', description: 'Carnival city', sortOrder: 14 },
      { name: 'Cape Town', country: 'South Africa', countryCode: 'ZAF', description: 'Mother city', sortOrder: 15 },
    ];

    const createdRegions = await Region.insertMany(regions);
    console.log(`✅ Created ${createdRegions.length} regions`);

    console.log('🎉 All reference data seeding completed!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Types: ${createdTypes.length}`);
    console.log(`- Tags: ${createdTags.length}`);
    console.log(`- Regions: ${createdRegions.length}`);
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding reference data:', error);
    process.exit(1);
  }
};

seedReferenceData();

