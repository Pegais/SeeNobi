import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import './Dashboard.css';

const OfficialDashboard = () => {
  const user = mockUsers.official;
  const [filter, setFilter] = useState('all');
  
  const assignedIssues = mockIssues.filter(issue => 
    issue.assignedTo && issue.assignedTo.userId === user.userId
  );

  const filteredIssues = filter === 'all' 
    ? assignedIssues 
    : assignedIssues.filter(issue => issue.status === filter);

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1>Official Dashboard</h1>
          <p className="official-info">{user.officialName} - {user.department}</p>
        </div>
        <div className="dashboard-actions">
          <Link to={`/official/profile/${user.userId}`} className="btn btn-secondary">View Profile</Link>
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
          <h3>Assigned Issues</h3>
          <p className="stat-value">{assignedIssues.length}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p className="stat-value">{assignedIssues.filter(i => i.status === 'resolved').length}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Assigned Issues</h2>
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
                <span>Reporter: {issue.reporterDisplayName}</span>
                <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="issue-actions">
                <Link to={`/issues/${issue.issueId}`} className="btn btn-primary">View & Update</Link>
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

export default OfficialDashboard;

