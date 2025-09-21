const http = require('http');

function makeRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testFrontendAPI() {
  console.log('🧪 Testing Frontend API Calls\n');
  
  const API_KEY = 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c';
  
  const tests = [
    {
      name: 'Homepage Tours API (should work with API key)',
      path: '/api/tours?featured=true&limit=6',
      headers: { 'x-api-key': API_KEY },
      expectedStatus: 200
    },
    {
      name: 'Homepage Testimonials API (should work with API key)',
      path: '/api/testimonials?featured=true&limit=6',
      headers: { 'x-api-key': API_KEY },
      expectedStatus: 200
    },
    {
      name: 'Admin Users API (should work with API key)',
      path: '/api/admin/users',
      headers: { 'x-api-key': API_KEY },
      expectedStatus: 401 // Will fail due to missing JWT token, but API key should be accepted
    }
  ];

  for (const test of tests) {
    try {
      console.log(`🧪 ${test.name}`);
      const result = await makeRequest(test.path, test.headers);
      
      console.log(`   Status: ${result.status}`);
      if (result.data.message) {
        console.log(`   Message: ${result.data.message}`);
      }
      
      if (result.status === test.expectedStatus) {
        console.log(`   ✅ SUCCESS: Expected ${test.expectedStatus}, got ${result.status}`);
      } else if (result.status === 401 && result.data.message && result.data.message.includes('x-api-key')) {
        console.log(`   ❌ FAILED: Missing API key`);
      } else if (result.status === 401 && result.data.message && result.data.message.includes('token')) {
        console.log(`   ✅ SUCCESS: API key accepted, failed on JWT token (expected)`);
      } else {
        console.log(`   ⚠️  UNEXPECTED: Expected ${test.expectedStatus}, got ${result.status}`);
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
    }
    console.log('');
  }
}

testFrontendAPI().catch(console.error);

