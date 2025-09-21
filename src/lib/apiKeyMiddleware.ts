import { NextRequest, NextResponse } from 'next/server';

export interface ApiKeyConfig {
  enabled: boolean;
  key: string;
  headerName: string;
  allowedRoutes?: string[];
  excludedRoutes?: string[];
}

export class ApiKeyError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = 'ApiKeyError';
  }
}

export function validateApiKey(request: NextRequest): boolean {
  const config = getApiKeyConfig();
  
  // If API key validation is disabled, allow all requests
  if (!config.enabled) {
    return true;
  }

  // Get API key from header
  const apiKey = request.headers.get(config.headerName);
  
  if (!apiKey) {
    throw new ApiKeyError(`Missing ${config.headerName} header`, 401);
  }

  // Validate API key
  if (apiKey !== config.key) {
    throw new ApiKeyError('Invalid API key', 403);
  }

  return true;
}

export function getApiKeyConfig(): ApiKeyConfig {
  return {
    enabled: false, // Temporarily disabled for testing
    key: process.env.API_KEY || 'test-key',
    headerName: process.env.API_KEY_HEADER || 'x-api-key',
    allowedRoutes: process.env.API_KEY_ALLOWED_ROUTES?.split(',').map(route => route.trim()) || [],
    excludedRoutes: process.env.API_KEY_EXCLUDED_ROUTES?.split(',').map(route => route.trim()) || []
  };
}

export function shouldValidateApiKey(request: NextRequest): boolean {
  const config = getApiKeyConfig();
  
  if (!config.enabled) {
    return false;
  }

  const pathname = request.nextUrl.pathname;
  
  // Check if route is explicitly excluded
  if (config.excludedRoutes && config.excludedRoutes.length > 0) {
    for (const excludedRoute of config.excludedRoutes) {
      if (pathname.includes(excludedRoute)) {
        return false;
      }
    }
  }

  // Check if route is in allowed routes (if specified)
  if (config.allowedRoutes && config.allowedRoutes.length > 0) {
    return config.allowedRoutes.some(route => pathname.includes(route));
  }

  // If no specific allowed routes configured, validate ALL API routes by default
  return pathname.startsWith('/api/');
}

export function withApiKey(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Check if this route should be validated
      if (shouldValidateApiKey(request)) {
        validateApiKey(request);
      }
      
      // Call the original handler
      return await handler(request);
    } catch (error) {
      if (error instanceof ApiKeyError) {
        return NextResponse.json(
          { 
            success: false, 
            message: error.message,
            error: 'API_KEY_ERROR'
          },
          { status: error.statusCode }
        );
      }
      
      // Re-throw other errors
      throw error;
    }
  };
}

export function createApiKeyResponse(message: string, statusCode: number = 401) {
  return NextResponse.json(
    { 
      success: false, 
      message,
      error: 'API_KEY_ERROR'
    },
    { status: statusCode }
  );
}

// Utility function to generate a secure API key
export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Middleware for Next.js middleware.ts
export function apiKeyMiddleware(request: NextRequest): NextResponse | null {
  try {
    if (shouldValidateApiKey(request)) {
      validateApiKey(request);
    }
    return null; // Allow request to continue
  } catch (error) {
    if (error instanceof ApiKeyError) {
      return createApiKeyResponse(error.message, error.statusCode);
    }
    throw error;
  }
}

