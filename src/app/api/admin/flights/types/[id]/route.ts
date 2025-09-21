import { NextRequest, NextResponse } from 'next/server';
import { withApiKey } from '@/lib/apiKeyMiddleware';
import connectDB from '@/lib/mongodb';
import Type from '@/models/Type';
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

    const types = await Type.findOne({ _id: params.id, type: 'flights' });
    if (!types) {
      return NextResponse.json({ error: 'Type not found' }, { status: 404 });
    }

    return NextResponse.json(types);
  } catch (error) {
    console.error('Error fetching flights types:', error);
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
    const { title, description, shortDescription, icon } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const types = await Type.findOneAndUpdate(
      { _id: params.id, type: 'flights' },
      {
        title,
        description, shortDescription, icon, slug
      },
      { new: true }
    );

    if (!types) {
      return NextResponse.json({ error: 'Type not found' }, { status: 404 });
    }

    return NextResponse.json(types);
  } catch (error) {
    console.error('Error updating flights types:', error);
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

    const types = await Type.findOneAndDelete({ _id: params.id, type: 'flights' });
    if (!types) {
      return NextResponse.json({ error: 'Type not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Type deleted successfully' });
  } catch (error) {
    console.error('Error deleting flights types:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}