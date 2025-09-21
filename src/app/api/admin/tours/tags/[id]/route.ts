import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tag from '@/models/Tag';
import jwt from 'jsonwebtoken';

async function getHandler(
  request: NextRequest,
  { params }

export const GET = withApiKey(getHandler);: { params: { id: string } }
) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const tag = await Tag.findOne({ _id: params.id, type: 'tour' });
    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error fetching tour tag:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function putHandler(
  request: NextRequest,
  { params }

export const PUT = withApiKey(putHandler);: { params: { id: string } }
) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const tag = await Tag.findOneAndUpdate(
      { _id: params.id, type: 'tour' },
      {
        name,
        slug
      },
      { new: true }
    );

    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error updating tour tag:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function deleteHandler(
  request: NextRequest,
  { params }

export const DELETE = withApiKey(deleteHandler);: { params: { id: string } }
) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const tag = await Tag.findOneAndDelete({ _id: params.id, type: 'tour' });
    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tour tag:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



