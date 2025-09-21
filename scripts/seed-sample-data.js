const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Sample data
const sampleTours = [
  {
    title: {
      en: "Amazing Paris Adventure",
      ar: "مغامرة باريس المذهلة"
    },
    description: {
      en: "Discover the magic of Paris with our guided tour through the city's most iconic landmarks.",
      ar: "اكتشف سحر باريس مع جولتنا المرشدة عبر أشهر معالم المدينة."
    },
    shortDescription: {
      en: "Experience Paris like never before",
      ar: "اختبر باريس كما لم تختبرها من قبل"
    },
    slug: "amazing-paris-adventure",
    price: 299,
    actualPrice: 249,
    maxGroupSize: 15,
    duration: 3,
    difficulty: "easy",
    isActive: true,
    isFeatured: true,
    isTranslatable: true,
    defaultLanguage: "en",
    highlights: {
      en: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
      ar: ["برج إيفل", "متحف اللوفر", "رحلة نهر السين"]
    },
    inclusions: {
      en: ["Professional guide", "Entrance fees", "Transportation"],
      ar: ["دليل محترف", "رسوم الدخول", "النقل"]
    },
    exclusions: {
      en: ["Meals", "Personal expenses", "Tips"],
      ar: ["الوجبات", "المصروفات الشخصية", "البقشيش"]
    },
    images: [
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800"
    ],
    ratings: {
      average: 4.8,
      count: 127
    }
  },
  {
    title: {
      en: "Rome Historical Journey",
      ar: "رحلة روما التاريخية"
    },
    description: {
      en: "Step back in time and explore the ancient wonders of Rome with our expert guides.",
      ar: "ارجع بالزمن واستكشف عجائب روما القديمة مع مرشدينا الخبراء."
    },
    shortDescription: {
      en: "Walk through history in Rome",
      ar: "امش عبر التاريخ في روما"
    },
    slug: "rome-historical-journey",
    price: 199,
    maxGroupSize: 20,
    duration: 2,
    difficulty: "moderate",
    isActive: true,
    isFeatured: true,
    isTranslatable: true,
    defaultLanguage: "en",
    highlights: {
      en: ["Colosseum", "Roman Forum", "Vatican City"],
      ar: ["الكولوسيوم", "المنتدى الروماني", "مدينة الفاتيكان"]
    },
    inclusions: {
      en: ["Expert guide", "Skip-the-line tickets", "Audio headsets"],
      ar: ["دليل خبير", "تذاكر تجاوز الطابور", "سماعات صوتية"]
    },
    exclusions: {
      en: ["Lunch", "Hotel pickup", "Gratuities"],
      ar: ["الغداء", "استلام من الفندق", "الإكراميات"]
    },
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800"
    ],
    ratings: {
      average: 4.6,
      count: 89
    }
  }
];

const sampleTestimonials = [
  {
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
    },
    rating: 5,
    review: {
      en: "Amazing experience! The tour guide was knowledgeable and friendly. Highly recommended!",
      ar: "تجربة مذهلة! كان الدليل مطلع وودود. أنصح به بشدة!"
    },
    tour: null,
    isVerified: true,
    helpfulVotes: 12
  },
  {
    author: {
      name: "Ahmed Al-Rashid",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    rating: 5,
    review: {
      en: "Perfect organization and excellent service. Will definitely book again!",
      ar: "تنظيم مثالي وخدمة ممتازة. سأحجز مرة أخرى بالتأكيد!"
    },
    tour: null,
    isVerified: true,
    helpfulVotes: 8
  }
];

async function seedData() {
  try {
    await connectDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await mongoose.connection.db.collection('tours').deleteMany({});
    await mongoose.connection.db.collection('testimonials').deleteMany({});
    
    // Insert sample tours
    console.log('🌍 Adding sample tours...');
    await mongoose.connection.db.collection('tours').insertMany(sampleTours);
    
    // Insert sample testimonials
    console.log('💬 Adding sample testimonials...');
    await mongoose.connection.db.collection('testimonials').insertMany(sampleTestimonials);
    
    console.log('✅ Sample data seeded successfully!');
    console.log(`📊 Added ${sampleTours.length} tours and ${sampleTestimonials.length} testimonials`);
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedData();



