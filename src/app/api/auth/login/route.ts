import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { withApiKey } from '@/lib/apiKeyMiddleware';

async function loginUser(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Account is deactivated' 
        },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      );
    }

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
      message: 'Login successful',
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
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Login failed' 
      },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(loginUser);
