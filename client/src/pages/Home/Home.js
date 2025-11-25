import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay';
import Badge from '../../components/Badge/Badge';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());
  
  // Mock login status - Set mock user if not already logged in
  const getMockUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    // Set mock user data
    const mockUser = {
      userId: mockUsers.citizen.userId,
      userType: 'citizen',
      displayName: mockUsers.citizen.displayName,
      trustScore: mockUsers.citizen.trustScore,
      civicSenseScore: mockUsers.citizen.civicSenseScore,
      itrVerified: mockUsers.citizen.itrVerified
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token-12345');
    return mockUser;
  };

  const user = getMockUser();
  const isLoggedIn = true; // Always show as logged in for demo
  const userData = mockUsers.citizen; // Use mock citizen data
  
  // Sort issues by recent activity (most recent first)
  const sortedIssues = [...mockIssues].sort((a, b) => 
    new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
  );

  const handleLike = (issueId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(issueId)) {
        newSet.delete(issueId);
      } else {
        newSet.add(issueId);
        setDislikedPosts(prevDis => {
          const newDisSet = new Set(prevDis);
          newDisSet.delete(issueId);
          return newDisSet;
        });
      }
      return newSet;
    });
  };

  const handleDislike = (issueId) => {
    setDislikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(issueId)) {
        newSet.delete(issueId);
      } else {
        newSet.add(issueId);
        setLikedPosts(prevLike => {
          const newLikeSet = new Set(prevLike);
          newLikeSet.delete(issueId);
          return newLikeSet;
        });
      }
      return newSet;
    });
  };

  return (
    <div className="home-feed">
      {/* Left Sidebar - Toggle Panel for Logged In Users */}
      {isLoggedIn && userData && (
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
                {userData.displayName.charAt(userData.displayName.length - 1)}
              </div>
              <div className="sidebar-user-info">
                <h3>{userData.displayName}</h3>
                <p className="user-type-badge">Citizen</p>
              </div>
            </div>

            <div className="sidebar-scores">
              <ScoreDisplay
                type="trust"
                score={userData.trustScore}
                maxScore={10}
                label="Trust Score"
                compact={true}
              />
              <ScoreDisplay
                type="civic"
                score={userData.civicSenseScore}
                maxScore={100}
                label="Civic Sense Score"
                compact={true}
              />
            </div>

            <div className="sidebar-stats">
              <div className="stat-item">
                <span className="stat-value">
                  {mockIssues.filter(i => i.reporterId === userData.userId).length}
                </span>
                <span className="stat-label">My Issues</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {mockIssues.filter(i => i.reporterId === userData.userId && i.status === 'resolved').length}
                </span>
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
            </div>

            <div className="sidebar-achievements">
              <h4>Achievements</h4>
              <div className="achievements-grid">
                {userData.trustScore >= 7 && (
                  <Badge type="premium" text="Master" icon="👑" size="small" />
                )}
                {userData.civicSenseScore >= 75 && (
                  <Badge type="success" text="Champion" icon="💎" size="small" />
                )}
                {userData.itrVerified && (
                  <Badge type="verified" text="Tax Compliant" icon="✓" size="small" />
                )}
              </div>
            </div>
          </aside>
          {sidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
          )}
        </>
      )}

      {/* Main Feed Section */}
      <main className="feed-main">
        {/* Header - Only show if not logged in */}
        {!isLoggedIn && (
          <div className="feed-header-banner">
            <h1>SeeNobi</h1>
            <p className="header-tagline">Decentralized Civic Engagement Platform</p>
            <div className="header-actions">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
        )}

        {/* Create Post Section - Only for logged in users */}
        {isLoggedIn && (
          <div className="create-post-card">
            <div className="create-post-header">
              <div className="create-post-avatar">
                {userData?.displayName.charAt(userData.displayName.length - 1)}
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
        )}

        {/* Feed Posts - Issues as Social Media Posts */}
        <div className="feed-posts">
          {sortedIssues.map(issue => (
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

              {/* Like/Dislike Buttons - Mobile Style */}
              <div className="post-reactions-mobile">
                <button 
                  className={`reaction-btn dislike-btn ${dislikedPosts.has(issue.issueId) ? 'active' : ''}`}
                  onClick={() => handleDislike(issue.issueId)}
                  aria-label="Dislike"
                >
                  <span className="reaction-icon">👎</span>
                </button>
                <button 
                  className={`reaction-btn like-btn ${likedPosts.has(issue.issueId) ? 'active' : ''}`}
                  onClick={() => handleLike(issue.issueId)}
                  aria-label="Like"
                >
                  <span className="reaction-icon">👍</span>
                </button>
              </div>

              {/* Post Footer - Desktop Style */}
              <div className="post-footer">
                <div className="post-actions">
                  <button 
                    className={`post-action-btn ${likedPosts.has(issue.issueId) ? 'active' : ''}`}
                    onClick={() => handleLike(issue.issueId)}
                  >
                    <span className="action-icon">👍</span>
                    <span>Like/Agree</span>
                  </button>
                  <Link to={`/issues/${issue.issueId}`} className="post-action-btn">
                    <span className="action-icon">💬</span>
                    <span>View Details</span>
                  </Link>
                  <button 
                    className={`post-action-btn ${dislikedPosts.has(issue.issueId) ? 'active' : ''}`}
                    onClick={() => handleDislike(issue.issueId)}
                  >
                    <span className="action-icon">👎</span>
                    <span>Dislike/Disagree</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="bottom-nav">
        <button 
          className="nav-item active"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button 
          className="nav-item"
          onClick={() => navigate('/issues')}
          aria-label="History"
        >
          <span className="nav-icon">🔄</span>
          <span className="nav-label">History</span>
        </button>
        <Link 
          to="/citizen/submit-issue"
          className="nav-item nav-add"
          aria-label="Add Issue"
        >
          <span className="nav-icon">➕</span>
        </Link>
        <button 
          className="nav-item"
          onClick={() => {
            const firstLiked = Array.from(likedPosts)[0];
            if (firstLiked) navigate(`/issues/${firstLiked}`);
          }}
          aria-label="Liked"
        >
          <span className="nav-icon">👍</span>
          <span className="nav-label">Liked</span>
        </button>
        <button 
          className="nav-item"
          onClick={() => {
            const firstDisliked = Array.from(dislikedPosts)[0];
            if (firstDisliked) navigate(`/issues/${firstDisliked}`);
          }}
          aria-label="Disliked"
        >
          <span className="nav-icon">👎</span>
          <span className="nav-label">Disliked</span>
        </button>
      </nav>
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

export default Home;
