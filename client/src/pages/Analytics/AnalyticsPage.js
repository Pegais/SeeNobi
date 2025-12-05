import React from 'react';
import { mockAnalytics, mockIssues } from '../../data/mockData';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const analytics = mockAnalytics;

  return (
    <div className="analytics-container">
      <h1>Platform Analytics</h1>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Users</h3>
          <p className="stat-large">{analytics.totalUsers.toLocaleString()}</p>
        </div>
        <div className="analytics-card">
          <h3>Total Issues</h3>
          <p className="stat-large">{analytics.totalIssues.toLocaleString()}</p>
        </div>
        <div className="analytics-card">
          <h3>Resolved Issues</h3>
          <p className="stat-large">{analytics.resolvedIssues.toLocaleString()}</p>
        </div>
        <div className="analytics-card">
          <h3>Resolution Rate</h3>
          <p className="stat-large">
            {((analytics.resolvedIssues / analytics.totalIssues) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="analytics-card">
          <h3>Average Trust Score</h3>
          <p className="stat-large">{analytics.averageTrustScore}/10</p>
        </div>
        <div className="analytics-card">
          <h3>Average Civic Sense Score</h3>
          <p className="stat-large">{analytics.averageCivicSenseScore}/100</p>
        </div>
      </div>

      <div className="analytics-section">
        <h2>Issues by Category</h2>
        <div className="chart-container">
          {Object.entries(analytics.issuesByCategory).map(([category, count]) => (
            <div key={category} className="chart-item">
              <div className="chart-bar-container">
                <div
                  className="chart-bar"
                  style={{
                    width: `${(count / analytics.totalIssues) * 100}%`
                  }}
                />
              </div>
              <div className="chart-label">
                <span>{category}</span>
                <span className="chart-value">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-section">
        <h2>Issues by Status</h2>
        <div className="status-grid">
          {Object.entries(analytics.issuesByStatus).map(([status, count]) => (
            <div key={status} className="status-card">
              <h4>{status.replace('_', ' ').toUpperCase()}</h4>
              <p className="status-count">{count}</p>
              <div className="status-bar">
                <div
                  className="status-bar-fill"
                  style={{
                    width: `${(count / analytics.totalIssues) * 100}%`,
                    backgroundColor: getStatusColor(status)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    'submitted': '#7dd3fc', // Light blue (info color from theme)
    'under_review': '#ffd700', // Gold (warning color from theme)
    'in_progress': '#7dd3fc', // Light blue (info color from theme)
    'resolved': '#a0d4a0' // Light green (success color from theme)
  };
  return colors[status] || '#718096'; // Default to accent color
};

export default AnalyticsPage;

