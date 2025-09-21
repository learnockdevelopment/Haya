import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

interface TranslationSettings {
  isTranslatable: boolean;
  defaultLanguage: string;
  enabledLanguages: string[];
  autoTranslate: boolean;
  translationProvider: string;
  translationApiKey?: string;
}

async function getHandler(request: NextRequest) {
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

    // For now, return default settings
    // In a real app, you'd store these in a database
    const settings: TranslationSettings = {
      isTranslatable: true,
      defaultLanguage: 'en',
      enabledLanguages: ['en', 'ar'],
      autoTranslate: false,
      translationProvider: 'manual',
      translationApiKey: ''
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching translation settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = withApiKey(getHandler);

async function putHandler(request: NextRequest) {
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
    const settings: TranslationSettings = body;

    // Validate settings
    if (!Array.isArray(settings.enabledLanguages) || settings.enabledLanguages.length === 0) {
      return NextResponse.json({ error: 'At least one language must be enabled' }, { status: 400 });
    }

    if (!settings.enabledLanguages.includes(settings.defaultLanguage)) {
      return NextResponse.json({ error: 'Default language must be in enabled languages' }, { status: 400 });
    }

    // In a real app, you'd save these settings to a database
    // For now, we'll just return success
    console.log('Translation settings updated:', settings);

    return NextResponse.json({ message: 'Translation settings updated successfully' });
  } catch (error) {
    console.error('Error updating translation settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const PUT = withApiKey(putHandler);



