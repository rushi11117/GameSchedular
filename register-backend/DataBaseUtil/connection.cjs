const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'playersDB';

// Establish the database connection
const client = new MongoClient(url);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    // Additional code for your application

    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

connectToDatabase()

// Export the connectToDatabase function and the client instance
module.exports = { connectToDatabase, client };
