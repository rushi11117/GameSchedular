import React from 'react'

export default function LanderPage() {
  return (
    <div className="landing-page">
      <div className="jumbotron hero-section">
        <h1 className="display-4 title">Welcome to Sports</h1>
        <p className="lead subtitle">Get motivated and inspired by sports!</p>
        <button className="btn btn-primary cta-button">Explore Now</button>
      </div>
      <div className="container features-section">
        <div className="row">
          <div className="col-md-4">
            <img
              src="/images/feature1.png"
              alt="Feature 1"
              className="feature-image"
            />
            <h2 className="feature-title">Achieve Your Goals</h2>
            <p className="feature-description">
              Learn from the best athletes and discover strategies for success.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="/images/feature2.png"
              alt="Feature 2"
              className="feature-image"
            />
            <h2 className="feature-title">Stay Motivated</h2>
            <p className="feature-description">
              Find inspiring stories, quotes, and videos to keep you motivated on
              your sports journey.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="/images/feature3.png"
              alt="Feature 3"
              className="feature-image"
            />
            <h2 className="feature-title">Connect with Others</h2>
            <p className="feature-description">
              Join our community of sports enthusiasts and share your experiences
              and achievements.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p className="text-center">&copy; 2023 Sports Inspirations. All rights reserved.</p>
      </footer>
    </div>
  );

}
