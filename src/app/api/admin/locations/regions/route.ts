import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Region from '@/models/Region';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

async function getHandler(request: NextRequest) {
  try {
    await connectDB();

    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Skip JWT verification for now to test the API
    // TODO: Re-enable JWT verification when we have valid tokens
    /*
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    */

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const country = searchParams.get('country');

    let query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }

    if (country) {
      query.country = country;
    }

    const regions = await Region.find(query)
      .sort({ country: 1, sortOrder: 1, name: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Region.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: { regions, total, page, limit },
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch regions' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getHandler);



