# Haya Travel - API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the Haya Travel application. The API follows RESTful conventions and uses JWT authentication with API key middleware for security.

## Base URL
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

## Authentication
All API routes (except auth and payment webhooks) require:
1. **API Key**: Sent in `X-API-Key` header
2. **JWT Token**: Sent in `Authorization: Bearer <token>` header (for admin routes)

## API Key Middleware
- **Header**: `X-API-Key: your-api-key`
- **Environment Variable**: `NEXT_PUBLIC_API_KEY`
- **Excluded Routes**: 
  - `/api/auth/login`
  - `/api/auth/register`
  - `/api/payment/tabby/webhook`

---

## Authentication Endpoints

### POST /api/auth/login
Login user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "admin",
      "name": "User Name"
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### POST /api/auth/register
Register new user.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "user",
      "name": "User Name"
    },
    "token": "jwt_token_here"
  },
  "message": "User registered successfully"
}
```

---

## Admin Tour Management

### GET /api/admin/tours
Get all tours with pagination and filtering.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `category` (optional): Filter by category ID
- `type` (optional): Filter by type ID
- `isActive` (optional): Filter by active status

**Response:**
```json
{
  "success": true,
  "data": {
    "tours": [
      {
        "_id": "tour_id",
        "title": {
          "en": "Tour Title",
          "ar": "عنوان الجولة"
        },
        "description": {
          "en": "Tour description",
          "ar": "وصف الجولة"
        },
        "price": 1000,
        "duration": 5,
        "category": "category_id",
        "type": "type_id",
        "isActive": true,
        "isFeatured": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "Tours fetched successfully"
}
```

### GET /api/admin/tours/[id]
Get single tour by ID.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "tour": {
      "_id": "tour_id",
      "title": {
        "en": "Tour Title",
        "ar": "عنوان الجولة"
      },
      "description": {
        "en": "Tour description",
        "ar": "وصف الجولة"
      },
      "price": 1000,
      "duration": 5,
      "category": "category_id",
      "type": "type_id",
      "highlights": {
        "en": ["Highlight 1", "Highlight 2"],
        "ar": ["النقطة المميزة 1", "النقطة المميزة 2"]
      },
      "inclusions": {
        "en": ["Included 1", "Included 2"],
        "ar": ["مشمول 1", "مشمول 2"]
      },
      "exclusions": {
        "en": ["Not included 1"],
        "ar": ["غير مشمول 1"]
      },
      "isActive": true,
      "isFeatured": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Tour fetched successfully"
}
```

### POST /api/admin/tours
Create new tour.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Request Body:**
```json
{
  "title": {
    "en": "Tour Title",
    "ar": "عنوان الجولة"
  },
  "description": {
    "en": "Tour description",
    "ar": "وصف الجولة"
  },
  "shortDescription": {
    "en": "Short description",
    "ar": "وصف مختصر"
  },
  "price": 1000,
  "originalPrice": 1200,
  "duration": 5,
  "category": "category_id",
  "type": "type_id",
  "source": "region_id",
  "destination": "region_id",
  "difficulty": "easy",
  "maxGroupSize": 20,
  "minGroupSize": 2,
  "highlights": {
    "en": ["Highlight 1", "Highlight 2"],
    "ar": ["النقطة المميزة 1", "النقطة المميزة 2"]
  },
  "inclusions": {
    "en": ["Included 1", "Included 2"],
    "ar": ["مشمول 1", "مشمول 2"]
  },
  "exclusions": {
    "en": ["Not included 1"],
    "ar": ["غير مشمول 1"]
  },
  "requirements": ["Requirement 1", "Requirement 2"],
  "tags": ["tag1", "tag2"],
  "departureDate": "2024-06-01T00:00:00.000Z",
  "returnDate": "2024-06-05T00:00:00.000Z",
  "cancellationPolicy": "Free cancellation up to 24 hours",
  "isActive": true,
  "isFeatured": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tour": {
      "_id": "new_tour_id",
      "title": {
        "en": "Tour Title",
        "ar": "عنوان الجولة"
      },
      "slug": "tour-title",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Tour created successfully"
}
```

### PUT /api/admin/tours/[id]
Update existing tour.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Request Body:** Same as POST /api/admin/tours

**Response:**
```json
{
  "success": true,
  "data": {
    "tour": {
      "_id": "tour_id",
      "title": {
        "en": "Updated Tour Title",
        "ar": "عنوان الجولة المحدث"
      },
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Tour updated successfully"
}
```

### DELETE /api/admin/tours/[id]
Delete tour.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "message": "Tour deleted successfully"
}
```

---

## Reference Data Endpoints

### GET /api/admin/categories
Get all tour categories.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "_id": "category_id",
        "title": "Adventure",
        "description": "Exciting adventure tours",
        "entityType": "tour",
        "isActive": true,
        "sortOrder": 1
      }
    ]
  },
  "message": "Categories fetched successfully"
}
```

### GET /api/admin/types
Get all tour types.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "types": [
      {
        "_id": "type_id",
        "title": "Domestic",
        "description": "Domestic tours within the country",
        "entityType": "tour",
        "isActive": true,
        "sortOrder": 1
      }
    ]
  },
  "message": "Types fetched successfully"
}
```

### GET /api/admin/tags
Get all tour tags.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "tags": [
      {
        "_id": "tag_id",
        "title": "Family Friendly",
        "description": "Suitable for families",
        "color": "#10B981",
        "entityType": "tour",
        "isActive": true,
        "sortOrder": 1
      }
    ]
  },
  "message": "Tags fetched successfully"
}
```

### GET /api/admin/regions
Get all regions (for source/destination).

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": [
      {
        "_id": "region_id",
        "name": "Paris",
        "country": "France",
        "countryCode": "FRA",
        "description": "The City of Light",
        "isActive": true,
        "sortOrder": 1
      }
    ]
  },
  "message": "Regions fetched successfully"
}
```

---

## User Management

### GET /api/admin/users
Get all users with pagination.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `role` (optional): Filter by role

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "role": "user",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "Users fetched successfully"
}
```

### GET /api/admin/users/stats
Get user statistics.

**Headers:**
- `X-API-Key: your-api-key`
- `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "activeUsers": 120,
    "newUsersThisMonth": 25,
    "usersByRole": {
      "admin": 5,
      "user": 145
    }
  },
  "message": "User statistics fetched successfully"
}
```

---

## Payment Integration

### POST /api/payment/tabby/create
Create Tabby payment session.

**Headers:**
- `X-API-Key: your-api-key`

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "SAR",
  "orderId": "order_123",
  "customer": {
    "name": "Customer Name",
    "email": "customer@example.com",
    "phone": "+966501234567"
  },
  "items": [
    {
      "title": "Tour Package",
      "description": "5-day tour package",
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://checkout.tabby.ai/payment/...",
    "paymentId": "payment_id"
  },
  "message": "Payment session created successfully"
}
```

### POST /api/payment/tabby/verify
Verify Tabby payment.

**Headers:**
- `X-API-Key: your-api-key`

**Request Body:**
```json
{
  "paymentId": "payment_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "completed",
    "orderId": "order_123",
    "amount": 1000
  },
  "message": "Payment verified successfully"
}
```

### POST /api/payment/tabby/webhook
Tabby webhook endpoint (no authentication required).

**Request Body:**
```json
{
  "id": "webhook_id",
  "event": "payment.completed",
  "data": {
    "payment": {
      "id": "payment_id",
      "status": "completed",
      "amount": 1000
    }
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (missing/invalid API key or token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting
- **API Key Routes**: 100 requests per minute per API key
- **Auth Routes**: 10 requests per minute per IP
- **Webhook Routes**: No rate limiting

---

## Data Models

### Tour Model
```typescript
interface Tour {
  _id: string;
  title: MultilingualContent;
  slug: string;
  description: MultilingualContent;
  shortDescription: MultilingualContent;
  category: ObjectId;
  type: ObjectId;
  source: ObjectId;
  destination: ObjectId;
  price: number;
  originalPrice?: number;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'expert';
  maxGroupSize: number;
  minGroupSize: number;
  highlights: MultilingualArray;
  inclusions: MultilingualArray;
  exclusions: MultilingualArray;
  requirements: string[];
  tags: ObjectId[];
  images: string[];
  featuredImage: string;
  departureDate: Date;
  returnDate: Date;
  isActive: boolean;
  isFeatured: boolean;
  isTranslatable: boolean;
  defaultLanguage: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### MultilingualContent
```typescript
interface MultilingualContent {
  en: string;
  ar: string;
  fr?: string;
  es?: string;
  de?: string;
  it?: string;
  pt?: string;
  ru?: string;
  zh?: string;
  ja?: string;
  ko?: string;
  hi?: string;
}
```

### MultilingualArray
```typescript
interface MultilingualArray {
  en: string[];
  ar: string[];
  fr?: string[];
  es?: string[];
  de?: string[];
  it?: string[];
  pt?: string[];
  ru?: string[];
  zh?: string[];
  ja?: string[];
  ko?: string[];
  hi?: string[];
}
```

---

## Testing

### Using Postman
1. Import the API collection
2. Set environment variables:
   - `base_url`: `http://localhost:3000`
   - `api_key`: Your API key
   - `admin_token`: Admin JWT token

### Using cURL
```bash
# Get tours
curl -X GET "http://localhost:3000/api/admin/tours" \
  -H "X-API-Key: your-api-key" \
  -H "Authorization: Bearer your-admin-token"

# Create tour
curl -X POST "http://localhost:3000/api/admin/tours" \
  -H "X-API-Key: your-api-key" \
  -H "Authorization: Bearer your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{"title":{"en":"Test Tour","ar":"جولة تجريبية"},"price":1000}'
```

---

## Support
For API support and questions, contact the development team or refer to the project documentation.

