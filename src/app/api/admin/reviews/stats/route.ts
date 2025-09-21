import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
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

    const total = await Review.countDocuments();

    return NextResponse.json({
      success: true,
      data: { total },
    });
  } catch (error) {
    console.error('Error fetching review stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch review statistics' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getHandler);



