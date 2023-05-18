// user.route.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../models/user.model');

// Multer storage configuration for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profilePics');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// GET current user profile
router.get('/profile', (req, res) => {
  // Retrieve the user data from the database based on the user's session or authentication token
  const userId = req.user.id; // Assuming you have implemented authentication and have access to the user's ID

  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Failed to fetch user profile' });
    });
});

// POST update user profile
router.post('/profile', upload.single('profilePic'), (req, res) => {
  // Retrieve the updated profile data from the request body
  const { email, password, confirmPassword } = req.body;
  const profilePic = req.file.path; // Assuming multer has stored the file and provided the path

  // Validate the data and perform necessary checks
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Find the user in the database and update their profile information
  const userId = req.user.id; // Assuming you have implemented authentication and have access to the user's ID

  User.findByIdAndUpdate(
    userId,
    { email, password, profilePic },
    { new: true } // To return the updated user object
  )
    .then((updatedUser) => {
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Failed to update user profile' });
    });
});

module.exports = router;
