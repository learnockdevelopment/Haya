import { NextRequest, NextResponse } from 'next/server';
import { withApiKey } from '@/lib/apiKeyMiddleware';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

async function postHandler(request: NextRequest) {
  try {
    console.log('Starting avatar upload...');
    await connectDB();
    console.log('Database connected successfully');

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      console.log('No token provided');
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log('Token decoded, userId:', decoded.id);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    console.log('User found:', user.email);

    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    console.log('File received:', file ? `${file.name} (${file.size} bytes, ${file.type})` : 'No file');

    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json({ message: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File too large:', file.size);
      return NextResponse.json({ message: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'avatars');
    console.log('Uploads directory:', uploadsDir);
    
    if (!existsSync(uploadsDir)) {
      console.log('Creating uploads directory...');
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${user._id}-${Date.now()}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);
    console.log('Saving file to:', filePath);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    console.log('File saved successfully');

    // Update user avatar
    const avatarUrl = `/uploads/avatars/${fileName}`;
    user.avatar = avatarUrl;
    await user.save();
    console.log('User avatar updated:', avatarUrl);

    return NextResponse.json({
      message: 'Avatar uploaded successfully',
      avatar: avatarUrl,
    });

  } catch (error: any) {
    console.error('Avatar upload error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);
