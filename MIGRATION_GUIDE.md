# Migration Guide: From Separate Backend/Frontend to Next.js

This guide explains the migration from the previous separate Node.js backend + React frontend structure to the new unified Next.js application.

## 🔄 What Changed

### Before (Separate Structure)
```
haya/
├── backend/          # Node.js Express server (Port 5000)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/         # React app (Port 3000)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── package.json      # Root package.json
```

### After (Next.js Unified)
```
haya-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (replaces backend)
│   │   ├── login/             # Pages
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── payment/
│   ├── components/            # React components
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utilities
│   ├── models/                # Database models
│   └── services/              # External services
├── package.json               # Single package.json
└── next.config.js
```

## 🚀 Key Benefits

1. **Single Port**: No more separate backend and frontend ports
2. **Unified Deployment**: Deploy everything together
3. **Better Performance**: Server-side rendering and API routes
4. **Simplified Development**: One codebase to maintain
5. **Type Safety**: End-to-end TypeScript support
6. **Modern Architecture**: Latest Next.js 14 with App Router

## 📁 Migration Details

### API Routes Migration
- **Before**: Express routes in `backend/src/routes/`
- **After**: Next.js API routes in `src/app/api/`

Example:
```javascript
// Before: backend/src/routes/web.js
app.post('/api/web/auth/login', loginController);

// After: src/app/api/auth/login/route.ts
export async function POST(request: NextRequest) {
  // API logic here
}
```

### Database Models
- **Before**: Mongoose models in `backend/src/models/`
- **After**: Same models in `src/models/` with TypeScript interfaces

### Frontend Components
- **Before**: React components in `frontend/src/`
- **After**: Same components in `src/components/` with Next.js optimizations

### Authentication
- **Before**: JWT middleware in Express
- **After**: React Context with API routes

### Payment Integration
- **Before**: Moyasar payment channel (PHP-style)
- **After**: Tabby payment integration with TypeScript

## 🔧 Setup Instructions

1. **Navigate to the new project**:
   ```bash
   cd C:\Users\PC\Desktop\haya\haya-nextjs
   ```

2. **Run setup script**:
   ```bash
   node setup.js
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure environment**:
   - Update `.env.local` with your settings
   - Set up MongoDB connection
   - Configure Tabby payment credentials

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Open application**:
   - Navigate to `http://localhost:3000`

## 🆕 New Features

### Tabby Payment Integration
- Complete payment processing with Tabby
- Secure API endpoints
- Webhook support
- Payment verification

### Enhanced UI/UX
- Modern design with Tailwind CSS
- Responsive layout
- Dark/light theme support
- Loading states and animations

### Multilingual Support
- English and Arabic support
- RTL layout for Arabic
- Language switching
- Localized content

### TypeScript Integration
- Full type safety
- Better development experience
- IntelliSense support
- Compile-time error checking

## 🔒 Security Improvements

- JWT authentication with secure API routes
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting

## 📱 Mobile Support

- Responsive design
- Touch-friendly interfaces
- Mobile-optimized navigation
- Progressive Web App features

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
- Netlify
- AWS
- DigitalOcean
- Any platform supporting Next.js

## 🔍 Testing

1. **Authentication**:
   - Register new account
   - Login/logout
   - Protected routes

2. **Payment**:
   - Create payment session
   - Test with Tabby sandbox
   - Verify webhooks

3. **Multilingual**:
   - Switch languages
   - Test RTL layout
   - Verify translations

## 📚 Documentation

- **README.md**: Complete setup and usage guide
- **API Documentation**: Available in `/api` routes
- **Component Documentation**: Inline TypeScript comments
- **Migration Guide**: This file

## 🆘 Troubleshooting

### Common Issues

1. **Environment Variables**:
   - Ensure `.env.local` is properly configured
   - Check MongoDB connection string
   - Verify Tabby credentials

2. **Dependencies**:
   - Run `npm install` to install all packages
   - Check for version conflicts

3. **Database Connection**:
   - Ensure MongoDB is running
   - Check connection string format
   - Verify network access

4. **Payment Integration**:
   - Use test credentials for development
   - Check webhook URLs
   - Verify API endpoints

### Getting Help

- Check the README.md for detailed instructions
- Review the API documentation
- Check browser console for errors
- Verify environment configuration

## 🎉 Conclusion

The migration to Next.js provides a modern, unified development experience with better performance, security, and maintainability. The new structure eliminates the complexity of managing separate backend and frontend applications while providing all the same functionality plus new features.

---

**Happy coding! 🚀**
