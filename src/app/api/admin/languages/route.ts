import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Language from '@/models/Language';

export async function GET(request: NextRequest) {
  try {
    console.log('📝 Fetching languages...');
    await connectDB();

    const languages = await Language.find({ 
      isActive: true 
    }).sort({ sortOrder: 1, name: 1 });

    console.log(`✅ Found ${languages.length} languages`);

    return NextResponse.json({
      success: true,
      data: { languages },
      message: 'Languages fetched successfully',
    });
  } catch (error: any) {
    console.error('❌ Error fetching languages:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}
