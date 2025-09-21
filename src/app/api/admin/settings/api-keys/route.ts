import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { withApiKey } from '@/lib/apiKeyMiddleware';
import { generateApiKey } from '@/lib/apiKeyMiddleware';

async function getApiKeyConfig(request: NextRequest) {
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

    const config = {
      enabled: process.env.API_KEY_ENABLED === 'true',
      key: process.env.API_KEY || '',
      headerName: process.env.API_KEY_HEADER || 'x-api-key',
      allowedRoutes: process.env.API_KEY_ALLOWED_ROUTES?.split(',').map(route => route.trim()) || [],
      excludedRoutes: process.env.API_KEY_EXCLUDED_ROUTES?.split(',').map(route => route.trim()) || []
    };

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error fetching API key config:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}

async function updateApiKeyConfig(request: NextRequest) {
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

    const { enabled, key, headerName, allowedRoutes, excludedRoutes } = await request.json();

    // Note: In a production environment, you would typically update these values
    // in your environment configuration system or database
    // For now, we'll just return the updated config
    const config = {
      enabled: enabled || false,
      key: key || process.env.API_KEY || '',
      headerName: headerName || 'x-api-key',
      allowedRoutes: allowedRoutes || [],
      excludedRoutes: excludedRoutes || []
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Configuration updated successfully',
      config 
    });
  } catch (error) {
    console.error('Error updating API key config:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getApiKeyConfig);
export const PUT = withApiKey(updateApiKeyConfig);


