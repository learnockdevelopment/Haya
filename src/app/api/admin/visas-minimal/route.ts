import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';

async function getHandler(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: { 
        visas: [],
        total: 0,
        page: 1,
        limit: 10
      },
    });
  } catch (error) {
    console.error('Error fetching visas:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch visas' },
      { status: 500 }
    );
  }
}

export const GET = withApiKey(getHandler);

