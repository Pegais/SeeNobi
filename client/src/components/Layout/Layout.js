import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <Logo size="small" />
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/issues" className="nav-link" onClick={() => setMenuOpen(false)}>Issues</Link>
            
            {user ? (
              <>
                {user.userType === 'citizen' && (
                  <>
                    <Link to="/citizen/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/citizen/submit-issue" className="nav-link" onClick={() => setMenuOpen(false)}>Submit</Link>
                  </>
                )}
                {user.userType === 'government_official' && (
                  <Link to="/official/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                )}
                {user.userType === 'private_player' && (
                  <Link to="/private-player/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                )}
                <Link to="/analytics" className="nav-link" onClick={() => setMenuOpen(false)}>Analytics</Link>
                <div className="nav-scores">
                  <div className="nav-score-item">
                    <span className="nav-score-label">Trust</span>
                    <span className="nav-score-value">{user.trustScore || 0}/10</span>
                  </div>
                  <div className="nav-score-item">
                    <span className="nav-score-label">Civic</span>
                    <span className="nav-score-value">{user.civicSenseScore || 0}/100</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary btn-small">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-small" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 SeeNobi Platform. Decentralized Civic Engagement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
