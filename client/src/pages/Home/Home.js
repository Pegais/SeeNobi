import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import { getUserLocation, calculateDistance, isLocationAccurate } from '../../utils/locationUtils';
import './Home.css';


const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());
  const [issueLikes, setIssueLikes] = useState({});
  const [issueDislikes, setIssueDislikes] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  
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
      displayName: mockUsers.citizen.displayName
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token-12345');
    return mockUser;
  };

  const user = getMockUser();
  const isLoggedIn = true; // Always show as logged in for demo
  const userData = mockUsers.citizen; // Use mock citizen data
  
  // Sort issues by location proximity and recent activity
  const sortedIssues = useMemo(() => {
    const issues = [...mockIssues];
    
    // If user location is available, sort by proximity first
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      issues.forEach(issue => {
        if (issue.geotag && issue.geotag.lat && issue.geotag.long) {
          issue.distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            issue.geotag.lat,
            issue.geotag.long
          );
        } else {
          issue.distance = Infinity; // Issues without location go to the end
        }
      });
      
      // Sort by distance (closest first), then by recent activity
      return issues.sort((a, b) => {
        if (a.distance !== b.distance) {
          return a.distance - b.distance;
        }
        return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      });
    }
    
    // If no location, sort by recent activity only
    return issues.sort((a, b) => 
      new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );
  }, [userLocation, mockIssues]);

  // Initialize likes/dislikes from mock data
  useEffect(() => {
    const initialLikes = {};
    const initialDislikes = {};
    mockIssues.forEach(issue => {
      initialLikes[issue.issueId] = issue.likes || 0;
      initialDislikes[issue.issueId] = issue.dislikes || 0;
    });
    setIssueLikes(initialLikes);
    setIssueDislikes(initialDislikes);
  }, []);

  // Get user location on mount
  useEffect(() => {
    getUserLocation()
      .then(location => {
        setUserLocation(location);
        setLocationLoading(false);
        
        // ✅ IMPROVED: Check accuracy and warn if needed
        if (!isLocationAccurate(location)) {
          console.warn('Location accuracy is low:', location.accuracy, 'm. Consider verifying your address.');
        }
      })
      .catch(error => {
        console.error('Error getting location:', error);
        setLocationLoading(false);
      });
  }, []);

  const handleLike = (issueId) => {
    const isLiked = likedPosts.has(issueId);
    const isDisliked = dislikedPosts.has(issueId);
    const currentLikes = issueLikes[issueId] ?? (mockIssues.find(i => i.issueId === issueId)?.likes || 0);
    const currentDislikes = issueDislikes[issueId] ?? (mockIssues.find(i => i.issueId === issueId)?.dislikes || 0);
    
    if (isLiked) {
      // Unlike
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(issueId);
        return newSet;
      });
      setIssueLikes(prev => ({ ...prev, [issueId]: Math.max(0, currentLikes - 1) }));
    } else {
      // Like
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.add(issueId);
        return newSet;
      });
      setIssueLikes(prev => ({ ...prev, [issueId]: currentLikes + 1 }));
      
      if (isDisliked) {
        // Remove dislike
        setDislikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(issueId);
          return newSet;
        });
        setIssueDislikes(prev => ({ ...prev, [issueId]: Math.max(0, currentDislikes - 1) }));
      }
    }
  };

  const handleDislike = (issueId) => {
    const isLiked = likedPosts.has(issueId);
    const isDisliked = dislikedPosts.has(issueId);
    const currentLikes = issueLikes[issueId] ?? (mockIssues.find(i => i.issueId === issueId)?.likes || 0);
    const currentDislikes = issueDislikes[issueId] ?? (mockIssues.find(i => i.issueId === issueId)?.dislikes || 0);
    
    if (isDisliked) {
      // Remove dislike
      setDislikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(issueId);
        return newSet;
      });
      setIssueDislikes(prev => ({ ...prev, [issueId]: Math.max(0, currentDislikes - 1) }));
    } else {
      // Dislike
      setDislikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.add(issueId);
        return newSet;
      });
      setIssueDislikes(prev => ({ ...prev, [issueId]: currentDislikes + 1 }));
      
      if (isLiked) {
        // Remove like
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(issueId);
          return newSet;
        });
        setIssueLikes(prev => ({ ...prev, [issueId]: Math.max(0, currentLikes - 1) }));
      }
    }
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
            <span>{sidebarOpen ? '×' : '≡'}</span>
          </button>
          <aside className={`left-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-avatar">
                {userData.displayName.charAt(userData.displayName.length - 1)}
              </div>
              <div className="sidebar-user-info">
                <h3>{userData.displayName}</h3>
              </div>
            </div>

            {/* Location Display */}
            <div className="sidebar-location-box">
              <div className="sidebar-location-header">
                <span className="sidebar-location-title">Location</span>
              </div>
              {locationLoading ? (
                <div className="sidebar-location-loading">
                  <span>Loading location...</span>
                </div>
              ) : userLocation ? (
                <div className="sidebar-location-content">
                  <div className="sidebar-location-name">
                    <span className="sidebar-location-label">Area</span>
                    <span className="sidebar-location-value">
                      {userLocation.area || userLocation.city || userLocation.locationName || 'Unknown'}
                    </span>
                  </div>
                  <div className="sidebar-location-city">
                    <span className="sidebar-location-label">City</span>
                    <span className="sidebar-location-value">
                      {userLocation.city || userLocation.region || 'Unknown'}
                    </span>
                  </div>
                  {!isLocationAccurate(userLocation) && (
                    <Link to="/citizen/verify-address" className="btn btn-secondary" style={{ marginTop: '8px', fontSize: '12px', padding: '6px 12px' }}>
                      Verify Address
                    </Link>
                  )}
                </div>
              ) : (
                <div className="sidebar-location-error">
                  <span>Location unavailable</span>
                  <button 
                    type="button" 
                    className="btn-refresh-location-sidebar"
                    onClick={() => {
                      setLocationLoading(true);
                      getUserLocation()
                        .then(location => {
                          setUserLocation(location);
                          setLocationLoading(false);
                        })
                        .catch(error => {
                          console.error('Error getting location:', error);
                          setLocationLoading(false);
                        });
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            <div className="sidebar-stats">
              <div className="stat-item">
                <span className="stat-value">
                  {mockIssues.filter(i => i.reporterId === userData.userId).length}
                </span>
                <span className="stat-label">Issues</span>
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
                <span>Report Issue</span>
              </Link>
              <Link to="/citizen/profile" className="sidebar-action-btn">
                <span>Profile</span>
              </Link>
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
            <h1>SeeNubee</h1>
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
                Report an issue in your area
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

              {/* Like/Dislike Buttons - YouTube Style */}
              <div className="post-reactions-youtube">
                <button 
                  className={`youtube-btn like-btn ${likedPosts.has(issue.issueId) ? 'active' : ''}`}
                  onClick={() => handleLike(issue.issueId)}
                  aria-label="Agree"
                >
                  <span className="youtube-icon">Agree</span>
                  <span className="youtube-count">
                    {issueLikes[issue.issueId] !== undefined 
                      ? issueLikes[issue.issueId] 
                      : (issue.likes || 0)}
                  </span>
                </button>
                <button 
                  className={`youtube-btn dislike-btn ${dislikedPosts.has(issue.issueId) ? 'active' : ''}`}
                  onClick={() => handleDislike(issue.issueId)}
                  aria-label="Disagree"
                >
                  <span className="youtube-icon">Disagree</span>
                  <span className="youtube-count">
                    {issueDislikes[issue.issueId] !== undefined 
                      ? issueDislikes[issue.issueId] 
                      : (issue.dislikes || 0)}
                  </span>
                </button>
              </div>

              {/* Post Footer - Desktop Style */}
              <div className="post-footer">
                <div className="post-actions">
                  <button 
                    className={`youtube-btn like-btn ${likedPosts.has(issue.issueId) ? 'active' : ''}`}
                    onClick={() => handleLike(issue.issueId)}
                  >
                    <span className="youtube-icon">Agree</span>
                    <span className="youtube-count">
                      {issueLikes[issue.issueId] !== undefined 
                        ? issueLikes[issue.issueId] 
                        : (issue.likes || 0)}
                    </span>
                  </button>
                  <Link to={`/issues/${issue.issueId}`} className="post-action-btn">
                    <span>View Details</span>
                  </Link>
                  <button 
                    className={`youtube-btn dislike-btn ${dislikedPosts.has(issue.issueId) ? 'active' : ''}`}
                    onClick={() => handleDislike(issue.issueId)}
                  >
                    <span className="youtube-icon">Disagree</span>
                    <span className="youtube-count">
                      {issueDislikes[issue.issueId] !== undefined 
                        ? issueDislikes[issue.issueId] 
                        : (issue.dislikes || 0)}
                    </span>
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
          <span className="nav-label">Home</span>
        </button>
        <button 
          className="nav-item"
          onClick={() => navigate('/issues')}
          aria-label="Issues"
        >
          <span className="nav-label">Issues</span>
        </button>
        <Link 
          to="/citizen/submit-issue"
          className="nav-item nav-add"
          aria-label="Report Issue"
        >
          <span className="nav-label">+</span>
        </Link>
        <Link 
          to="/citizen/profile"
          className="nav-item"
          aria-label="Profile"
        >
          <span className="nav-label">Profile</span>
        </Link>
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
