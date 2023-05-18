// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');

const app = express();
const port = 5000;

// Connect to MongoDB database
mongoose
  .connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
