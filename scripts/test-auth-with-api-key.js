const http = require('http');

function makePostRequest(path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
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

    req.write(postData);
    req.end();
  });
}

async function testAuthWithApiKey() {
  console.log('🔐 Testing Auth Routes with API Key Requirement\n');
  
  const API_KEY = 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c';
  
  const tests = [
    {
      name: 'Auth Login WITHOUT API key (should fail)',
      path: '/api/auth/login',
      body: { email: 'test@test.com', password: 'test123' },
      headers: {},
      expectedStatus: 401
    },
    {
      name: 'Auth Login WITH API key (should work)',
      path: '/api/auth/login',
      body: { email: 'test@test.com', password: 'test123' },
      headers: { 'x-api-key': API_KEY },
      expectedStatus: 401 // Will fail due to invalid credentials, but not due to missing API key
    },
    {
      name: 'Auth Register WITHOUT API key (should fail)',
      path: '/api/auth/register',
      body: { fullName: 'Test User', userName: 'testuser', email: 'test@test.com', password: 'test123' },
      headers: {},
      expectedStatus: 401
    },
    {
      name: 'Auth Register WITH API key (should work)',
      path: '/api/auth/register',
      body: { fullName: 'Test User', userName: 'testuser', email: 'test@test.com', password: 'test123' },
      headers: { 'x-api-key': API_KEY },
      expectedStatus: 400 // Will fail due to validation, but not due to missing API key
    }
  ];

  for (const test of tests) {
    try {
      console.log(`🧪 ${test.name}`);
      const result = await makePostRequest(test.path, test.body, test.headers);
      
      console.log(`   Status: ${result.status}`);
      if (result.data.message) {
        console.log(`   Message: ${result.data.message}`);
      }
      
      if (test.expectedStatus === 401 && result.status === 401) {
        if (result.data.message && result.data.message.includes('x-api-key')) {
          console.log(`   ✅ SUCCESS: Blocked by missing API key`);
        } else {
          console.log(`   ⚠️  BLOCKED: But not by API key (${result.data.message})`);
        }
      } else if (test.expectedStatus === 400 && result.status === 400) {
        console.log(`   ✅ SUCCESS: API key accepted, failed on validation`);
      } else {
        console.log(`   ❌ UNEXPECTED: Expected ${test.expectedStatus}, got ${result.status}`);
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
    }
    console.log('');
  }
}

testAuthWithApiKey().catch(console.error);

