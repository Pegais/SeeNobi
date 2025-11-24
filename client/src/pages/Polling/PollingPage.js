import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPolls } from '../../data/mockData';
import './PollingPage.css';

const PollingPage = () => {
  const { entityType, entityId } = useParams();
  const navigate = useNavigate();
  const poll = mockPolls.find(p => p.entityId === entityId);
  const isOfficial = entityType === 'government_official';

  const [vote, setVote] = useState({
    verification: '',
    inService: ''
  });

  const handleVote = (e) => {
    e.preventDefault();
    // Mock voting
    alert('Vote submitted successfully! (Mock)');
    navigate(-1);
  };

  if (!poll) {
    return (
      <div className="container">
        <h1>Poll Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Verification Poll</h1>
      <div className="polling-container">
        <div className="poll-card">
          <h2>Poll Results</h2>
          <div className="poll-results">
            <div className="result-item">
              <label>Total Votes</label>
              <p>{poll.results.totalVotes}</p>
            </div>
            <div className="result-item">
              <label>Verified Votes</label>
              <p className="positive">{poll.results.verifiedVotes}</p>
            </div>
            <div className="result-item">
              <label>Not Verified Votes</label>
              <p className="negative">{poll.results.notVerifiedVotes}</p>
            </div>
            {isOfficial && (
              <>
                <div className="result-item">
                  <label>In Service Votes</label>
                  <p className="positive">{poll.results.inServiceVotes}</p>
                </div>
                <div className="result-item">
                  <label>Not In Service Votes</label>
                  <p className="negative">{poll.results.notInServiceVotes}</p>
                </div>
              </>
            )}
            <div className="result-item">
              <label>Weighted Score</label>
              <p className="score">{poll.results.weightedScore.toFixed(2)}</p>
            </div>
          </div>

          <div className="poll-status">
            <span className={`badge badge-${poll.status === 'completed' ? 'success' : 'warning'}`}>
              {poll.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="poll-card">
          <h2>Cast Your Vote</h2>
          <form onSubmit={handleVote}>
            <div className="vote-group">
              <label className="label">Is this {isOfficial ? 'person' : 'entity'} verified? *</label>
              <select
                className="input"
                value={vote.verification}
                onChange={(e) => setVote({ ...vote, verification: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="verified">Yes, Verified</option>
                <option value="not_verified">No, Not Verified</option>
              </select>
            </div>

            {isOfficial && (
              <div className="vote-group">
                <label className="label">Is this person currently in service? *</label>
                <select
                  className="input"
                  value={vote.inService}
                  onChange={(e) => setVote({ ...vote, inService: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="in_service">Yes, In Service</option>
                  <option value="not_in_service">No, Not In Service</option>
                </select>
              </div>
            )}

            <div className="info-box">
              <p><strong>Note:</strong> Your vote will be weighted based on your trust score and area belonging. Local residents have more weight.</p>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit Vote</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PollingPage;

