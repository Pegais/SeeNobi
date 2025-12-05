import React from 'react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';
import './Profile.css';

const CitizenProfile = () => {
  const user = mockUsers.citizen;

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <div className="info-item">
              <label>Display Name</label>
              <p>{user.displayName}</p>
            </div>
            <div className="info-item">
              <label>User Type</label>
              <p>{user.userType.replace('_', ' ').toUpperCase()}</p>
            </div>
            <div className="info-item">
              <label>Trust Score</label>
              <p className="score-value">{user.trustScore}/10</p>
            </div>
            <div className="info-item">
              <label>Civic Sense Score</label>
              <p className="score-value">{user.civicSenseScore}/100</p>
            </div>
            <div className="info-item">
              <label>ITR Verified</label>
              <p>{user.itrVerified ? '✓ Yes' : '✗ No'}</p>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>Addresses</h2>
            <Link to="/citizen/verify-address" className="btn btn-primary">
              Verify/Update Address
            </Link>
          </div>
          {user.addresses.map(addr => (
            <div key={addr.addressId} className="address-item">
              <p><strong>Area Code:</strong> {addr.areaCode}</p>
              <p><strong>Location:</strong> {addr.geotag.lat}, {addr.geotag.long}</p>
              <p><strong>Status:</strong> {addr.verified ? '✓ Verified' : 'Pending'}</p>
              {addr.isPrimary && <span className="badge badge-info">Primary</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;

