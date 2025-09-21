import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tag from '@/models/Tag';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tag = await Tag.findById(params.id);
    
    if (!tag) {
      return NextResponse.json(
        { message: 'Tag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { tag },
      message: 'Tag fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tagData = await request.json();
    
    const tag = await Tag.findByIdAndUpdate(
      params.id,
      tagData,
      { new: true, runValidators: true }
    );

    if (!tag) {
      return NextResponse.json(
        { message: 'Tag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { tag },
      message: 'Tag updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to update tag' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const tag = await Tag.findByIdAndDelete(params.id);

    if (!tag) {
      return NextResponse.json(
        { message: 'Tag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tag deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to delete tag' },
      { status: 500 }
    );
  }
}
