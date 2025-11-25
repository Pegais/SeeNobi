import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay';
import Badge from '../../components/Badge/Badge';
import './Dashboard.css';

const CitizenDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = mockUsers.citizen;
  const myIssues = mockIssues.filter(issue => issue.reporterId === user.userId);
  const resolvedCount = myIssues.filter(i => i.status === 'resolved').length;
  
  // Sort issues by recent activity
  const sortedIssues = [...myIssues].sort((a, b) => 
    new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
  );

  return (
    <div className="dashboard-feed">
      {/* Left Sidebar - Toggle Panel */}
      <>
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <span className={sidebarOpen ? 'icon-close' : 'icon-menu'}>
            {sidebarOpen ? '✕' : '☰'}
          </span>
        </button>
        <aside className={`left-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-avatar">
              {user.displayName.charAt(user.displayName.length - 1)}
            </div>
            <div className="sidebar-user-info">
              <h3>{user.displayName}</h3>
              <p className="user-type-badge">Citizen</p>
            </div>
          </div>

          <div className="sidebar-scores">
            <ScoreDisplay
              type="trust"
              score={user.trustScore}
              maxScore={10}
              label="Trust Score"
              compact={true}
            />
            <ScoreDisplay
              type="civic"
              score={user.civicSenseScore}
              maxScore={100}
              label="Civic Sense Score"
              compact={true}
            />
          </div>

          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-value">{myIssues.length}</span>
              <span className="stat-label">My Issues</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{resolvedCount}</span>
              <span className="stat-label">Resolved</span>
            </div>
          </div>

          <div className="sidebar-actions">
            <Link to="/citizen/submit-issue" className="sidebar-action-btn">
              <span className="action-icon">📝</span>
              <span>Submit Issue</span>
            </Link>
            <Link to="/citizen/profile" className="sidebar-action-btn">
              <span className="action-icon">👤</span>
              <span>View Profile</span>
            </Link>
            <Link to="/analytics" className="sidebar-action-btn">
              <span className="action-icon">📊</span>
              <span>Analytics</span>
            </Link>
            <Link to="/issues" className="sidebar-action-btn">
              <span className="action-icon">🔍</span>
              <span>Browse All Issues</span>
            </Link>
          </div>

          <div className="sidebar-achievements">
            <h4>Achievements</h4>
            <div className="achievements-grid">
              {user.trustScore >= 7 && (
                <Badge type="premium" text="Master" icon="👑" size="small" />
              )}
              {user.civicSenseScore >= 75 && (
                <Badge type="success" text="Champion" icon="💎" size="small" />
              )}
              {user.itrVerified && (
                <Badge type="verified" text="Tax Compliant" icon="✓" size="small" />
              )}
              {resolvedCount > 0 && (
                <Badge type="info" text="Issue Resolver" icon="🎯" size="small" />
              )}
            </div>
          </div>
        </aside>
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
        )}
      </>

      {/* Main Feed Section */}
      <main className="feed-main">
        <div className="feed-header">
          <h1>My Dashboard</h1>
        </div>

        {/* Create Post Section */}
        <div className="create-post-card">
          <div className="create-post-header">
            <div className="create-post-avatar">
              {user.displayName.charAt(user.displayName.length - 1)}
            </div>
            <Link to="/citizen/submit-issue" className="create-post-input">
              What's the issue in your area?
            </Link>
          </div>
          <div className="create-post-actions">
            <Link to="/citizen/submit-issue" className="post-action-item">
              <span className="action-icon">📷</span>
              <span>Photo</span>
            </Link>
            <Link to="/citizen/submit-issue" className="post-action-item">
              <span className="action-icon">📍</span>
              <span>Location</span>
            </Link>
            <Link to="/citizen/submit-issue" className="post-action-item">
              <span className="action-icon">🏷️</span>
              <span>Category</span>
            </Link>
          </div>
        </div>

        {/* Feed Posts - My Issues */}
        <div className="feed-posts">
          {sortedIssues.length > 0 ? (
            sortedIssues.map(issue => (
              <div key={issue.issueId} className="feed-post">
                <div className="post-header">
                  <div className="post-author">
                    <div className="post-avatar">
                      {issue.reporterDisplayName.charAt(issue.reporterDisplayName.length - 1)}
                    </div>
                    <div className="post-author-info">
                      <div className="post-author-name">{issue.reporterDisplayName}</div>
                      <div className="post-meta">
                        {new Date(issue.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })} · {issue.areaCode}
                        {issue.areaWeighting.reporterIsLocal && (
                          <span className="local-badge">📍 Local</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    type={getStatusColor(issue.status)} 
                    text={issue.status.replace('_', ' ')} 
                    size="small" 
                  />
                </div>

                <div className="post-content">
                  <Link to={`/issues/${issue.issueId}`} className="post-title">
                    {issue.title}
                  </Link>
                  <p className="post-description">{issue.description}</p>
                  
                  {issue.images && issue.images.length > 0 && (
                    <div className="post-image">
                      <img src={issue.images[0]} alt={issue.title} />
                    </div>
                  )}

                  <div className="post-tags">
                    <Badge type="info" text={issue.category} size="small" />
                    {issue.verificationStatus.isVerified && (
                      <Badge type="verified" text="Verified" icon="✓" size="small" />
                    )}
                    {issue.assignedTo && (
                      <Badge type="info" text="Assigned" icon="👤" size="small" />
                    )}
                  </div>
                </div>

                <div className="post-footer">
                  <div className="post-actions">
                    <button className="post-action-btn">
                      <span className="action-icon">👍</span>
                      <span>Support</span>
                    </button>
                    <Link to={`/issues/${issue.issueId}`} className="post-action-btn">
                      <span className="action-icon">💬</span>
                      <span>View Details</span>
                    </Link>
                    <button className="post-action-btn">
                      <span className="action-icon">📤</span>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Issues Yet</h3>
              <p>Start by submitting your first issue!</p>
              <Link to="/citizen/submit-issue" className="btn btn-primary">
                Submit Your First Issue
              </Link>
            </div>
          )}
        </div>
      </main>
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
