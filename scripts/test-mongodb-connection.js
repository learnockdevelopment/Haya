const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Try to connect
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0');
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    // Close connection
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ENOTFOUND' || error.code === 'EREFUSED') {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the MongoDB URI is correct');
      console.log('3. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('4. Try using a different network (some networks block MongoDB)');
    }
    
    process.exit(1);
  }
}

// Test with the MongoDB URI directly
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://learnockdevelopment_db_user:R3injViBrsVbYenX@cluster0.vtypvnt.mongodb.net/haya-db?retryWrites=true&w=majority&appName=Cluster0';

async function testWithURI() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB!');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ENOTFOUND' || error.code === 'EREFUSED') {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the MongoDB URI is correct');
      console.log('3. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('4. Try using a different network (some networks block MongoDB)');
    }
    
    process.exit(1);
  }
}

testWithURI();
