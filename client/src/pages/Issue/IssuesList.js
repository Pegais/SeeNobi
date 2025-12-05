import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockIssues } from '../../data/mockData';
import './IssuesList.css';

const IssuesList = () => {
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');

  const filteredIssues = mockIssues.filter(issue => {
    if (filter !== 'all' && issue.status !== filter) return false;
    if (category !== 'all' && issue.category !== category) return false;
    return true;
  });

  return (
    <div className="issues-page">
      <h1>All Issues</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input">
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            <option value="all">All</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
          </select>
        </div>
      </div>

      <div className="issues-grid">
        {filteredIssues.map(issue => (
          <div key={issue.issueId} className="issue-card">
            <div className="issue-header">
              <h3>{issue.title}</h3>
              <span className={`badge badge-${getStatusColor(issue.status)}`}>
                {issue.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="issue-description">{issue.description.substring(0, 150)}...</p>
            <div className="issue-meta">
              <span>By: {issue.reporterDisplayName}</span>
              <span>Category: {issue.category}</span>
              <span>Area: {issue.areaCode}</span>
            </div>
            {issue.verificationStatus.isVerified && (
              <div className="verification-badges">
                {issue.verificationStatus.verificationReasons.map((reason, idx) => (
                  <span key={idx} className="badge badge-success">✓ {reason}</span>
                ))}
              </div>
            )}
            <Link to={`/issues/${issue.issueId}`} className="btn btn-secondary">View Details</Link>
          </div>
        ))}
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

export default IssuesList;

