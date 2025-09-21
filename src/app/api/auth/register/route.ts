import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { withApiKey } from '@/lib/apiKeyMiddleware';

async function registerUser(request: NextRequest) {
  try {
    await connectDB();
    
    const { fullName, userName, email, password, deviceType = 'web', platform = 'web' } = await request.json();

    // Validate required fields
    if (!fullName || !userName || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Full name, username, email, and password are required' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists by email or username
    const existingUser = await User.findOne({ 
      $or: [{ email }, { userName }] 
    });
    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return NextResponse.json(
        { 
          success: false, 
          message: `User already exists with this ${field}` 
        },
        { status: 409 }
      );
    }

    // Create new user
    const user = await User.create({
      fullName,
      userName,
      email,
      password,
      deviceType,
      platform,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
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
        token,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Registration failed' 
      },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(registerUser);
