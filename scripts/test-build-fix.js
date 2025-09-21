const https = require('https');
const http = require('http');

const API_KEY = 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const req = http.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data.substring(0, 200) + (data.length > 200 ? '...' : '')
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testBuildFix() {
  console.log('🔧 Testing build fix...\n');

  try {
    // Test simple API
    console.log('Testing simple API...');
    const simpleResult = await makeRequest('http://localhost:3000/api/test');
    console.log(`Simple API: ${simpleResult.status} - ${simpleResult.status === 200 ? 'SUCCESS' : 'ERROR'}`);

    // Test tours API
    console.log('Testing tours API...');
    const toursResult = await makeRequest('http://localhost:3000/api/admin/tours');
    console.log(`Tours API: ${toursResult.status} - ${toursResult.status === 200 ? 'SUCCESS' : 'ERROR'}`);

    if (toursResult.status === 200) {
      console.log('✅ Build errors are FIXED!');
    } else {
      console.log('❌ Still have build errors');
      console.log('Response:', toursResult.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBuildFix();

