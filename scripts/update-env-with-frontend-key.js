const fs = require('fs');
const path = require('path');

function updateEnvWithFrontendKey() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    return;
  }
  
  let content = fs.readFileSync(envPath, 'utf8');
  
  // Get the current API key
  const apiKeyMatch = content.match(/API_KEY=(.+)/);
  const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';
  
  if (!apiKey) {
    console.log('❌ API_KEY not found in .env.local');
    return;
  }
  
  // Add or update NEXT_PUBLIC_API_KEY
  if (content.includes('NEXT_PUBLIC_API_KEY')) {
    content = content.replace(
      /NEXT_PUBLIC_API_KEY=.*/,
      `NEXT_PUBLIC_API_KEY=${apiKey}`
    );
  } else {
    content += `\n# Frontend API Key (for client-side requests)\nNEXT_PUBLIC_API_KEY=${apiKey}\n`;
  }
  
  // Write the updated content
  fs.writeFileSync(envPath, content);
  
  console.log('✅ Added NEXT_PUBLIC_API_KEY to .env.local');
  console.log(`📝 Frontend API Key: ${apiKey}`);
  
  // Show the updated configuration
  console.log('\n📋 Updated Environment Configuration:');
  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('API_KEY')) {
      console.log(`   ${line}`);
    }
  });
}

updateEnvWithFrontendKey();

