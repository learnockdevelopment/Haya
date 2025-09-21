# Haya - Next.js Full Stack Application

A modern, full-stack web application built with Next.js 14, featuring integrated payment processing with Tabby, multilingual support, and responsive design.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MongoDB** with Mongoose for database
- **JWT Authentication** with secure API routes
- **Tabby Payment Integration** for seamless payments
- **Multilingual Support** (English & Arabic) with RTL support
- **Responsive Design** for all devices
- **Dark/Light Theme** support
- **Modern UI Components** with accessibility

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- React Hook Form
- React Hot Toast
- React Icons
- Framer Motion

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Axios for HTTP requests

### Payment Integration
- Tabby Payment Gateway
- Secure payment processing
- Webhook support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd haya-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/haya-nextjs
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Tabby Payment Gateway
   TABBY_SECRET_KEY=sk_test_000000000
   TABBY_MERCHANT_CODE=ae
   TABBY_CURRENCY=AED
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   
   # App Configuration
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
haya-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── payment/       # Payment endpoints
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   ├── payment/           # Payment page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   ├── pages/             # Page components
│   │   └── ui/                # UI components
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utility functions
│   ├── models/                # Database models
│   └── services/              # External services
│       └── paymentChannels/   # Payment integrations
├── public/                    # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 💳 Payment Integration

This application includes integration with Tabby payment gateway:

### Features
- Create payment sessions
- Process payments securely
- Handle webhooks
- Payment verification
- Support for multiple currencies

### API Endpoints
- `POST /api/payment/tabby/create` - Create payment session
- `POST /api/payment/tabby/verify` - Verify payment
- `POST /api/payment/tabby/webhook` - Handle webhooks

## 🌐 Multilingual Support

The application supports English and Arabic with:
- Automatic language detection
- RTL layout support for Arabic
- Language switching
- Localized content

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Protected API routes
- User session management

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Cross-browser compatibility

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS
- DigitalOcean
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🔄 Migration from Separate Backend/Frontend

This Next.js application consolidates the previous separate Node.js backend and React frontend into a single, unified application. Key benefits:

- **Single Port**: No need for separate backend and frontend ports
- **Unified Deployment**: Deploy everything together
- **Better Performance**: Server-side rendering and API routes
- **Simplified Development**: One codebase to maintain
- **Type Safety**: End-to-end TypeScript support

---

Built with ❤️ by the Haya Team
