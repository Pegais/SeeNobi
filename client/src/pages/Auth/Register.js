import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    userType: 'citizen'
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration
    const mockUser = {
      userId: 'citizen-new',
      userType: formData.userType,
      email: formData.email,
      trustScore: 1,
      civicSenseScore: 50
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-jwt-token');
    navigate(`/${formData.userType === 'citizen' ? 'citizen' : formData.userType === 'government_official' ? 'official' : 'private-player'}/dashboard`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register on SeeNubee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">User Type</label>
            <select
              className="input"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
            >
              <option value="citizen">Citizen</option>
              <option value="government_official">Government Official</option>
              <option value="private_player">Private Player</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Phone</label>
            <input
              type="tel"
              className="input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </form>
        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

