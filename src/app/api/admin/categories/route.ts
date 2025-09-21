import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    console.log('📝 Fetching categories...');
    await connectDB();

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType');

    const query: any = { isActive: true };
    if (entityType) {
      query.entityType = entityType;
    }

    const categories = await Category.find(query).sort({ sortOrder: 1, title: 1 });

    console.log(`✅ Found ${categories.length} categories`);

    return NextResponse.json({
      success: true,
      data: { categories },
      message: 'Categories fetched successfully',
    });
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Creating new category...');
    await connectDB();

    const categoryData = await request.json();
    const category = new Category(categoryData);
    await category.save();

    console.log(`✅ Category created: ${category.title}`);

    return NextResponse.json({
      success: true,
      data: { category },
      message: 'Category created successfully',
    });
  } catch (error: any) {
    console.error('❌ Error creating category:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
