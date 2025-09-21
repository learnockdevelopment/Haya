const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateSecureApiKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function updateEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  const examplePath = path.join(process.cwd(), 'env.example');
  
  let envContent = '';
  
  // Read existing .env.local if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  } else {
    // Read from env.example as template
    envContent = fs.readFileSync(examplePath, 'utf8');
  }
  
  // Generate new API key
  const newApiKey = generateSecureApiKey(32);
  
  // Update or add API key configuration
  const apiKeyConfig = `# API Key Configuration
API_KEY_ENABLED=true
API_KEY=${newApiKey}
API_KEY_HEADER=x-api-key
API_KEY_ALLOWED_ROUTES=/api/tours,/api/testimonials,/api/admin
API_KEY_EXCLUDED_ROUTES=/api/auth/login,/api/auth/register,/api/payment/webhook`;

  // Check if API key config already exists
  if (envContent.includes('API_KEY_ENABLED')) {
    // Replace existing API key config
    envContent = envContent.replace(
      /# API Key Configuration[\s\S]*?(?=\n\n|\n#|\n$|$)/,
      apiKeyConfig
    );
  } else {
    // Append new API key config
    envContent += `\n\n${apiKeyConfig}`;
  }
  
  // Write updated content
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ API Key generated and saved to .env.local');
  console.log(`🔑 Your API Key: ${newApiKey}`);
  console.log('📝 Add this header to your API requests: x-api-key');
  console.log('⚠️  Keep this key secure and never commit it to version control!');
}

// Run the script
updateEnvFile();


