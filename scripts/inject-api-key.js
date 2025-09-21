const fs = require('fs');
const path = require('path');

function injectApiKey() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    return;
  }
  
  // Read the API key from .env.local
  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiKeyMatch = envContent.match(/NEXT_PUBLIC_API_KEY=(.+)/);
  
  if (!apiKeyMatch) {
    console.log('❌ NEXT_PUBLIC_API_KEY not found in .env.local');
    return;
  }
  
  const apiKey = apiKeyMatch[1].trim();
  
  // Create a script to inject the API key into the frontend
  const injectScript = `
// Auto-injected API key for frontend
if (typeof window !== 'undefined') {
  window.__API_KEY__ = '${apiKey}';
  // Also store in localStorage as backup
  localStorage.setItem('api_key', '${apiKey}');
}
`;
  
  // Write the injection script
  const publicPath = path.join(process.cwd(), 'public', 'api-key.js');
  fs.writeFileSync(publicPath, injectScript);
  
  console.log('✅ API key injected into frontend');
  console.log(`📝 API Key: ${apiKey.substring(0, 8)}...`);
  console.log('📁 Created: public/api-key.js');
}

injectApiKey();

