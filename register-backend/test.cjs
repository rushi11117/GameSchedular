const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB Atlas connection string
const uri = "mongodb+srv://rushimhetre:<Rm@11117>@cluster0.rj98jlm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connect() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error(err);
  }
}

connect();
