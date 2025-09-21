const http = require('http');

function testProtectedAPI() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test-protected',
    method: 'GET',
    headers: {
      'x-api-key': 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c',
      'Authorization': 'Bearer test-token',
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('Response:', JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (err) => {
    console.error('Error:', err);
  });

  req.end();
}

testProtectedAPI();

