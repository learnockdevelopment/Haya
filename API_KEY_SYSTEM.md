# API Key Middleware System

## Overview

This system provides secure API key validation for your Next.js API routes. It allows you to protect specific endpoints while excluding others (like authentication routes) from API key validation.

## Features

- ✅ **Secure API Key Validation**: Protect your API endpoints with API key authentication
- ✅ **Configurable Routes**: Include/exclude specific routes from validation
- ✅ **Admin Panel Management**: Manage API keys through the admin interface
- ✅ **Environment Configuration**: Easy setup through environment variables
- ✅ **Flexible Header Names**: Customize the API key header name
- ✅ **Error Handling**: Proper error responses for invalid/missing keys

## Configuration

### Environment Variables

Add these variables to your `.env.local` file:

```env
# API Key Configuration
API_KEY_ENABLED=true
API_KEY=your-super-secure-api-key-here-32-chars-min
API_KEY_HEADER=x-api-key
API_KEY_ALLOWED_ROUTES=
API_KEY_EXCLUDED_ROUTES=/api/auth/login,/api/auth/register,/api/payment/tabby/webhook
```

### Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `API_KEY_ENABLED` | Enable/disable API key validation | `false` |
| `API_KEY` | Your secret API key | Required |
| `API_KEY_HEADER` | Header name for API key | `x-api-key` |
| `API_KEY_ALLOWED_ROUTES` | Comma-separated list of protected routes (empty = all routes) | All `/api/*` routes |
| `API_KEY_EXCLUDED_ROUTES` | Comma-separated list of excluded routes | None |

## Usage

### 1. Generate API Key

Run the script to generate a secure API key:

```bash
node scripts/generate-api-key.js
```

### 2. Apply Middleware to API Routes

```typescript
import { withApiKey } from '@/lib/apiKeyMiddleware';

async function myApiHandler(request: NextRequest) {
  // Your API logic here
  return NextResponse.json({ success: true });
}

export const GET = withApiKey(myApiHandler);
export const POST = withApiKey(myApiHandler);
```

### 3. Make API Requests

Include the API key in your requests:

```bash
curl -H "x-api-key: your-api-key-here" \
  http://localhost:3000/api/tours
```

```javascript
fetch('/api/tours', {
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  }
});
```

## Admin Panel

Access the API key management through:
- **URL**: `http://localhost:3000/admin/api-keys`
- **Features**:
  - View current configuration
  - Generate new API keys
  - Toggle API key validation
  - Manage allowed/excluded routes
  - Copy API key to clipboard

## API Routes Status

### Protected Routes (Require API Key)
**ALL API ROUTES** are protected by default, including:
- `/api/tours` - Tour management
- `/api/testimonials` - Testimonial management
- `/api/admin/*` - All admin routes
- `/api/profile/*` - User profile management
- `/api/payment/*` - Payment processing (except webhook)
- `/api/debug/*` - Debug endpoints
- `/api/seed/*` - Data seeding endpoints

### Excluded Routes (No API Key Required)
- `/api/auth/login` - User login
- `/api/auth/register` - User registration
- `/api/payment/tabby/webhook` - Payment webhooks

## Error Responses

### Missing API Key (401)
```json
{
  "success": false,
  "message": "Missing x-api-key header",
  "error": "API_KEY_ERROR"
}
```

### Invalid API Key (403)
```json
{
  "success": false,
  "message": "Invalid API key",
  "error": "API_KEY_ERROR"
}
```

## Testing

Run the test script to verify functionality:

```bash
node scripts/test-api-key.js
```

This will test:
- Requests without API key (should fail)
- Requests with wrong API key (should fail)
- Requests with correct API key (should succeed)
- Excluded routes (should work without API key)

## Security Best Practices

1. **Keep API Keys Secret**: Never commit API keys to version control
2. **Use Strong Keys**: Generate keys with sufficient entropy (32+ characters)
3. **Rotate Keys**: Regularly generate new API keys
4. **Monitor Usage**: Track API key usage and revoke compromised keys
5. **HTTPS Only**: Always use HTTPS in production
6. **Rate Limiting**: Consider implementing rate limiting for additional security

## Implementation Details

### Middleware Functions

- `withApiKey(handler)`: Wraps API handlers with API key validation
- `validateApiKey(request)`: Validates API key from request headers
- `shouldValidateApiKey(request)`: Determines if route should be validated
- `generateApiKey()`: Generates secure random API keys

### File Structure

```
src/
├── lib/
│   └── apiKeyMiddleware.ts          # Core middleware functions
├── app/
│   ├── api/
│   │   └── admin/settings/api-keys/ # API key management endpoints
│   └── admin/
│       └── api-keys/
│           └── page.tsx             # Admin panel interface
└── scripts/
    ├── generate-api-key.js          # Key generation script
    └── test-api-key.js              # Testing script
```

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Check if `API_KEY_ENABLED=true` in environment
   - Verify API key matches exactly (no extra spaces)
   - Ensure correct header name is used

2. **Routes Not Protected**
   - Check `API_KEY_ALLOWED_ROUTES` configuration
   - Verify route paths match exactly
   - Ensure middleware is applied to route handlers

3. **Excluded Routes Still Requiring API Key**
   - Check `API_KEY_EXCLUDED_ROUTES` configuration
   - Verify route paths match exactly
   - Ensure excluded routes are properly configured

### Debug Mode

Enable debug logging by adding console.log statements in the middleware:

```typescript
console.log('API Key Validation:', {
  enabled: config.enabled,
  headerName: config.headerName,
  pathname: request.nextUrl.pathname,
  shouldValidate: shouldValidateApiKey(request)
});
```

## Production Deployment

1. **Environment Variables**: Set all required environment variables
2. **API Key Rotation**: Implement regular key rotation
3. **Monitoring**: Set up monitoring for API key usage
4. **Documentation**: Document API key requirements for API consumers
5. **Rate Limiting**: Consider implementing rate limiting
6. **Logging**: Enable detailed logging for security monitoring

## Support

For issues or questions about the API key system:
1. Check the troubleshooting section
2. Review the test script output
3. Verify environment configuration
4. Check admin panel for current settings

