import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay';
import Badge from '../../components/Badge/Badge';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <div className="hero-logo-banner">
            <Logo size="banner" />
          </div>
          <p className="hero-subtitle">Decentralized Civic Engagement Platform</p>
          <p className="hero-description">
            Empowering citizens to report issues, track resolutions, and build better communities.
            Your voice matters, especially in your area.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-large">Get Started</Link>
            <Link to="/issues" className="btn btn-secondary btn-large">View Issues</Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Anonymous submissions with verified backend. Your identity is protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Area-Based Weighting</h3>
              <p>Local residents have more say in their area's issues.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Trust Scoring</h3>
              <p>1-10 trust score based on verification and report accuracy.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Civic Sense Score</h3>
              <p>Track your civic engagement and contribution to the community.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verification Badges</h3>
              <p>Reports verified by officials with clear reasons displayed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Citizen-Driven</h3>
              <p>No super admin. Citizens verify officials and private players.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="gamification-section">
        <div className="container">
          <h2 className="section-title">Level Up Your Civic Engagement</h2>
          <div className="scores-showcase">
            <ScoreDisplay
              type="trust"
              score={7}
              maxScore={10}
              label="Trust Score"
            />
            <ScoreDisplay
              type="civic"
              score={75}
              maxScore={100}
              label="Civic Sense Score"
            />
          </div>
          <div className="badges-showcase">
            <h3>Earn Badges & Achievements</h3>
            <div className="badges-grid">
              <Badge type="verified" text="Verified Citizen" icon="✓" />
              <Badge type="premium" text="Local Hero" icon="🏅" />
              <Badge type="success" text="Issue Resolver" icon="🎯" />
              <Badge type="info" text="Community Leader" icon="👑" />
            </div>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="container">
          <h2 className="section-title">Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <h3>1,234</h3>
              <p>Active Citizens</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <h3>5,678</h3>
              <p>Issues Reported</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <h3>3,456</h3>
              <p>Issues Resolved</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏛️</div>
              <h3>89</h3>
              <p>Government Officials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
