import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockUsers, mockRatings, mockIssues } from '../../data/mockData';
import './Profile.css';

const OfficialProfile = () => {
  const { id } = useParams();
  const user = mockUsers.official;
  const ratings = mockRatings.filter(r => r.ratedEntityId === id);
  const resolvedIssues = mockIssues.filter(i => 
    i.assignedTo && i.assignedTo.userId === id && i.status === 'resolved'
  );

  const avgRating = ratings.length > 0
    ? Object.keys(ratings[0].ratings).reduce((sum, key) => sum + ratings[0].ratings[key], 0) / Object.keys(ratings[0].ratings).length
    : 0;

  return (
    <div className="container">
      <h1>Official Profile</h1>
      <div className="profile-container">
        <div className="profile-main">
          <div className="profile-header">
            <div>
              <h2>{user.officialName}</h2>
              <p className="department">{user.department}</p>
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
              <p>✓ Employee ID Verified</p>
              <p>✓ Email Domain Verified</p>
              <p>✓ Citizen Poll Verified</p>
            </div>
          </div>

          <div className="profile-section">
            <h3>Performance Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <label>Issues Resolved</label>
                <p>{resolvedIssues.length}</p>
              </div>
              <div className="stat-item">
                <label>Total Ratings</label>
                <p>{ratings.length}</p>
              </div>
              <div className="stat-item">
                <label>Response Rate</label>
                <p>95%</p>
              </div>
            </div>
          </div>

          {ratings.length > 0 && (
            <div className="profile-section">
              <h3>Recent Ratings</h3>
              <div className="ratings-list">
                {ratings.map(rating => (
                  <div key={rating.ratingId} className="rating-item">
                    <div className="rating-scores">
                      <span>Response Time: {rating.ratings.responseTime}/5</span>
                      <span>Resolution Quality: {rating.ratings.resolutionQuality}/5</span>
                      <span>Communication: {rating.ratings.communication}/5</span>
                      <span>Accountability: {rating.ratings.accountability}/5</span>
                      <span>Overall: {rating.ratings.overallPerformance}/5</span>
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
            <h3>Rate This Official</h3>
            <Link to={`/rating/government_official/${id}`} className="btn btn-primary btn-block">
              Submit Rating
            </Link>
          </div>

          <div className="sidebar-card">
            <h3>Verification Poll</h3>
            <Link to={`/polling/government_official/${id}`} className="btn btn-secondary btn-block">
              View Poll Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialProfile;

