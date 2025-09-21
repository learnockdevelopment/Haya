const http = require('http');

function checkAppStatus() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/tours?featured=true&limit=1',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`📡 API Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('✅ API Response:', JSON.stringify(jsonData, null, 2));
      } catch (e) {
        console.log('📄 Raw Response:', data);
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ API Error:', err.message);
  });

  req.on('timeout', () => {
    console.error('⏰ API Timeout');
    req.destroy();
  });

  req.end();
}

console.log('🔍 Checking application status...');
checkAppStatus();



