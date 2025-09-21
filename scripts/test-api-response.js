const http = require('http');

function testAPIResponse() {
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
        console.log('✅ API Response Structure:');
        console.log(JSON.stringify(jsonData, null, 2));
        
        if (jsonData.success && jsonData.data.tours.length > 0) {
          const tour = jsonData.data.tours[0];
          console.log('\n🔍 First Tour Structure:');
          console.log('Title:', typeof tour.title, tour.title);
          console.log('Rating:', typeof tour.rating, tour.rating);
          console.log('Ratings:', typeof tour.ratings, tour.ratings);
          console.log('Duration:', typeof tour.duration, tour.duration);
          console.log('Price:', typeof tour.price, tour.price);
        }
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

console.log('🔍 Testing API response structure...');
testAPIResponse();



