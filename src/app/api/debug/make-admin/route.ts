import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

async function postHandler(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.role = 'admin';
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'User role updated to admin',
      data: { user: { email: user.email, role: user.role } },
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user role' },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);



