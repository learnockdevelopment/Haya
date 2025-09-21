#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Haya Next.js Application...\n');

// Create .env.local from env.example
const envExamplePath = path.join(__dirname, 'env.example');
const envLocalPath = path.join(__dirname, '.env.local');

if (fs.existsSync(envExamplePath) && !fs.existsSync(envLocalPath)) {
  fs.copyFileSync(envExamplePath, envLocalPath);
  console.log('✅ Created .env.local from env.example');
} else if (fs.existsSync(envLocalPath)) {
  console.log('ℹ️  .env.local already exists');
} else {
  console.log('⚠️  env.example not found, please create .env.local manually');
}

// Create necessary directories
const directories = [
  'src/app/api/auth',
  'src/app/api/payment/tabby',
  'src/components/layout',
  'src/components/pages',
  'src/components/ui',
  'src/contexts',
  'src/lib',
  'src/models',
  'src/services/paymentChannels',
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your configuration');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Open: http://localhost:3000');
console.log('\n📚 For more information, check the README.md file');
