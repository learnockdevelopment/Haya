import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';

async function testHandler(request: NextRequest) {
  try {
    console.log('Protected test API called');
    console.log('Headers:', Object.fromEntries(request.headers.entries()));
    
    return NextResponse.json({
      success: true,
      message: 'Protected test API working',
      headers: Object.fromEntries(request.headers.entries())
    });
  } catch (error) {
    console.error('Protected test API error:', error);
    return NextResponse.json(
      { success: false, message: 'Protected test API failed' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(testHandler);

