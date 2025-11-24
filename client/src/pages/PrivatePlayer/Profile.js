import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockUsers, mockRatings } from '../../data/mockData';
import './Profile.css';

const PrivatePlayerProfile = () => {
  const { id } = useParams();
  const user = mockUsers.privatePlayer;
  const ratings = mockRatings.filter(r => r.ratedEntityId === id);

  const avgRating = ratings.length > 0
    ? Object.keys(ratings[0].ratings).reduce((sum, key) => {
        if (ratings[0].ratings[key]) return sum + ratings[0].ratings[key];
        return sum;
      }, 0) / Object.keys(ratings[0].ratings).filter(key => ratings[0].ratings[key]).length
    : 0;

  return (
    <div className="container">
      <h1>Private Player Profile</h1>
      <div className="profile-container">
        <div className="profile-main">
          <div className="profile-header">
            <div>
              <h2>{user.companyName}</h2>
              <p className="company-type">Private Player / Contractor</p>
            </div>
            <div className="profile-scores">
              <div className="score-item">
                <label>Trust Score</label>
                <p className="score-value">{user.trustScore}/10</p>
              </div>
              <div className="score-item">
                <label>Civic Sense Score</label>
                <p className="score-value">{user.civicSenseScore}/100</p>
              </div>
              <div className="score-item">
                <label>Average Rating</label>
                <p className="score-value">{avgRating.toFixed(1)}/5</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Verification Status</h3>
            <div className="verification-status">
              <p>✓ Company Documents Verified</p>
              <p>✓ Citizen Poll Verified</p>
            </div>
          </div>

          <div className="profile-section">
            <h3>Business Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Company Name</label>
                <p>{user.companyName}</p>
              </div>
              <div className="info-item">
                <label>Verification Status</label>
                <p>{user.verificationStatus.isVerified ? 'Verified' : 'Pending'}</p>
              </div>
            </div>
          </div>

          {ratings.length > 0 && (
            <div className="profile-section">
              <h3>Ratings</h3>
              <div className="ratings-list">
                {ratings.map(rating => (
                  <div key={rating.ratingId} className="rating-item">
                    <div className="rating-scores">
                      {rating.ratings.grievanceResolution && (
                        <span>Grievance Resolution: {rating.ratings.grievanceResolution}/5</span>
                      )}
                      {rating.ratings.serviceQuality && (
                        <span>Service Quality: {rating.ratings.serviceQuality}/5</span>
                      )}
                      {rating.ratings.compliance && (
                        <span>Compliance: {rating.ratings.compliance}/5</span>
                      )}
                      {rating.ratings.overallReliability && (
                        <span>Overall Reliability: {rating.ratings.overallReliability}/5</span>
                      )}
                    </div>
                    <p className="rating-meta">Rated on {new Date(rating.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-sidebar">
          <div className="sidebar-card">
            <h3>Rate This Entity</h3>
            <Link to={`/rating/private_player/${id}`} className="btn btn-primary btn-block">
              Submit Rating
            </Link>
          </div>

          <div className="sidebar-card">
            <h3>Verification Poll</h3>
            <Link to={`/polling/private_player/${id}`} className="btn btn-secondary btn-block">
              View Poll Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivatePlayerProfile;

