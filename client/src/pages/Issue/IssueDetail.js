import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockIssues, mockUsers } from '../../data/mockData';
import './IssueDetail.css';

const IssueDetail = () => {
  const { id } = useParams();
  const issue = mockIssues.find(i => i.issueId === id);
  
  if (!issue) {
    return <div className="issue-detail-page"><h1>Issue not found</h1></div>;
  }

  const assignedUser = issue.assignedTo ? 
    (issue.assignedTo.userType === 'government_official' ? mockUsers.official : mockUsers.privatePlayer) : null;

  return (
    <div className="issue-detail-page">
      <Link to="/issues" className="back-link">← Back to Issues</Link>
      
      <div className="issue-detail">
        <div className="issue-main">
          <div className="issue-header-detail">
            <h1>{issue.title}</h1>
            <span className={`badge badge-${getStatusColor(issue.status)}`}>
              {issue.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="issue-info">
            <div className="info-section">
              <h3>Description</h3>
              <p>{issue.description}</p>
            </div>

            <div className="info-section">
              <h3>Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Category</label>
                  <p>{issue.category}</p>
                </div>
                <div className="detail-item">
                  <label>Area Code</label>
                  <p>{issue.areaCode}</p>
                </div>
                <div className="detail-item">
                  <label>Location</label>
                  <p>{issue.geotag.lat}, {issue.geotag.long}</p>
                </div>
                <div className="detail-item">
                  <label>Reporter</label>
                  <p>{issue.reporterDisplayName}</p>
                </div>
                <div className="detail-item">
                  <label>Created</label>
                  <p>{new Date(issue.createdAt).toLocaleString()}</p>
                </div>
                <div className="detail-item">
                  <label>Last Updated</label>
                  <p>{new Date(issue.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {issue.images && issue.images.length > 0 && (
              <div className="info-section">
                <h3>Images</h3>
                <div className="images-grid">
                  {issue.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Issue ${idx + 1}`} className="issue-image" />
                  ))}
                </div>
              </div>
            )}

            {issue.verificationStatus.isVerified && (
              <div className="info-section">
                <h3>Verification</h3>
                <div className="verification-info">
                  <p><strong>Verified by:</strong> {assignedUser?.officialName || assignedUser?.companyName || 'Official'}</p>
                  <p><strong>Verified at:</strong> {new Date(issue.verificationStatus.verifiedAt).toLocaleString()}</p>
                  <div className="verification-badges">
                    {issue.verificationStatus.verificationReasons.map((reason, idx) => (
                      <span key={idx} className="badge badge-success">✓ {reason}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {issue.assignedTo && (
              <div className="info-section">
                <h3>Assigned To</h3>
                <Link to={`/${issue.assignedTo.userType === 'government_official' ? 'official' : 'private-player'}/profile/${issue.assignedTo.userId}`}>
                  {assignedUser?.officialName || assignedUser?.companyName || 'Unknown'}
                </Link>
              </div>
            )}

            {issue.notes && issue.notes.length > 0 && (
              <div className="info-section">
                <h3>Notes</h3>
                <div className="notes-list">
                  {issue.notes.map(note => (
                    <div key={note.noteId} className="note-item">
                      <p className="note-content">{note.content}</p>
                      <p className="note-meta">
                        Added by {assignedUser?.officialName || 'Official'} on {new Date(note.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="issue-sidebar">
          <div className="sidebar-card">
            <h3>Area Weighting</h3>
            <p>Priority Multiplier: {issue.areaWeighting.priorityMultiplier}x</p>
            <p>Reporter is {issue.areaWeighting.reporterIsLocal ? 'Local' : issue.areaWeighting.reporterIsAdjacent ? 'Adjacent' : 'Outside'} Resident</p>
          </div>

          {assignedUser && (
            <div className="sidebar-card">
              <h3>Rate This Official</h3>
              <Link to={`/rating/${issue.assignedTo.userType}/${issue.assignedTo.userId}?issueId=${issue.issueId}`} className="btn btn-primary">
                Rate Performance
              </Link>
            </div>
          )}
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

export default IssueDetail;

