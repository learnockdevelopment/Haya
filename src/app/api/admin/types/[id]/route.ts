import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Type from '@/models/Type';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const type = await Type.findById(params.id);
    
    if (!type) {
      return NextResponse.json(
        { message: 'Type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { type },
      message: 'Type fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching type:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch type' },
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
    const typeData = await request.json();
    
    const type = await Type.findByIdAndUpdate(
      params.id,
      typeData,
      { new: true, runValidators: true }
    );

    if (!type) {
      return NextResponse.json(
        { message: 'Type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { type },
      message: 'Type updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating type:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to update type' },
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
    
    const type = await Type.findByIdAndDelete(params.id);

    if (!type) {
      return NextResponse.json(
        { message: 'Type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Type deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting type:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to delete type' },
      { status: 500 }
    );
  }
}
