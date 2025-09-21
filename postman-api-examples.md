# Postman API Testing Examples

## Setup

1. **Import Environment Variables**:
   - Create a new environment in Postman
   - Add variable: `api_key` = `c4a443e1ef1c6d2d9bbe288f73f559278973e95c83ca13937336f3585cc6af4d`
   - Add variable: `base_url` = `http://localhost:3000`

2. **Set Headers**:
   - Add header: `x-api-key` = `{{api_key}}`
   - Add header: `Content-Type` = `application/json`

## API Endpoints

### 1. Get Tours (Protected - Requires API Key)
- **Method**: GET
- **URL**: `{{base_url}}/api/tours`
- **Headers**: 
  - `x-api-key`: `{{api_key}}`
- **Expected Response**: 200 OK with tours data

### 2. Get Testimonials (Protected - Requires API Key)
- **Method**: GET
- **URL**: `{{base_url}}/api/testimonials`
- **Headers**: 
  - `x-api-key`: `{{api_key}}`
- **Expected Response**: 200 OK with testimonials data

### 3. Admin Routes (Protected - Requires API Key + JWT)
- **Method**: GET
- **URL**: `{{base_url}}/api/admin/tours/stats`
- **Headers**: 
  - `x-api-key`: `{{api_key}}`
  - `Authorization`: `Bearer {{jwt_token}}`
- **Expected Response**: 200 OK with admin data

### 4. Profile Routes (Protected - Requires API Key + JWT)
- **Method**: GET
- **URL**: `{{base_url}}/api/profile/update`
- **Headers**: 
  - `x-api-key`: `{{api_key}}`
  - `Authorization`: `Bearer {{jwt_token}}`
- **Expected Response**: 400 Bad Request (missing body)

### 5. User Login (Excluded - No API Key Required)
- **Method**: POST
- **URL**: `{{base_url}}/api/auth/login`
- **Headers**: 
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**: 200 OK with user data

### 6. User Registration (Excluded - No API Key Required)
- **Method**: POST
- **URL**: `{{base_url}}/api/auth/register`
- **Headers**: 
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**: 201 Created with user data

### 5. Admin Tours (Protected)
- **Method**: GET
- **URL**: `{{base_url}}/api/admin/tours`
- **Headers**: 
  - `x-api-key`: `{{api_key}}`
  - `Authorization`: `Bearer YOUR_JWT_TOKEN`
- **Expected Response**: 200 OK with admin tours data

## Error Testing

### 1. Missing API Key
- **Method**: GET
- **URL**: `{{base_url}}/api/tours`
- **Headers**: None
- **Expected Response**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "success": false,
    "message": "Missing x-api-key header",
    "error": "API_KEY_ERROR"
  }
  ```

### 2. Invalid API Key
- **Method**: GET
- **URL**: `{{base_url}}/api/tours`
- **Headers**: 
  - `x-api-key`: `wrong-key`
- **Expected Response**: 403 Forbidden
- **Response Body**:
  ```json
  {
    "success": false,
    "message": "Invalid API key",
    "error": "API_KEY_ERROR"
  }
  ```

## Testing Workflow

1. **Test Excluded Routes First**:
   - Login/Register (should work without API key)
   - Payment webhooks (should work without API key)

2. **Test Protected Routes**:
   - Tours API (should require API key)
   - Testimonials API (should require API key)
   - Admin routes (should require API key + JWT)

3. **Test Error Cases**:
   - Missing API key
   - Invalid API key
   - Wrong header name

## Environment Variables for Postman

```json
{
  "id": "haya-api",
  "name": "Haya API",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:3000",
      "enabled": true
    },
    {
      "key": "api_key",
      "value": "c4a443e1ef1c6d2d9bbe288f73f559278973e95c83ca13937336f3585cc6af4d",
      "enabled": true
    },
    {
      "key": "jwt_token",
      "value": "YOUR_JWT_TOKEN_HERE",
      "enabled": true
    }
  ]
}
```

## Collection Structure

```
Haya API Collection
├── Auth (No API Key Required)
│   ├── Login
│   └── Register
├── Public APIs (API Key Required)
│   ├── Get Tours
│   ├── Get Testimonials
│   └── Get Tour by ID
├── Admin APIs (API Key + JWT Required)
│   ├── Admin Tours
│   ├── Admin Users
│   └── Admin Settings
└── Error Testing
    ├── Missing API Key
    ├── Invalid API Key
    └── Wrong Header Name
```

## Tips

1. **Use Environment Variables**: Set up environment variables for easy switching between development/production
2. **Pre-request Scripts**: Add scripts to automatically set headers
3. **Tests**: Add tests to verify response status and structure
4. **Documentation**: Add descriptions to each request explaining the purpose
5. **Folders**: Organize requests into logical folders for better management

