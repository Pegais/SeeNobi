import React from 'react';
import { Link } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay';
import Badge from '../../components/Badge/Badge';
import './Dashboard.css';

const CitizenDashboard = () => {
  const user = mockUsers.citizen;
  const myIssues = mockIssues.filter(issue => issue.reporterId === user.userId);
  const resolvedCount = myIssues.filter(i => i.status === 'resolved').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        {/* Left Sidebar - LinkedIn style */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-card profile-card">
            <div className="profile-header-mini">
              <div className="avatar">{user.displayName.charAt(user.displayName.length - 1)}</div>
              <div>
                <h3>{user.displayName}</h3>
                <p className="user-type">Citizen</p>
              </div>
            </div>
            <div className="profile-stats-mini">
              <div className="stat-mini">
                <span className="stat-number">{myIssues.length}</span>
                <span className="stat-label">Issues</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">{resolvedCount}</span>
                <span className="stat-label">Resolved</span>
              </div>
            </div>
            <Link to="/citizen/profile" className="btn btn-secondary btn-block">View Profile</Link>
          </div>

          <div className="sidebar-card">
            <h4>Quick Actions</h4>
            <Link to="/citizen/submit-issue" className="action-link">
              <span className="action-icon">📝</span>
              <span>Submit Issue</span>
            </Link>
            <Link to="/issues" className="action-link">
              <span className="action-icon">🔍</span>
              <span>Browse Issues</span>
            </Link>
            <Link to="/analytics" className="action-link">
              <span className="action-icon">📊</span>
              <span>Analytics</span>
            </Link>
          </div>

          <div className="sidebar-card">
            <h4>Achievements</h4>
            <div className="achievements-list">
              {user.trustScore >= 7 && <Badge type="premium" text="Master" icon="👑" size="small" />}
              {user.civicSenseScore >= 75 && <Badge type="success" text="Civic Champion" icon="💎" size="small" />}
              {user.itrVerified && <Badge type="verified" text="Tax Compliant" icon="✓" size="small" />}
              {resolvedCount > 0 && <Badge type="info" text="Issue Resolver" icon="🎯" size="small" />}
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="dashboard-main">
          <div className="feed-header">
            <h1>My Dashboard</h1>
            <Link to="/citizen/submit-issue" className="btn btn-primary">+ Submit Issue</Link>
          </div>

          {/* Scores Section */}
          <div className="scores-section">
            <ScoreDisplay
              type="trust"
              score={user.trustScore}
              maxScore={10}
              label="Trust Score"
            />
            <ScoreDisplay
              type="civic"
              score={user.civicSenseScore}
              maxScore={100}
              label="Civic Sense Score"
            />
          </div>

          {/* Feed Items */}
          <div className="feed-section">
            <h2>My Issues</h2>
            <div className="feed-list">
              {myIssues.map(issue => (
                <div key={issue.issueId} className="feed-item">
                  <div className="feed-item-header">
                    <div className="feed-item-author">
                      <div className="avatar-small">{issue.reporterDisplayName.charAt(issue.reporterDisplayName.length - 1)}</div>
                      <div>
                        <div className="author-name">{issue.reporterDisplayName}</div>
                        <div className="post-meta">
                          {new Date(issue.createdAt).toLocaleDateString()} · {issue.areaCode}
                        </div>
                      </div>
                    </div>
                    <Badge type={getStatusColor(issue.status)} text={issue.status.replace('_', ' ')} size="small" />
                  </div>
                  
                  <div className="feed-item-content">
                    <h3>{issue.title}</h3>
                    <p>{issue.description}</p>
                    {issue.images && issue.images.length > 0 && (
                      <div className="feed-item-image">
                        <img src={issue.images[0]} alt={issue.title} />
                      </div>
                    )}
                  </div>

                  <div className="feed-item-footer">
                    <div className="feed-item-tags">
                      <Badge type="info" text={issue.category} size="small" />
                      {issue.verificationStatus.isVerified && (
                        <Badge type="verified" text="Verified" icon="✓" size="small" />
                      )}
                      {issue.areaWeighting.reporterIsLocal && (
                        <Badge type="premium" text="Local" icon="📍" size="small" />
                      )}
                    </div>
                    <Link to={`/issues/${issue.issueId}`} className="btn btn-secondary btn-small">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    'submitted': 'info',
    'under_review': 'warning',
    'in_progress': 'info',
    'resolved': 'success',
    'closed': 'success'
  };
  return colors[status] || 'info';
};

export default CitizenDashboard;

