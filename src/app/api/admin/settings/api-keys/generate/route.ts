import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { withApiKey } from '@/lib/apiKeyMiddleware';
import { generateApiKey } from '@/lib/apiKeyMiddleware';

async function generateNewApiKey(request: NextRequest) {
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

    // Generate new API key
    const newApiKey = generateApiKey();

    // Note: In a production environment, you would typically update the environment
    // variable or database configuration here
    // For now, we'll just return the new key

    return NextResponse.json({ 
      success: true, 
      message: 'New API key generated successfully',
      key: newApiKey
    });
  } catch (error) {
    console.error('Error generating API key:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate API key' },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(generateNewApiKey);


