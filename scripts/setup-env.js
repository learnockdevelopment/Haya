const fs = require('fs');
const path = require('path');

const envContent = `# Database
MONGODB_URI="mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0"

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-make-this-very-long-and-secure-123456789

# Tabby Payment Gateway
TABBY_SECRET_KEY=sk_test_000000000
TABBY_MERCHANT_CODE=ae
TABBY_CURRENCY=AED

# Port
PORT=3000

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here-make-this-very-long-and-secure-123456789

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Skipping creation.');
    console.log('If you want to recreate it, delete the existing file first.');
  } else {
    // Create .env.local file
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file successfully!');
    console.log('📝 Please review and update the values as needed.');
  }
  
  console.log('\n🔧 Next steps:');
  console.log('1. Review the .env.local file');
  console.log('2. Update JWT_SECRET and NEXTAUTH_SECRET with secure values');
  console.log('3. Restart your development server: npm run dev');
  
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  console.log('\n📝 Please create .env.local manually with the following content:');
  console.log(envContent);
}



