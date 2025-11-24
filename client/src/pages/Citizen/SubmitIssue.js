import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Issue submitted successfully! (Mock)');
    navigate('/citizen/dashboard');
  };

  const handleImageChange = (e) => {
    // Mock image handling
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  return (
    <div className="container">
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

          <div className="form-row">
            <div className="form-group">
              <label className="label">Latitude *</label>
              <input
                type="number"
                step="any"
                className="input"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="28.6139"
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Longitude *</label>
              <input
                type="number"
                step="any"
                className="input"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="77.2090"
                required
              />
            </div>
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

