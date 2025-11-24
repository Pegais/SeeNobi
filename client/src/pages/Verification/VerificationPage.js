import React, { useState } from 'react';
import './VerificationPage.css';

const VerificationPage = () => {
  const [userType, setUserType] = useState('citizen');
  const [formData, setFormData] = useState({
    employeeId: '',
    officialEmail: '',
    companyName: '',
    companyRegistration: '',
    gstNumber: '',
    contractorLicense: '',
    businessPan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock verification submission
    alert('Verification request submitted! Citizen polling will be initiated. (Mock)');
  };

  return (
    <div className="container">
      <h1>Verification</h1>
      <div className="verification-card">
        <div className="form-group">
          <label className="label">User Type</label>
          <select
            className="input"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="citizen">Citizen</option>
            <option value="government_official">Government Official</option>
            <option value="private_player">Private Player</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {userType === 'government_official' && (
            <>
              <div className="form-group">
                <label className="label">Employee ID *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Official Email *</label>
                <input
                  type="email"
                  className="input"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  placeholder="name@government.gov.in"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Employee ID Card (Upload)</label>
                <input type="file" accept="image/*,.pdf" className="input" />
              </div>
            </>
          )}

          {userType === 'private_player' && (
            <>
              <div className="form-group">
                <label className="label">Company Name *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Company Registration (CIN/LLP) *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.companyRegistration}
                  onChange={(e) => setFormData({ ...formData, companyRegistration: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">GST Number *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Contractor License</label>
                <input
                  type="text"
                  className="input"
                  value={formData.contractorLicense}
                  onChange={(e) => setFormData({ ...formData, contractorLicense: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="label">Business PAN *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.businessPan}
                  onChange={(e) => setFormData({ ...formData, businessPan: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Company Documents (Upload)</label>
                <input type="file" multiple accept="image/*,.pdf" className="input" />
              </div>
            </>
          )}

          {userType === 'citizen' && (
            <div className="info-box">
              <p>Citizens are verified through phone, email, and government ID upload. No additional verification needed here.</p>
            </div>
          )}

          {(userType === 'government_official' || userType === 'private_player') && (
            <>
              <div className="info-box">
                <p><strong>Note:</strong> After document verification, a citizen polling will be initiated. Citizens will vote to verify your identity. Local residents' votes have more weight.</p>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit Verification Request</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;

