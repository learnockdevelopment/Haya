# Haya Travel - Project Flow Documentation

## Overview
This document describes the complete flow and architecture of the Haya Travel application, including user journeys, data flow, and system interactions.

## System Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context (Auth, Language)
- **UI Components**: Custom component library
- **Multilingual**: Custom multilingual system

### Backend (Next.js API Routes)
- **API Routes**: Next.js API routes with middleware
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens + API key middleware
- **Payment**: Tabby integration
- **File Upload**: Local storage (can be extended to cloud)

### Database (MongoDB)
- **Collections**: Users, Tours, Categories, Types, Tags, Regions, Reviews, Testimonials
- **Multilingual**: Embedded multilingual content in documents
- **References**: ObjectId references between collections

---

## User Journeys

### 1. Admin User Journey

#### 1.1 Login Process
```
1. Admin visits /login
2. Enters credentials (email, password)
3. POST /api/auth/login
4. Receives JWT token
5. Redirected to /admin/dashboard
6. Token stored in localStorage
```

#### 1.2 Tour Management
```
1. Admin visits /admin/tours
2. Views list of tours with pagination
3. Can perform actions:
   - View tour details (/admin/tours/[id])
   - Edit tour (/admin/tours/[id]/edit)
   - Create new tour (/admin/tours/new)
   - Delete tour (API call)
```

#### 1.3 Create Tour Flow
```
1. Admin clicks "Create Tour"
2. Redirected to /admin/tours/new
3. Form loads with reference data:
   - Categories (from /api/admin/categories)
   - Types (from /api/admin/types)
   - Tags (from /api/admin/tags)
   - Regions (from /api/admin/regions)
4. Admin fills multilingual form:
   - Title (EN/AR)
   - Description (EN/AR)
   - Short Description (EN/AR)
   - Highlights (EN/AR arrays)
   - Inclusions (EN/AR arrays)
   - Exclusions (EN/AR arrays)
5. Form submission:
   - POST /api/admin/tours
   - Data processed and validated
   - Multilingual content structured
   - References converted to ObjectIds
   - Tour saved to database
6. Success: Redirect to /admin/tours
```

#### 1.4 Edit Tour Flow
```
1. Admin clicks "Edit" on tour
2. Redirected to /admin/tours/[id]/edit
3. Form pre-populated with tour data
4. Reference data loaded (categories, types, etc.)
5. Admin modifies data
6. Form submission:
   - PUT /api/admin/tours/[id]
   - Data updated in database
7. Success: Redirect to /admin/tours
```

### 2. Regular User Journey

#### 2.1 Registration/Login
```
1. User visits /register or /login
2. Enters credentials
3. POST /api/auth/register or /api/auth/login
4. Receives JWT token
5. Redirected to /dashboard
```

#### 2.2 Browse Tours
```
1. User visits homepage (/)
2. Tours displayed with multilingual content
3. Can filter by category, type, price
4. Can search tours
5. Click on tour for details
```

#### 2.3 Book Tour
```
1. User selects tour
2. Fills booking form
3. Payment integration (Tabby)
4. Booking confirmation
```

---

## Data Flow

### 1. Multilingual Content Flow

#### 1.1 Content Creation
```
1. Admin selects language (EN/AR)
2. Inputs content in selected language
3. Content stored as:
   {
     "en": "English content",
     "ar": "Arabic content"
   }
4. Saved to database with proper structure
```

#### 1.2 Content Display
```
1. User visits page
2. Language context determines display language
3. Content extracted from multilingual object:
   - getLocalizedString(content, 'en') for English
   - getLocalizedString(content, 'ar') for Arabic
4. Rendered in selected language
```

### 2. Reference Data Flow

#### 2.1 Database Seeding
```
1. Run seeding script: node scripts/seed-all-reference-data.js
2. Creates reference collections:
   - Categories (Adventure, Cultural, Beach, etc.)
   - Types (Domestic, International, Local, etc.)
   - Tags (Family Friendly, Budget, Luxury, etc.)
   - Regions (Paris, Rome, Tokyo, etc.)
3. Data available for forms and filtering
```

#### 2.2 Form Population
```
1. Admin opens create/edit form
2. useEffect triggers data fetching:
   - GET /api/admin/categories
   - GET /api/admin/types
   - GET /api/admin/tags
   - GET /api/admin/regions
3. Data loaded into form dropdowns
4. User selects from populated options
```

### 3. API Request Flow

#### 3.1 Authenticated Request
```
1. Frontend makes API call
2. apiClient adds headers:
   - X-API-Key: process.env.NEXT_PUBLIC_API_KEY
   - Authorization: Bearer <token>
3. API middleware validates:
   - API key (withApiKey middleware)
   - JWT token (for admin routes)
4. Request processed
5. Response returned to frontend
```

#### 3.2 Error Handling
```
1. API returns error response
2. Frontend catches error
3. User sees appropriate message
4. Error logged for debugging
```

---

## Component Architecture

### 1. Layout Components
```
src/components/layout/
├── Navbar.tsx          # Main navigation
├── Footer.tsx          # Site footer
└── AdminSidebar.tsx    # Admin navigation
```

### 2. UI Components
```
src/components/ui/
├── Button.tsx          # Reusable button
├── Input.tsx           # Form input
├── LoadingSpinner.tsx  # Loading indicator
└── Modal.tsx           # Modal dialog
```

### 3. Admin Components
```
src/components/admin/
├── SimpleMultilingualInput.tsx  # Multilingual form input
├── TourCard.tsx                 # Tour display card
└── DataTable.tsx                # Data table with pagination
```

### 4. Page Components
```
src/app/
├── page.tsx                     # Homepage
├── admin/
│   ├── page.tsx                 # Admin dashboard
│   ├── tours/
│   │   ├── page.tsx             # Tours list
│   │   ├── new/page.tsx         # Create tour
│   │   └── [id]/
│   │       ├── page.tsx         # View tour
│   │       └── edit/page.tsx    # Edit tour
│   ├── users/page.tsx           # Users management
│   └── settings/page.tsx        # Admin settings
└── api/                         # API routes
```

---

## Database Schema

### 1. Collections Overview
```
haya-travel/
├── users          # User accounts
├── tours          # Tour packages
├── categories     # Tour categories
├── types          # Tour types
├── tags           # Tour tags
├── regions        # Source/destination regions
├── reviews        # Tour reviews
├── testimonials   # Customer testimonials
└── bookings       # Tour bookings
```

### 2. Key Relationships
```
Tours:
├── category → Categories._id
├── type → Types._id
├── source → Regions._id
├── destination → Regions._id
└── tags → [Tags._id]

Bookings:
├── user → Users._id
└── tour → Tours._id

Reviews:
├── user → Users._id
└── tour → Tours._id
```

---

## Security Implementation

### 1. API Key Middleware
```typescript
// All API routes protected with API key
export const GET = withApiKey(handler);
export const POST = withApiKey(handler);
export const PUT = withApiKey(handler);
export const DELETE = withApiKey(handler);
```

### 2. JWT Authentication
```typescript
// Admin routes require JWT token
const token = request.headers.get('authorization')?.replace('Bearer ', '');
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 3. Input Validation
```typescript
// Mongoose schema validation
const TourSchema = new Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: false }
  },
  price: { type: Number, required: true, min: 0 }
});
```

---

## Multilingual System

### 1. Language Context
```typescript
// LanguageContext provides current language
const { currentLanguage, setLanguage } = useLanguage();
// currentLanguage = { code: 'en', name: 'English', ... }
```

### 2. Content Structure
```typescript
// All multilingual content follows this structure
interface MultilingualContent {
  en: string;  // Required
  ar: string;  // Optional
  // Other languages optional
}
```

### 3. Content Display
```typescript
// Display content in current language
const displayTitle = content[currentLanguage.code] || content.en;
```

---

## Payment Integration

### 1. Tabby Payment Flow
```
1. User initiates payment
2. POST /api/payment/tabby/create
3. Tabby payment URL generated
4. User redirected to Tabby checkout
5. Payment completed on Tabby
6. Webhook received: POST /api/payment/tabby/webhook
7. Payment verified: POST /api/payment/tabby/verify
8. Booking confirmed
```

### 2. Webhook Security
```typescript
// Webhook signature verification
const signature = request.headers.get('x-tabby-signature');
const isValid = verifyWebhookSignature(payload, signature);
```

---

## File Upload System

### 1. Image Upload Flow
```
1. Admin selects image file
2. File uploaded to /api/upload
3. Image saved to public/uploads/
4. URL returned: /uploads/filename.jpg
5. URL stored in tour.images array
```

### 2. Image Processing
```typescript
// Future: Add image optimization
- Resize images
- Generate thumbnails
- Convert to WebP
- Upload to cloud storage
```

---

## Error Handling

### 1. Frontend Error Handling
```typescript
try {
  const response = await apiClient.post('/api/admin/tours', data);
  if (response.success) {
    // Success handling
  } else {
    // Show error message
  }
} catch (error) {
  // Network or other errors
  console.error('Error:', error);
  alert('An error occurred');
}
```

### 2. Backend Error Handling
```typescript
try {
  // Process request
  return NextResponse.json({ success: true, data });
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { success: false, message: error.message },
    { status: 500 }
  );
}
```

---

## Performance Optimization

### 1. Database Indexing
```typescript
// Tour schema indexes
TourSchema.index({ slug: 1 });
TourSchema.index({ category: 1, isActive: 1 });
TourSchema.index({ price: 1 });
TourSchema.index({ createdAt: -1 });
```

### 2. API Pagination
```typescript
// Paginated responses
const skip = (page - 1) * limit;
const tours = await Tour.find(query).skip(skip).limit(limit);
const total = await Tour.countDocuments(query);
```

### 3. Frontend Optimization
```typescript
// React optimization
- useMemo for expensive calculations
- useCallback for event handlers
- Lazy loading for admin pages
- Image optimization
```

---

## Deployment Flow

### 1. Development
```
1. Code changes in feature branch
2. Test locally with npm run dev
3. Run tests: npm test
4. Create pull request
```

### 2. Production
```
1. Merge to main branch
2. Build application: npm run build
3. Deploy to Vercel/Netlify
4. Environment variables configured
5. Database connection established
```

### 3. Environment Variables
```bash
# Required environment variables
MONGODB_URI=mongodb://localhost:27017/haya-travel
JWT_SECRET=your-jwt-secret
NEXT_PUBLIC_API_KEY=your-api-key
TABBY_API_KEY=your-tabby-key
TABBY_WEBHOOK_SECRET=your-webhook-secret
```

---

## Monitoring and Logging

### 1. Error Logging
```typescript
// API error logging
console.error('API Error:', {
  endpoint: request.url,
  method: request.method,
  error: error.message,
  timestamp: new Date().toISOString()
});
```

### 2. Performance Monitoring
```typescript
// Request timing
const start = Date.now();
// ... process request
const duration = Date.now() - start;
console.log(`Request processed in ${duration}ms`);
```

---

## Future Enhancements

### 1. Planned Features
- Real-time notifications
- Advanced search and filtering
- Mobile app (React Native)
- Multi-currency support
- Advanced analytics dashboard
- Email notifications
- SMS integration

### 2. Technical Improvements
- Redis caching
- CDN for images
- Database sharding
- Microservices architecture
- GraphQL API
- Real-time updates (WebSocket)

---

## Troubleshooting

### 1. Common Issues
- **401 Unauthorized**: Check API key and JWT token
- **404 Not Found**: Verify route exists and user has permissions
- **500 Internal Error**: Check server logs and database connection
- **Multilingual not working**: Verify content structure and language context

### 2. Debug Steps
1. Check browser console for errors
2. Verify API key in environment variables
3. Check database connection
4. Validate request/response data
5. Check server logs

---

## Support and Maintenance

### 1. Regular Maintenance
- Database backup
- Security updates
- Performance monitoring
- Error log review
- User feedback analysis

### 2. Contact Information
- Development Team: [Contact Info]
- Documentation: [Link to docs]
- Issue Tracker: [GitHub Issues]
- Support Email: [Support Email]

---

This documentation provides a comprehensive overview of the Haya Travel application flow, architecture, and implementation details. It should be updated as the system evolves and new features are added.

