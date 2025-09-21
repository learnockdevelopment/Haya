const mongoose = require('mongoose');

async function seedData() {
  try {
    await mongoose.connect('mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ Connected to MongoDB');
    
    // Create collections and insert data
    const db = mongoose.connection.db;
    
    // Clear existing data
    db.collection('categories').deleteMany({});
    db.collection('types').deleteMany({});
    db.collection('tags').deleteMany({});
    db.collection('regions').deleteMany({});
    db.collection('languages').deleteMany({});
    
    // Insert categories
    const categories = [
      { title: 'Adventure', description: 'Exciting adventure tours', shortDescription: 'Adventure tours', entityType: 'tour', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Cultural', description: 'Cultural and heritage tours', shortDescription: 'Cultural tours', entityType: 'tour', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Beach', description: 'Relaxing beach vacations', shortDescription: 'Beach tours', entityType: 'tour', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Mountain', description: 'Mountain hiking and trekking', shortDescription: 'Mountain tours', entityType: 'tour', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'City', description: 'Urban city exploration', shortDescription: 'City tours', entityType: 'tour', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Wildlife', description: 'Wildlife and nature tours', shortDescription: 'Wildlife tours', entityType: 'tour', sortOrder: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Religious', description: 'Religious and spiritual tours', shortDescription: 'Religious tours', entityType: 'tour', sortOrder: 7, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Luxury', description: 'Luxury travel experiences', shortDescription: 'Luxury tours', entityType: 'tour', sortOrder: 8, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const categoryResult = await db.collection('categories').insertMany(categories);
    console.log(`✅ Categories inserted: ${categoryResult.insertedCount}`);
    
    // Insert types
    const types = [
      { title: 'Domestic', description: 'Domestic tours within the country', shortDescription: 'Domestic tours', entityType: 'tour', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'International', description: 'International tours abroad', shortDescription: 'International tours', entityType: 'tour', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Local', description: 'Local day trips and excursions', shortDescription: 'Local tours', entityType: 'tour', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Multi-Country', description: 'Tours spanning multiple countries', shortDescription: 'Multi-country tours', entityType: 'tour', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const typeResult = await db.collection('types').insertMany(types);
    console.log(`✅ Types inserted: ${typeResult.insertedCount}`);
    
    // Insert tags
    const tags = [
      { title: 'Family Friendly', description: 'Suitable for families', entityType: 'tour', color: '#10B981', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Budget', description: 'Budget-friendly options', entityType: 'tour', color: '#F59E0B', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Luxury', description: 'Luxury experiences', entityType: 'tour', color: '#8B5CF6', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Photography', description: 'Great for photography', entityType: 'tour', color: '#EC4899', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Food & Wine', description: 'Culinary experiences', entityType: 'tour', color: '#EF4444', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'History', description: 'Historical sites and monuments', entityType: 'tour', color: '#6B7280', sortOrder: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Nature', description: 'Natural landscapes and wildlife', entityType: 'tour', color: '#059669', sortOrder: 7, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Adventure', description: 'Thrilling activities', entityType: 'tour', color: '#DC2626', sortOrder: 8, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Romantic', description: 'Perfect for couples', entityType: 'tour', color: '#F97316', sortOrder: 9, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Solo Travel', description: 'Great for solo travelers', entityType: 'tour', color: '#06B6D4', sortOrder: 10, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const tagResult = await db.collection('tags').insertMany(tags);
    console.log(`✅ Tags inserted: ${tagResult.insertedCount}`);
    
    // Insert regions
    const regions = [
      { name: 'Paris', country: 'France', countryCode: 'FRA', description: 'The City of Light', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rome', country: 'Italy', countryCode: 'ITA', description: 'The Eternal City', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tokyo', country: 'Japan', countryCode: 'JPN', description: 'Modern metropolis', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'New York', country: 'United States', countryCode: 'USA', description: 'The Big Apple', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'London', country: 'United Kingdom', countryCode: 'GBR', description: 'Historic capital', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'ARE', description: 'Modern luxury', sortOrder: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cairo', country: 'Egypt', countryCode: 'EGY', description: 'Ancient wonders', sortOrder: 7, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Barcelona', country: 'Spain', countryCode: 'ESP', description: 'Art and architecture', sortOrder: 8, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NLD', description: 'Canals and culture', sortOrder: 9, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sydney', country: 'Australia', countryCode: 'AUS', description: 'Harbor city', sortOrder: 10, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const regionResult = await db.collection('regions').insertMany(regions);
    console.log(`✅ Regions inserted: ${regionResult.insertedCount}`);
    
    // Insert languages
    const languages = [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false, isActive: true, isDefault: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, isActive: true, isDefault: false, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false, isActive: true, isDefault: false, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
      { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false, isActive: true, isDefault: false, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const languageResult = await db.collection('languages').insertMany(languages);
    console.log(`✅ Languages inserted: ${languageResult.insertedCount}`);
    
    console.log('🎉 All reference data seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedData();
