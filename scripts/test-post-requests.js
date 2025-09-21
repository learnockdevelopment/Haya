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

async function testPostRequests() {
  console.log('🔍 Testing POST Requests with API Key Middleware\n');
  
  const tests = [
    {
      name: 'Auth Login POST (should be excluded)',
      path: '/api/auth/login',
      body: { email: 'test@test.com', password: 'test123' },
      headers: {},
      shouldRequireKey: false
    },
    {
      name: 'Auth Register POST (should be excluded)',
      path: '/api/auth/register',
      body: { name: 'Test User', email: 'test@test.com', password: 'test123' },
      headers: {},
      shouldRequireKey: false
    },
    {
      name: 'Profile Update POST (should require key)',
      path: '/api/profile/update',
      body: { name: 'Updated Name' },
      headers: {},
      shouldRequireKey: true
    },
    {
      name: 'Profile Update POST with API key',
      path: '/api/profile/update',
      body: { name: 'Updated Name' },
      headers: { 'x-api-key': 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c' },
      shouldRequireKey: true
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
      
      if (test.shouldRequireKey) {
        if (test.headers['x-api-key']) {
          console.log(`   ✅ Expected: Success with API key - Got: ${result.status === 200 ? 'SUCCESS' : 'FAILED'}`);
        } else {
          console.log(`   ✅ Expected: 401 without API key - Got: ${result.status === 401 ? 'SUCCESS' : 'FAILED'}`);
        }
      } else {
        console.log(`   ✅ Expected: Should work without API key - Got: ${result.status === 401 ? 'FAILED (blocked by API key)' : 'SUCCESS'}`);
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
    }
    console.log('');
  }
}

testPostRequests().catch(console.error);

