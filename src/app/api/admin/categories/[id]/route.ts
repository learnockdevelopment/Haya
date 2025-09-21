import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { category },
      message: 'Category fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch category' },
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
    const categoryData = await request.json();
    
    const category = await Category.findByIdAndUpdate(
      params.id,
      categoryData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { category },
      message: 'Category updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to update category' },
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
    
    const category = await Category.findByIdAndDelete(params.id);

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}
