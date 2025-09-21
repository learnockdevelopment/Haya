const fs = require('fs');
const path = require('path');

function fixEnvConfig() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    return;
  }
  
  let content = fs.readFileSync(envPath, 'utf8');
  
  // Fix the API key configuration
  content = content.replace(
    /API_KEY_ALLOWED_ROUTES=.*/,
    'API_KEY_ALLOWED_ROUTES='
  );
  
  content = content.replace(
    /API_KEY_EXCLUDED_ROUTES=.*/,
    'API_KEY_EXCLUDED_ROUTES=/api/auth/login,/api/auth/register,/api/payment/tabby/webhook'
  );
  
  // Write the fixed content
  fs.writeFileSync(envPath, content);
  
  console.log('✅ Fixed .env.local configuration');
  console.log('📝 API_KEY_ALLOWED_ROUTES is now empty (all routes protected)');
  console.log('📝 API_KEY_EXCLUDED_ROUTES updated with correct webhook path');
  
  // Show the updated configuration
  console.log('\n📋 Updated API Key Configuration:');
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('API_KEY')) {
      console.log(`   ${line}`);
    }
  });
}

fixEnvConfig();

