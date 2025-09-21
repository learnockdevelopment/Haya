const mongoose = require('mongoose');

async function seedEntitySpecificData() {
  try {
    await mongoose.connect('mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Clear existing data
    await db.collection('categories').deleteMany({});
    await db.collection('types').deleteMany({});
    await db.collection('tags').deleteMany({});
    await db.collection('regions').deleteMany({});
    await db.collection('languages').deleteMany({});
    
    // Entity-specific categories
    const categories = [
      // Tour Categories
      { title: 'Adventure', description: 'Exciting adventure tours', shortDescription: 'Adventure tours', entityType: 'tour', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Cultural', description: 'Cultural and heritage tours', shortDescription: 'Cultural tours', entityType: 'tour', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Beach', description: 'Relaxing beach vacations', shortDescription: 'Beach tours', entityType: 'tour', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Mountain', description: 'Mountain hiking and trekking', shortDescription: 'Mountain tours', entityType: 'tour', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'City', description: 'Urban city exploration', shortDescription: 'City tours', entityType: 'tour', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Wildlife', description: 'Wildlife and nature tours', shortDescription: 'Wildlife tours', entityType: 'tour', sortOrder: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Religious', description: 'Religious and spiritual tours', shortDescription: 'Religious tours', entityType: 'tour', sortOrder: 7, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Luxury', description: 'Luxury travel experiences', shortDescription: 'Luxury tours', entityType: 'tour', sortOrder: 8, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Visa Categories
      { title: 'Tourist Visa', description: 'Short-term tourist visas', shortDescription: 'Tourist visas', entityType: 'visa', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Business Visa', description: 'Business travel visas', shortDescription: 'Business visas', entityType: 'visa', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Student Visa', description: 'Educational visas', shortDescription: 'Student visas', entityType: 'visa', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Work Visa', description: 'Employment visas', shortDescription: 'Work visas', entityType: 'visa', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Transit Visa', description: 'Transit through countries', shortDescription: 'Transit visas', entityType: 'visa', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Medical Visa', description: 'Medical treatment visas', shortDescription: 'Medical visas', entityType: 'visa', sortOrder: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Flight Categories
      { title: 'Domestic', description: 'Domestic flights within country', shortDescription: 'Domestic flights', entityType: 'flight', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'International', description: 'International flights', shortDescription: 'International flights', entityType: 'flight', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Charter', description: 'Charter flight services', shortDescription: 'Charter flights', entityType: 'flight', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Private Jet', description: 'Private jet services', shortDescription: 'Private jets', entityType: 'flight', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Cargo', description: 'Cargo and freight flights', shortDescription: 'Cargo flights', entityType: 'flight', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Hotel Categories
      { title: 'Luxury', description: '5-star luxury hotels', shortDescription: 'Luxury hotels', entityType: 'hotel', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Business', description: 'Business hotels', shortDescription: 'Business hotels', entityType: 'hotel', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Budget', description: 'Budget-friendly hotels', shortDescription: 'Budget hotels', entityType: 'hotel', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Resort', description: 'Resort accommodations', shortDescription: 'Resorts', entityType: 'hotel', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Boutique', description: 'Boutique hotels', shortDescription: 'Boutique hotels', entityType: 'hotel', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Hostel', description: 'Hostel accommodations', shortDescription: 'Hostels', entityType: 'hotel', sortOrder: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Package Categories
      { title: 'All-Inclusive', description: 'All-inclusive packages', shortDescription: 'All-inclusive', entityType: 'package', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Honeymoon', description: 'Honeymoon packages', shortDescription: 'Honeymoon', entityType: 'package', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Family', description: 'Family vacation packages', shortDescription: 'Family packages', entityType: 'package', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Group', description: 'Group travel packages', shortDescription: 'Group packages', entityType: 'package', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Solo', description: 'Solo traveler packages', shortDescription: 'Solo packages', entityType: 'package', sortOrder: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const categoryResult = await db.collection('categories').insertMany(categories);
    console.log(`✅ Categories inserted: ${categoryResult.insertedCount}`);
    
    // Entity-specific types
    const types = [
      // Tour Types
      { title: 'Domestic', description: 'Domestic tours within the country', shortDescription: 'Domestic tours', entityType: 'tour', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'International', description: 'International tours abroad', shortDescription: 'International tours', entityType: 'tour', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Local', description: 'Local day trips and excursions', shortDescription: 'Local tours', entityType: 'tour', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Multi-Country', description: 'Tours spanning multiple countries', shortDescription: 'Multi-country tours', entityType: 'tour', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Visa Types
      { title: 'Single Entry', description: 'Single entry visas', shortDescription: 'Single entry', entityType: 'visa', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Multiple Entry', description: 'Multiple entry visas', shortDescription: 'Multiple entry', entityType: 'visa', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Transit', description: 'Transit visas', shortDescription: 'Transit', entityType: 'visa', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Long Term', description: 'Long-term visas', shortDescription: 'Long-term', entityType: 'visa', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Flight Types
      { title: 'Economy', description: 'Economy class flights', shortDescription: 'Economy', entityType: 'flight', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Business', description: 'Business class flights', shortDescription: 'Business', entityType: 'flight', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'First Class', description: 'First class flights', shortDescription: 'First class', entityType: 'flight', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Charter', description: 'Charter flights', shortDescription: 'Charter', entityType: 'flight', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Hotel Types
      { title: 'Standard', description: 'Standard room bookings', shortDescription: 'Standard', entityType: 'hotel', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Deluxe', description: 'Deluxe room bookings', shortDescription: 'Deluxe', entityType: 'hotel', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Suite', description: 'Suite bookings', shortDescription: 'Suite', entityType: 'hotel', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Villa', description: 'Villa rentals', shortDescription: 'Villa', entityType: 'hotel', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Package Types
      { title: 'Basic', description: 'Basic packages', shortDescription: 'Basic', entityType: 'package', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Premium', description: 'Premium packages', shortDescription: 'Premium', entityType: 'package', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Luxury', description: 'Luxury packages', shortDescription: 'Luxury', entityType: 'package', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Custom', description: 'Custom packages', shortDescription: 'Custom', entityType: 'package', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const typeResult = await db.collection('types').insertMany(types);
    console.log(`✅ Types inserted: ${typeResult.insertedCount}`);
    
    // Entity-specific tags
    const tags = [
      // General tags
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
      
      // Visa-specific tags
      { title: 'Express', description: 'Express visa processing', entityType: 'visa', color: '#10B981', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Standard', description: 'Standard processing time', entityType: 'visa', color: '#F59E0B', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Rush', description: 'Rush processing', entityType: 'visa', color: '#EF4444', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Documentation', description: 'Document assistance', entityType: 'visa', color: '#8B5CF6', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Flight-specific tags
      { title: 'Direct', description: 'Direct flights', entityType: 'flight', color: '#10B981', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Connecting', description: 'Connecting flights', entityType: 'flight', color: '#F59E0B', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Red Eye', description: 'Overnight flights', entityType: 'flight', color: '#6B7280', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Early Bird', description: 'Early morning flights', entityType: 'flight', color: '#EC4899', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Hotel-specific tags
      { title: 'Beachfront', description: 'Beachfront properties', entityType: 'hotel', color: '#10B981', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'City Center', description: 'City center location', entityType: 'hotel', color: '#F59E0B', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Airport', description: 'Near airport', entityType: 'hotel', color: '#8B5CF6', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Spa', description: 'Spa services available', entityType: 'hotel', color: '#EC4899', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      
      // Package-specific tags
      { title: 'All Inclusive', description: 'All-inclusive packages', entityType: 'package', color: '#10B981', sortOrder: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Customizable', description: 'Customizable packages', entityType: 'package', color: '#F59E0B', sortOrder: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Group Discount', description: 'Group discounts available', entityType: 'package', color: '#8B5CF6', sortOrder: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Early Booking', description: 'Early booking discounts', entityType: 'package', color: '#EC4899', sortOrder: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const tagResult = await db.collection('tags').insertMany(tags);
    console.log(`✅ Tags inserted: ${tagResult.insertedCount}`);
    
    // Regions (same for all entities)
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
    
    // Languages
    const languages = [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false, isActive: true, isDefault: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, isActive: true, isDefault: false, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false, isActive: true, isDefault: false, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
      { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false, isActive: true, isDefault: false, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const languageResult = await db.collection('languages').insertMany(languages);
    console.log(`✅ Languages inserted: ${languageResult.insertedCount}`);
    
    console.log('🎉 Entity-specific data seeding completed!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${categoryResult.insertedCount} (across 5 entity types)`);
    console.log(`- Types: ${typeResult.insertedCount} (across 5 entity types)`);
    console.log(`- Tags: ${tagResult.insertedCount} (across 5 entity types)`);
    console.log(`- Regions: ${regionResult.insertedCount}`);
    console.log(`- Languages: ${languageResult.insertedCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedEntitySpecificData();
