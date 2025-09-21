const fs = require('fs');
const path = require('path');

function removeAuthExclusions() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    return;
  }
  
  let content = fs.readFileSync(envPath, 'utf8');
  
  // Remove auth routes from exclusions, keep only payment webhook
  content = content.replace(
    /API_KEY_EXCLUDED_ROUTES=.*/,
    'API_KEY_EXCLUDED_ROUTES=/api/payment/tabby/webhook'
  );
  
  // Write the updated content
  fs.writeFileSync(envPath, content);
  
  console.log('✅ Removed auth routes from exclusions');
  console.log('📝 Now ALL routes require API key except payment webhook');
  
  // Show the updated configuration
  console.log('\n📋 Updated API Key Configuration:');
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('API_KEY')) {
      console.log(`   ${line}`);
    }
  });
}

removeAuthExclusions();

