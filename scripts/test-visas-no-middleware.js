const http = require('http');

function testVisasNoMiddleware() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/visas-no-middleware',
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

testVisasNoMiddleware();

