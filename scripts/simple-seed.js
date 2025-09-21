const mongoose = require('mongoose');

// Simple connection
mongoose.connect('mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Create collections and insert data
    const db = mongoose.connection.db;
    
    // Clear existing data
    db.collection('categories').deleteMany({});
    db.collection('types').deleteMany({});
    db.collection('tags').deleteMany({});
    db.collection('regions').deleteMany({});
    
    // Insert categories
    const categories = [
      { title: 'Adventure', description: 'Exciting adventure tours', shortDescription: 'Adventure tours', entityType: 'tour', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Cultural', description: 'Cultural and heritage tours', shortDescription: 'Cultural tours', entityType: 'tour', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Beach', description: 'Relaxing beach vacations', shortDescription: 'Beach tours', entityType: 'tour', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Mountain', description: 'Mountain hiking and trekking', shortDescription: 'Mountain tours', entityType: 'tour', isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
      { title: 'City', description: 'Urban city exploration', shortDescription: 'City tours', entityType: 'tour', isActive: true, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Wildlife', description: 'Wildlife and nature tours', shortDescription: 'Wildlife tours', entityType: 'tour', isActive: true, sortOrder: 6, createdAt: new Date(), updatedAt: new Date() }
    ];
    
    db.collection('categories').insertMany(categories);
    console.log('✅ Categories inserted');
    
    // Insert types
    const types = [
      { title: 'Domestic', description: 'Domestic tours within the country', shortDescription: 'Domestic tours', entityType: 'tour', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'International', description: 'International tours abroad', shortDescription: 'International tours', entityType: 'tour', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Local', description: 'Local day trips and excursions', shortDescription: 'Local tours', entityType: 'tour', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() }
    ];
    
    db.collection('types').insertMany(types);
    console.log('✅ Types inserted');
    
    // Insert tags
    const tags = [
      { title: 'Family Friendly', description: 'Suitable for families', color: '#10B981', entityType: 'tour', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Budget', description: 'Budget-friendly options', color: '#F59E0B', entityType: 'tour', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Luxury', description: 'Luxury experiences', color: '#8B5CF6', entityType: 'tour', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Photography', description: 'Great for photography', color: '#EC4899', entityType: 'tour', isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() }
    ];
    
    db.collection('tags').insertMany(tags);
    console.log('✅ Tags inserted');
    
    // Insert regions
    const regions = [
      { name: 'Paris', country: 'France', countryCode: 'FRA', description: 'The City of Light', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rome', country: 'Italy', countryCode: 'ITA', description: 'The Eternal City', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tokyo', country: 'Japan', countryCode: 'JPN', description: 'Modern metropolis', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'New York', country: 'United States', countryCode: 'USA', description: 'The Big Apple', isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'London', country: 'United Kingdom', countryCode: 'GBR', description: 'Historic capital', isActive: true, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'ARE', description: 'Modern luxury', isActive: true, sortOrder: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cairo', country: 'Egypt', countryCode: 'EGY', description: 'Ancient wonders', isActive: true, sortOrder: 7, createdAt: new Date(), updatedAt: new Date() }
    ];
    
    db.collection('regions').insertMany(regions);
    console.log('✅ Regions inserted');
    
    console.log('🎉 All reference data seeded successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

