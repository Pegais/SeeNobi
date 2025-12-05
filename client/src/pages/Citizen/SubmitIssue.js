import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmitIssue.css';

const SubmitIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    latitude: '',
    longitude: '',
    images: []
  });
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, loading, success, error
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();

  // Get user's current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationStatus('loading');
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }));
        setLocationStatus('success');
      },
      (error) => {
        setLocationStatus('error');
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred while getting location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate location
    if (!formData.latitude || !formData.longitude) {
      alert('Please allow location access to submit an issue.');
      getCurrentLocation();
      return;
    }
    
    // Mock submission
    alert(`Issue submitted successfully! (Mock)\nLocation: ${formData.latitude}, ${formData.longitude}`);
    navigate('/citizen/dashboard');
  };

  const handleImageChange = (e) => {
    // Mock image handling
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  return (
    <div className="submit-issue-container">
      <h1>Submit New Issue</h1>
      <div className="submit-issue-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Title *</label>
            <input
              type="text"
              className="input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Description *</label>
            <textarea
              className="input"
              rows="6"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the issue..."
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Category *</label>
            <select
              className="input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select category</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Location *</label>
            <div className="location-container">
              {locationStatus === 'loading' && (
                <div className="location-status loading">
                  <span className="location-icon">📍</span>
                  <span>Getting your location...</span>
                </div>
              )}
              {locationStatus === 'success' && (
                <div className="location-status success">
                  <span className="location-icon">✅</span>
                  <span>Location captured: {formData.latitude}, {formData.longitude}</span>
                  <button 
                    type="button" 
                    className="btn-refresh-location"
                    onClick={getCurrentLocation}
                    title="Refresh location"
                  >
                    🔄
                  </button>
                </div>
              )}
              {locationStatus === 'error' && (
                <div className="location-status error">
                  <span className="location-icon">⚠️</span>
                  <span>{locationError}</span>
                  <button 
                    type="button" 
                    className="btn-refresh-location"
                    onClick={getCurrentLocation}
                    title="Try again"
                  >
                    🔄 Retry
                  </button>
                </div>
              )}
              {locationStatus === 'idle' && (
                <div className="location-status">
                  <span className="location-icon">📍</span>
                  <span>Click to get your location</span>
                  <button 
                    type="button" 
                    className="btn-refresh-location"
                    onClick={getCurrentLocation}
                  >
                    Get Location
                  </button>
                </div>
              )}
            </div>
            {locationStatus !== 'success' && (
              <p className="location-hint">
                Location is required to submit an issue. Please allow location access when prompted.
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="label">Images (Optional)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />
            {formData.images.length > 0 && (
              <p className="image-count">{formData.images.length} image(s) selected</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit Issue</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitIssue;

