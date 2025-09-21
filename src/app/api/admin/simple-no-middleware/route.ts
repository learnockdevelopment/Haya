import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: { message: 'Simple admin API without middleware working' },
    });
  } catch (error) {
    console.error('Simple API error:', error);
    return NextResponse.json(
      { success: false, message: 'Simple API failed' },
      { status: 500 }
    );
  }
}

