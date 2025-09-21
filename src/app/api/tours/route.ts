import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/models/Tour';
import { withApiKey } from '@/lib/apiKeyMiddleware';

async function getTours(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const country = searchParams.get('country');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (country) {
      query.country = new RegExp(country, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseInt(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseInt(maxPrice);
      }
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Execute query
    const tours = await Tour.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-itinerary -included -notIncluded -requirements -tags -seoTitle -seoDescription')
      .lean();

    // Get total count for pagination
    const total = await Tour.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        tours,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getTours);

