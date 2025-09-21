import { NextRequest, NextResponse } from 'next/server';
import { withApiKey } from '@/lib/apiKeyMiddleware';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

async function getHandler(request: NextRequest) {
  try {
    await connectDB();

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          bio: user.bio,
          location: user.location,
          website: user.website,
        },
      },
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get profile' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getHandler);

async function putHandler(request: NextRequest) {
  try {
    await connectDB();

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      fullName,
      userName,
      phone,
      dateOfBirth,
      bio,
      location,
      website,
    } = body;

    // Check if username is being changed and if it's already taken
    if (userName && userName !== user.userName) {
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
      }
    }

    // Update user profile
    const updateData: any = {};
    
    if (fullName !== undefined) updateData.fullName = fullName;
    if (userName !== undefined) updateData.userName = userName;
    if (phone !== undefined) updateData.phone = phone;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;
    if (website !== undefined) updateData.website = website;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'Failed to update profile' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });

  } catch (error: any) {
    console.error('Profile update error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ message: errors.join(', ') }, { status: 400 });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const PUT = withApiKey(putHandler);
