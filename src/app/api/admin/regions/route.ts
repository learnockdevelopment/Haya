import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Region from '@/models/Region';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const regions = await Region.find({ 
      isActive: true 
    }).sort({ country: 1, name: 1 });

    return NextResponse.json({
      success: true,
      data: { regions },
      message: 'Regions fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching regions:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch regions' },
      { status: 500 }
    );
  }
}
