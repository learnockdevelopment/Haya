import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Type from '@/models/Type';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType');

    const query: any = { isActive: true };
    if (entityType) {
      query.entityType = entityType;
    }

    const types = await Type.find(query).sort({ sortOrder: 1, title: 1 });

    return NextResponse.json({
      success: true,
      data: { types },
      message: 'Types fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching types:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch types' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const typeData = await request.json();
    const type = new Type(typeData);
    await type.save();

    return NextResponse.json({
      success: true,
      data: { type },
      message: 'Type created successfully',
    });
  } catch (error: any) {
    console.error('Error creating type:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create type' },
      { status: 500 }
    );
  }
}
