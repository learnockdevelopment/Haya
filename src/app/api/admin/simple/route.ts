import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';

async function simpleHandler(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: { message: 'Simple admin API working' },
    });
  } catch (error) {
    console.error('Simple API error:', error);
    return NextResponse.json(
      { success: false, message: 'Simple API failed' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(simpleHandler);

