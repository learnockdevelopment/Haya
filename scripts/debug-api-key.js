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

async function debugApiKey() {
  console.log('🔍 Debugging API Key Middleware\n');
  
  const tests = [
    {
      name: 'Auth Login (should be excluded)',
      path: '/api/auth/login',
      headers: {},
      shouldRequireKey: false
    },
    {
      name: 'Tours (should require key)',
      path: '/api/tours',
      headers: {},
      shouldRequireKey: true
    },
    {
      name: 'Tours with API key',
      path: '/api/tours',
      headers: { 'x-api-key': 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c' },
      shouldRequireKey: true
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

debugApiKey().catch(console.error);

