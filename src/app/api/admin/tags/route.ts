import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tag from '@/models/Tag';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType');

    const query: any = { isActive: true };
    if (entityType) {
      query.entityType = entityType;
    }

    const tags = await Tag.find(query).sort({ sortOrder: 1, title: 1 });

    return NextResponse.json({
      success: true,
      data: { tags },
      message: 'Tags fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tagData = await request.json();
    const tag = new Tag(tagData);
    await tag.save();

    return NextResponse.json({
      success: true,
      data: { tag },
      message: 'Tag created successfully',
    });
  } catch (error: any) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create tag' },
      { status: 500 }
    );
  }
}