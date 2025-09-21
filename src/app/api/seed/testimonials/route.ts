import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

const sampleTestimonials = [
  {
    author: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: 'Absolutely amazing experience! The Paris tour exceeded all my expectations. Our guide was knowledgeable and the itinerary was perfect. I would definitely book again!',
    tourReference: null,
    isVerified: true,
    helpfulVotes: 12,
    createdAt: new Date('2024-01-15')
  },
  {
    author: {
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: 'The Tokyo cultural immersion tour was incredible! I learned so much about Japanese culture and traditions. The tea ceremony was a highlight. Highly recommended!',
    tourReference: null,
    isVerified: true,
    helpfulVotes: 8,
    createdAt: new Date('2024-01-20')
  },
  {
    author: {
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: 'Santorini was pure magic! The sunset views were breathtaking and our guide made sure we got the best photos. The wine tasting was also fantastic. Perfect romantic getaway!',
    tourReference: null,
    isVerified: true,
    helpfulVotes: 15,
    createdAt: new Date('2024-02-01')
  },
  {
    author: {
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4,
    review: 'Great adventure in Bali! The yoga sessions were relaxing and the rice terraces were stunning. The only downside was the weather, but overall a wonderful experience.',
    tourReference: null,
    isVerified: true,
    helpfulVotes: 6,
    createdAt: new Date('2024-02-10')
  },
  {
    author: {
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: 'Exceptional service from start to finish! The team was professional, organized, and made our trip stress-free. The destinations were beautiful and the activities were well-planned.',
    tourReference: null,
    isVerified: true,
    helpfulVotes: 20,
    createdAt: new Date('2024-02-15')
  },
  {
    author: {
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: 'Outstanding tour company! They really know how to create memorable experiences. Every detail was taken care of and the guides were passionate about their work.',
    tourReference: null,
    isVerified: true,
    helpfulVotes: 9,
    createdAt: new Date('2024-02-20')
  }
];

async function postHandler(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing testimonials
    await Testimonial.deleteMany({});

    // Insert sample testimonials
    const createdTestimonials = await Testimonial.insertMany(sampleTestimonials);

    return NextResponse.json({
      success: true,
      message: 'Sample testimonials created successfully',
      data: { testimonials: createdTestimonials },
    });
  } catch (error) {
    console.error('Error creating sample testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create sample testimonials' },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);



