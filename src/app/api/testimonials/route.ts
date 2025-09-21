import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { withApiKey } from '@/lib/apiKeyMiddleware';

async function getTestimonials(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured');
    const tourId = searchParams.get('tourId');
    const minRating = searchParams.get('minRating');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = { isActive: true };

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (tourId) {
      query.tourId = tourId;
    }

    if (minRating) {
      query.rating = { $gte: parseInt(minRating) };
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Execute query
    const testimonials = await Testimonial.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('tourId', 'title slug')
      .select('-email -response -helpful -notHelpful -images -videoUrl')
      .lean();

    // Get total count for pagination
    const total = await Testimonial.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getTestimonials);

