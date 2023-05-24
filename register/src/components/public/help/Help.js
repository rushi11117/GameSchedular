import React from 'react';

export default function QueryInput() {

  const email = 'example@example.com';
  const phoneNumber = '123-456-7890';

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="container">
      <h4>Contact Information</h4>
      <p style={{ color: 'blue' }}>Email: <span onClick={handleEmailClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{email}</span></p>
      <p style={{ color: 'blue' }}>Phone Number: {phoneNumber}</p>
    </div>
  );
}
