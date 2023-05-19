import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: null,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data from the server and populate the form fields
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      const userData = response.data;
      setUser({
        email: userData.email,
        password: '',
        confirmPassword: '',
        profilePic: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      profilePic: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object to send the form data including the file
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);
    formData.append('profilePic', user.profilePic);

    try {
      const response = await axios.post('http://localhost:9002/api/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title">Profile Page</h1>
          {message && <p className="card-text">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
              <input type="file" className="form-control" id="profilePic" name="profilePic" onChange={handleProfilePicChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
