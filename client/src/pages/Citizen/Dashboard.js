import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
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
      {/* Left Sidebar - Fixed Profile Container */}
      <>
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <span>{sidebarOpen ? '×' : '≡'}</span>
        </button>
        <aside className={`left-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-avatar">
              {user.displayName.charAt(user.displayName.length - 1)}
            </div>
            <div className="sidebar-user-info">
              <h3>{user.displayName}</h3>
            </div>
          </div>

          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-value">{myIssues.length}</span>
              <span className="stat-label">Issues</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{resolvedCount}</span>
              <span className="stat-label">Resolved</span>
            </div>
          </div>

          <div className="sidebar-actions">
            <Link to="/citizen/submit-issue" className="sidebar-action-btn">
              <span>Report Issue</span>
            </Link>
            <Link to="/citizen/profile" className="sidebar-action-btn">
              <span>Profile</span>
            </Link>
            <Link to="/issues" className="sidebar-action-btn">
              <span>All Issues</span>
            </Link>
          </div>
        </aside>
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
        )}
      </>

      {/* Main Feed Section - Scrollable */}
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
              Report an issue in your area
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
                      </div>
                    </div>
                  </div>
                  <span className="post-status">{issue.status.replace('_', ' ')}</span>
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
                    <span className="post-category">{issue.category}</span>
                    {issue.verificationStatus.isVerified && (
                      <span className="post-verified">Verified</span>
                    )}
                    {issue.assignedTo && (
                      <span className="post-assigned">Assigned</span>
                    )}
                  </div>
                </div>

                <div className="post-footer">
                  <div className="post-actions">
                    <Link to={`/issues/${issue.issueId}`} className="post-action-btn">
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <h3>No Issues Yet</h3>
              <p>Start by submitting your first issue!</p>
              <Link to="/citizen/submit-issue" className="btn btn-primary">
                Report Your First Issue
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
