import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Test API called');
    console.log('Headers:', Object.fromEntries(request.headers.entries()));
    
    return NextResponse.json({
      success: true,
      message: 'Test API working',
      headers: Object.fromEntries(request.headers.entries())
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { success: false, message: 'Test API failed' },
      { status: 500 }
    );
  }
}

