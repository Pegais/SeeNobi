import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import './Dashboard.css';

const PrivatePlayerDashboard = () => {
  const user = mockUsers.privatePlayer;
  const [filter, setFilter] = useState('all');
  
  // Mock: Issues where private player is mentioned or assigned
  const relatedIssues = mockIssues.filter(issue => 
    issue.category === 'Infrastructure' // Mock filter
  );

  const filteredIssues = filter === 'all' 
    ? relatedIssues 
    : relatedIssues.filter(issue => issue.status === filter);

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1>Private Player Dashboard</h1>
          <p className="company-info">{user.companyName}</p>
        </div>
        <div className="dashboard-actions">
          <Link to={`/private-player/profile/${user.userId}`} className="btn btn-secondary">View Profile</Link>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Trust Score</h3>
          <p className="stat-value">{user.trustScore}/10</p>
        </div>
        <div className="stat-card">
          <h3>Civic Sense Score</h3>
          <p className="stat-value">{user.civicSenseScore}/100</p>
        </div>
        <div className="stat-card">
          <h3>Related Issues</h3>
          <p className="stat-value">{relatedIssues.length}</p>
        </div>
        <div className="stat-card">
          <h3>Reputation</h3>
          <p className="stat-value">Good</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Related Issues</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input">
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="issues-list">
          {filteredIssues.map(issue => (
            <div key={issue.issueId} className="issue-card">
              <div className="issue-header">
                <h3>{issue.title}</h3>
                <span className={`badge badge-${getStatusColor(issue.status)}`}>
                  {issue.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="issue-description">{issue.description}</p>
              <div className="issue-meta">
                <span>Category: {issue.category}</span>
                <span>Area: {issue.areaCode}</span>
                <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="issue-actions">
                <Link to={`/issues/${issue.issueId}`} className="btn btn-primary">View Details</Link>
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
    'submitted': 'info',
    'under_review': 'warning',
    'in_progress': 'info',
    'resolved': 'success',
    'closed': 'success'
  };
  return colors[status] || 'info';
};

export default PrivatePlayerDashboard;

