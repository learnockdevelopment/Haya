const http = require('http');

function testNoMiddleware() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/simple-no-middleware',
    method: 'GET',
    headers: {
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
      console.log('Response:', data);
    });
  });

  req.on('error', (err) => {
    console.error('Error:', err);
  });

  req.end();
}

testNoMiddleware();

