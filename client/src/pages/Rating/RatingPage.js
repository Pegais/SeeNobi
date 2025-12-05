import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './RatingPage.css';

const RatingPage = () => {
  const { entityType, entityId } = useParams();
  const [searchParams] = useSearchParams();
  const issueId = searchParams.get('issueId');
  const navigate = useNavigate();

  const isOfficial = entityType === 'government_official';
  
  const [ratings, setRatings] = useState({
    responseTime: isOfficial ? 0 : null,
    resolutionQuality: isOfficial ? 0 : 0,
    communication: isOfficial ? 0 : null,
    accountability: isOfficial ? 0 : null,
    overallPerformance: isOfficial ? 0 : null,
    grievanceResolution: !isOfficial ? 0 : null,
    serviceQuality: !isOfficial ? 0 : null,
    compliance: !isOfficial ? 0 : null,
    transparency: !isOfficial ? 0 : null,
    communityContribution: !isOfficial ? 0 : null,
    overallReliability: !isOfficial ? 0 : null
  });

  const [hadDirectInteraction, setHadDirectInteraction] = useState(false);

  const handleRatingChange = (key, value) => {
    setRatings({ ...ratings, [key]: parseInt(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Rating submitted successfully! (Mock)');
    navigate(-1);
  };

  return (
    <div className="rating-page">
      <h1>Rate {isOfficial ? 'Government Official' : 'Private Player'}</h1>
      <div className="rating-card">
        {issueId && (
          <div className="info-box">
            <p><strong>Rating for Issue:</strong> {issueId}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isOfficial ? (
            <>
              <div className="rating-group">
                <label className="label">Response Time *</label>
                <select
                  className="input"
                  value={ratings.responseTime}
                  onChange={(e) => handleRatingChange('responseTime', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Resolution Quality *</label>
                <select
                  className="input"
                  value={ratings.resolutionQuality}
                  onChange={(e) => handleRatingChange('resolutionQuality', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Communication *</label>
                <select
                  className="input"
                  value={ratings.communication}
                  onChange={(e) => handleRatingChange('communication', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Accountability *</label>
                <select
                  className="input"
                  value={ratings.accountability}
                  onChange={(e) => handleRatingChange('accountability', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Overall Performance *</label>
                <select
                  className="input"
                  value={ratings.overallPerformance}
                  onChange={(e) => handleRatingChange('overallPerformance', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="rating-group">
                <label className="label">Grievance Resolution *</label>
                <select
                  className="input"
                  value={ratings.grievanceResolution}
                  onChange={(e) => handleRatingChange('grievanceResolution', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Service Quality *</label>
                <select
                  className="input"
                  value={ratings.serviceQuality}
                  onChange={(e) => handleRatingChange('serviceQuality', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Compliance *</label>
                <select
                  className="input"
                  value={ratings.compliance}
                  onChange={(e) => handleRatingChange('compliance', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Transparency *</label>
                <select
                  className="input"
                  value={ratings.transparency}
                  onChange={(e) => handleRatingChange('transparency', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Community Contribution *</label>
                <select
                  className="input"
                  value={ratings.communityContribution}
                  onChange={(e) => handleRatingChange('communityContribution', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="rating-group">
                <label className="label">Overall Reliability *</label>
                <select
                  className="input"
                  value={ratings.overallReliability}
                  onChange={(e) => handleRatingChange('overallReliability', e.target.value)}
                  required
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </>
          )}

          <div className="rating-group">
            <label className="label">
              <input
                type="checkbox"
                checked={hadDirectInteraction}
                onChange={(e) => setHadDirectInteraction(e.target.checked)}
              />
              {' '}I had direct interaction with this {isOfficial ? 'official' : 'entity'}
            </label>
          </div>

          <div className="info-box">
            <p><strong>Note:</strong> Only citizens with trust score > 4 can submit ratings. Your rating will be weighted based on your area and interaction.</p>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit Rating</button>
        </form>
      </div>
    </div>
  );
};

export default RatingPage;

