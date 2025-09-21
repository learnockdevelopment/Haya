import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

async function getHandler(request: NextRequest) {
  try {
    await connectDB();

    const users = await User.find({}).select('fullName email role createdAt');
    
    return NextResponse.json({
      success: true,
      data: { users },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getHandler);



