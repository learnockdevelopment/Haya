const mongoose = require('mongoose');

// Simple connection
mongoose.connect('mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Create collections and insert data
    const db = mongoose.connection.db;
    
    // Clear existing data
    db.collection('languages').deleteMany({});
    
    // Insert languages
    const languages = [
      { 
        code: 'en', 
        name: 'English', 
        nativeName: 'English', 
        flag: '🇺🇸', 
        rtl: false, 
        isActive: true, 
        isDefault: true, 
        sortOrder: 1, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        code: 'ar', 
        name: 'Arabic', 
        nativeName: 'العربية', 
        flag: '🇸🇦', 
        rtl: true, 
        isActive: true, 
        isDefault: false, 
        sortOrder: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        code: 'fr', 
        name: 'French', 
        nativeName: 'Français', 
        flag: '🇫🇷', 
        rtl: false, 
        isActive: true, 
        isDefault: false, 
        sortOrder: 3, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        code: 'es', 
        name: 'Spanish', 
        nativeName: 'Español', 
        flag: '🇪🇸', 
        rtl: false, 
        isActive: true, 
        isDefault: false, 
        sortOrder: 4, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ];
    
    db.collection('languages').insertMany(languages);
    console.log('✅ Languages inserted');
    
    console.log('🎉 Language seeding completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

