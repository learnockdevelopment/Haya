import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/models/Tour';

const sampleTours = [
  {
    title: 'Paris City Explorer',
    slug: 'paris-city-explorer',
    description: 'Discover the magic of Paris with our comprehensive city tour. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Experience the charm of Montmartre and enjoy a Seine River cruise.',
    shortDescription: 'Explore the City of Light with our comprehensive Paris tour',
    price: 299,
    originalPrice: 399,
    duration: 3,
    maxGroupSize: 15,
    category: 'city',
    difficulty: 'easy',
    location: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&h=600&fit=crop'
    ],
    highlights: [
      'Eiffel Tower visit with skip-the-line access',
      'Louvre Museum guided tour',
      'Seine River cruise with dinner',
      'Montmartre walking tour',
      'Notre-Dame Cathedral visit'
    ],
    inclusions: [
      'Professional English-speaking guide',
      'All entrance fees',
      'Transportation between sites',
      'Welcome dinner',
      'City map and guidebook'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Optional activities',
      'Tips and gratuities'
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'Tokyo Cultural Immersion',
    slug: 'tokyo-cultural-immersion',
    description: 'Immerse yourself in Japanese culture with our authentic Tokyo experience. Visit ancient temples, experience traditional tea ceremonies, explore bustling markets, and discover the perfect blend of old and new Japan.',
    shortDescription: 'Experience authentic Japanese culture in the heart of Tokyo',
    price: 450,
    duration: 5,
    maxGroupSize: 12,
    category: 'cultural',
    difficulty: 'moderate',
    location: 'Tokyo',
    country: 'Japan',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop'
    ],
    highlights: [
      'Senso-ji Temple visit',
      'Traditional tea ceremony experience',
      'Tsukiji Fish Market tour',
      'Shibuya crossing experience',
      'Traditional ryokan stay'
    ],
    inclusions: [
      'Professional guide',
      'All cultural activities',
      'Traditional meals',
      'Transportation',
      'Accommodation (2 nights)'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal shopping',
      'Optional activities',
      'Tips'
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'Santorini Sunset Romance',
    slug: 'santorini-sunset-romance',
    description: 'Experience the most romantic destination in Greece. Watch breathtaking sunsets from Oia, explore white-washed villages, taste local wines, and create unforgettable memories in this stunning Cycladic island.',
    shortDescription: 'Romantic getaway to the most beautiful Greek island',
    price: 650,
    originalPrice: 750,
    duration: 4,
    maxGroupSize: 10,
    category: 'beach',
    difficulty: 'easy',
    location: 'Santorini',
    country: 'Greece',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop'
    ],
    highlights: [
      'Oia sunset viewing',
      'Wine tasting at local vineyards',
      'Red Beach visit',
      'Fira town exploration',
      'Private boat tour'
    ],
    inclusions: [
      'Luxury accommodation',
      'All meals',
      'Wine tasting sessions',
      'Private transportation',
      'Professional photographer'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Optional spa treatments',
      'Tips'
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'Bali Adventure & Wellness',
    slug: 'bali-adventure-wellness',
    description: 'Discover the spiritual and adventurous side of Bali. Practice yoga at sunrise, explore ancient temples, trek through rice terraces, and relax with traditional spa treatments in this tropical paradise.',
    shortDescription: 'Adventure and wellness retreat in tropical Bali',
    price: 380,
    duration: 6,
    maxGroupSize: 8,
    category: 'adventure',
    difficulty: 'moderate',
    location: 'Bali',
    country: 'Indonesia',
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    ],
    highlights: [
      'Sunrise yoga sessions',
      'Tegallalang Rice Terraces trek',
      'Ubud Monkey Forest visit',
      'Traditional Balinese cooking class',
      'Sacred temple ceremonies'
    ],
    inclusions: [
      'Yoga instructor',
      'All activities',
      'Traditional meals',
      'Accommodation (5 nights)',
      'Spa treatments'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal shopping',
      'Optional activities',
      'Tips'
    ],
    isActive: true,
    isFeatured: false,
  }
];

async function postHandler(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing tours
    await Tour.deleteMany({});

    // Insert sample tours
    const createdTours = await Tour.insertMany(sampleTours);

    return NextResponse.json({
      success: true,
      message: 'Sample tours created successfully',
      data: { tours: createdTours },
    });
  } catch (error) {
    console.error('Error creating sample tours:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create sample tours' },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);



