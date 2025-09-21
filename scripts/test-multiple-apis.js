const http = require('http');

function testAPI(path, name) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'x-api-key': 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c',
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log(`${name}: ${res.statusCode} - ${response.success ? 'SUCCESS' : 'FAILED'}`);
          if (!response.success) {
            console.log(`  Error: ${response.message}`);
          }
        } catch (e) {
          console.log(`${name}: ${res.statusCode} - ERROR parsing response`);
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      console.log(`${name}: ERROR - ${err.message}`);
      resolve();
    });

    req.end();
  });
}

async function testAllAPIs() {
  console.log('🧪 Testing admin APIs...\n');
  
  const apis = [
    { path: '/api/admin/visas', name: 'Visas' },
    { path: '/api/admin/tours', name: 'Tours' },
    { path: '/api/admin/users', name: 'Users' },
    { path: '/api/admin/flights', name: 'Flights' },
    { path: '/api/admin/hotels', name: 'Hotels' },
    { path: '/api/admin/reviews', name: 'Reviews' },
    { path: '/api/admin/locations/regions', name: 'Regions' },
    { path: '/api/admin/visas/stats', name: 'Visa Stats' },
    { path: '/api/admin/tours/stats', name: 'Tour Stats' },
    { path: '/api/admin/users/stats', name: 'User Stats' }
  ];

  for (const api of apis) {
    await testAPI(api.path, api.name);
  }
  
  console.log('\n✅ API testing complete');
}

testAllAPIs();

