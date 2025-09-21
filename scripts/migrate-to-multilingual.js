const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
  try {
    // You'll need to set your MongoDB URI here
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/haya-travel';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please set MONGODB_URI environment variable or update the script with your MongoDB connection string');
    process.exit(1);
  }
}

// Migration functions
async function migrateTours() {
  console.log('Starting Tour migration...');
  
  const TourSchema = new mongoose.Schema({
    // Old fields (will be kept for backward compatibility)
    title: String,
    description: String,
    shortDescription: String,
    
    // New multilingual fields
    titleMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    descriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    shortDescriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    
    // Other fields remain the same
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
    price: { type: Number, required: true },
    actualPrice: Number,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    departureDate: Date,
    returnDate: Date,
    images: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    maxGroupSize: { type: Number, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'challenging', 'expert'] },
    
    // Multilingual arrays
    highlightsMultilingual: {
      en: [String],
      ar: [String],
      fr: [String],
      es: [String],
      de: [String],
      it: [String],
      pt: [String],
      ru: [String],
      zh: [String],
      ja: [String],
      ko: [String],
      hi: [String]
    },
    inclusionsMultilingual: {
      en: [String],
      ar: [String],
      fr: [String],
      es: [String],
      de: [String],
      it: [String],
      pt: [String],
      ru: [String],
      zh: [String],
      ja: [String],
      ko: [String],
      hi: [String]
    },
    exclusionsMultilingual: {
      en: [String],
      ar: [String],
      fr: [String],
      es: [String],
      de: [String],
      it: [String],
      pt: [String],
      ru: [String],
      zh: [String],
      ja: [String],
      ko: [String],
      hi: [String]
    },
    
    // Translation settings
    isTranslatable: { type: Boolean, default: true },
    defaultLanguage: { type: String, default: 'en' },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Tour = mongoose.model('Tour', TourSchema);
  
  // Get all existing tours
  const tours = await Tour.find({});
  console.log(`Found ${tours.length} tours to migrate`);
  
  for (const tour of tours) {
    // Migrate title
    if (tour.title && !tour.titleMultilingual) {
      tour.titleMultilingual = {
        en: tour.title,
        ar: tour.title // Use English as fallback for Arabic
      };
    }
    
    // Migrate description
    if (tour.description && !tour.descriptionMultilingual) {
      tour.descriptionMultilingual = {
        en: tour.description,
        ar: tour.description // Use English as fallback for Arabic
      };
    }
    
    // Migrate short description
    if (tour.shortDescription && !tour.shortDescriptionMultilingual) {
      tour.shortDescriptionMultilingual = {
        en: tour.shortDescription,
        ar: tour.shortDescription // Use English as fallback for Arabic
      };
    }
    
    // Migrate arrays (if they exist)
    if (tour.highlights && !tour.highlightsMultilingual) {
      tour.highlightsMultilingual = {
        en: tour.highlights,
        ar: tour.highlights // Use English as fallback for Arabic
      };
    }
    
    if (tour.inclusions && !tour.inclusionsMultilingual) {
      tour.inclusionsMultilingual = {
        en: tour.inclusions,
        ar: tour.inclusions // Use English as fallback for Arabic
      };
    }
    
    if (tour.exclusions && !tour.exclusionsMultilingual) {
      tour.exclusionsMultilingual = {
        en: tour.exclusions,
        ar: tour.exclusions // Use English as fallback for Arabic
      };
    }
    
    // Set translation settings
    tour.isTranslatable = true;
    tour.defaultLanguage = 'en';
    
    await tour.save();
    console.log(`Migrated tour: ${tour.title}`);
  }
  
  console.log('Tour migration completed');
}

async function migrateCategories() {
  console.log('Starting Category migration...');
  
  const CategorySchema = new mongoose.Schema({
    // Old fields
    title: String,
    description: String,
    shortDescription: String,
    
    // New multilingual fields
    titleMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    descriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    shortDescriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    
    // Other fields
    image: String,
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    isTranslatable: { type: Boolean, default: true },
    defaultLanguage: { type: String, default: 'en' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Category = mongoose.model('Category', CategorySchema);
  
  const categories = await Category.find({});
  console.log(`Found ${categories.length} categories to migrate`);
  
  for (const category of categories) {
    if (category.title && !category.titleMultilingual) {
      category.titleMultilingual = {
        en: category.title,
        ar: category.title
      };
    }
    
    if (category.description && !category.descriptionMultilingual) {
      category.descriptionMultilingual = {
        en: category.description,
        ar: category.description
      };
    }
    
    if (category.shortDescription && !category.shortDescriptionMultilingual) {
      category.shortDescriptionMultilingual = {
        en: category.shortDescription,
        ar: category.shortDescription
      };
    }
    
    category.isTranslatable = true;
    category.defaultLanguage = 'en';
    
    await category.save();
    console.log(`Migrated category: ${category.title}`);
  }
  
  console.log('Category migration completed');
}

async function migrateTypes() {
  console.log('Starting Type migration...');
  
  const TypeSchema = new mongoose.Schema({
    // Old fields
    title: String,
    description: String,
    shortDescription: String,
    
    // New multilingual fields
    titleMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    descriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    shortDescriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    
    // Other fields
    icon: String,
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    isTranslatable: { type: Boolean, default: true },
    defaultLanguage: { type: String, default: 'en' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Type = mongoose.model('Type', TypeSchema);
  
  const types = await Type.find({});
  console.log(`Found ${types.length} types to migrate`);
  
  for (const type of types) {
    if (type.title && !type.titleMultilingual) {
      type.titleMultilingual = {
        en: type.title,
        ar: type.title
      };
    }
    
    if (type.description && !type.descriptionMultilingual) {
      type.descriptionMultilingual = {
        en: type.description,
        ar: type.description
      };
    }
    
    if (type.shortDescription && !type.shortDescriptionMultilingual) {
      type.shortDescriptionMultilingual = {
        en: type.shortDescription,
        ar: type.shortDescription
      };
    }
    
    type.isTranslatable = true;
    type.defaultLanguage = 'en';
    
    await type.save();
    console.log(`Migrated type: ${type.title}`);
  }
  
  console.log('Type migration completed');
}

async function migrateRegions() {
  console.log('Starting Region migration...');
  
  const RegionSchema = new mongoose.Schema({
    // Old fields
    name: String,
    country: String,
    city: String,
    description: String,
    
    // New multilingual fields
    nameMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    countryMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    cityMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    descriptionMultilingual: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: String,
      es: String,
      de: String,
      it: String,
      pt: String,
      ru: String,
      zh: String,
      ja: String,
      ko: String,
      hi: String
    },
    
    // Other fields
    image: String,
    slug: { type: String, required: true, unique: true },
    isTranslatable: { type: Boolean, default: true },
    defaultLanguage: { type: String, default: 'en' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Region = mongoose.model('Region', RegionSchema);
  
  const regions = await Region.find({});
  console.log(`Found ${regions.length} regions to migrate`);
  
  for (const region of regions) {
    if (region.name && !region.nameMultilingual) {
      region.nameMultilingual = {
        en: region.name,
        ar: region.name
      };
    }
    
    if (region.country && !region.countryMultilingual) {
      region.countryMultilingual = {
        en: region.country,
        ar: region.country
      };
    }
    
    if (region.city && !region.cityMultilingual) {
      region.cityMultilingual = {
        en: region.city,
        ar: region.city
      };
    }
    
    if (region.description && !region.descriptionMultilingual) {
      region.descriptionMultilingual = {
        en: region.description,
        ar: region.description
      };
    }
    
    region.isTranslatable = true;
    region.defaultLanguage = 'en';
    
    await region.save();
    console.log(`Migrated region: ${region.name}`);
  }
  
  console.log('Region migration completed');
}

// Main migration function
async function runMigration() {
  try {
    await connectDB();
    
    console.log('Starting multilingual migration...');
    console.log('This will add multilingual support to existing data.');
    console.log('Existing data will be preserved and copied to the new multilingual fields.');
    
    await migrateCategories();
    await migrateTypes();
    await migrateRegions();
    await migrateTours();
    
    console.log('Migration completed successfully!');
    console.log('You can now use the new multilingual features.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Run migration
runMigration();
