import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress, cacheLocation, reverseGeocode } from '../../utils/locationUtils';
import './AddressVerification.css';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map click handler component
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    }
  });
  return null;
};

const AddressVerification = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('map'); // 'map' or 'address'
  const [step, setStep] = useState(1); // 1: Location selection, 2: Document upload, 3: Confirmation
  const [formData, setFormData] = useState({
    address: '',
    documentType: '',
    documentFile: null,
    documentPreview: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [mapPosition, setMapPosition] = useState([28.6139, 77.2090]); // Default: New Delhi
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Get user's current location for map center
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapPosition([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Use default if geolocation fails
          console.log('Using default map position');
        }
      );
    }
  }, []);

  // Handle map click
  const handleMapClick = async (lat, lng) => {
    setLoading(true);
    setError('');
    setSelectedPosition([lat, lng]);
    
    try {
      // Reverse geocode the clicked location
      const geoData = await reverseGeocode(lat, lng);
      const locationData = {
        latitude: lat,
        longitude: lng,
        locationName: geoData.locationName,
        city: geoData.city,
        area: geoData.area,
        region: geoData.region,
        country: geoData.country,
        postalCode: geoData.postalCode,
        accuracy: 10, // Map selection is very accurate (~10m)
        source: 'map_selected'
      };
      
      setLocation(locationData);
      setFormData(prev => ({
        ...prev,
        address: geoData.locationName // Auto-fill address from reverse geocoding
      }));
    } catch (err) {
      setError('Could not get address for selected location. Please try again.');
      console.error('Reverse geocoding error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle address input submit
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const geocodedLocation = await geocodeAddress(formData.address);
      setLocation(geocodedLocation);
      setSelectedPosition([geocodedLocation.latitude, geocodedLocation.longitude]);
      setMapPosition([geocodedLocation.latitude, geocodedLocation.longitude]);
      setStep(2); // Move to document upload
    } catch (err) {
      setError('Could not find location for this address. Please check and try again.');
      console.error('Geocoding error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle location confirmation (from map or address)
  const handleLocationConfirm = () => {
    if (location) {
      setStep(2); // Move to document upload
    } else {
      setError('Please select a location first');
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        setError('Please upload an image (JPG, PNG) or PDF file');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        documentFile: file,
        documentPreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      setError('');
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    if (!formData.documentFile) {
      setError('Please upload a verification document');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Mock document upload - in production, upload to S3
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Cache the verified location
      const verifiedLocation = {
        ...location,
        verified: true,
        verifiedAt: new Date().toISOString(),
        documentType: formData.documentType,
        source: method === 'map' ? 'map_verified' : 'address_verified'
      };
      
      cacheLocation(verifiedLocation);
      
      // Store verification status
      localStorage.setItem('addressVerified', JSON.stringify({
        address: formData.address || location.locationName,
        documentType: formData.documentType,
        verifiedAt: verifiedLocation.verifiedAt,
        method: method
      }));
      
      setStep(3); // Confirmation
    } catch (err) {
      setError('Failed to upload document. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    navigate('/citizen/profile');
  };

  return (
    <div className="container">
      <div className="address-verification-container">
        <h1>Verify Your Address</h1>
        <p className="verification-subtitle">
          Accurate location helps us prioritize local issues and give you proper area-based weighting.
        </p>

        {/* Step 1: Location Selection */}
        {step === 1 && (
          <div className="verification-step">
            <h2>Step 1: Select Your Location</h2>
            
            {/* Method Selection Tabs */}
            <div className="method-tabs">
              <button
                type="button"
                className={`method-tab ${method === 'map' ? 'active' : ''}`}
                onClick={() => setMethod('map')}
              >
                📍 Select from Map
              </button>
              <button
                type="button"
                className={`method-tab ${method === 'address' ? 'active' : ''}`}
                onClick={() => setMethod('address')}
              >
                📝 Enter Address
              </button>
            </div>

            {/* Map Selection Method */}
            {method === 'map' && (
              <div className="map-selection-container">
                <div className="map-wrapper">
                  <MapContainer
                    center={mapPosition}
                    zoom={13}
                    style={{ height: '400px', width: '100%', borderRadius: '8px' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onLocationSelect={handleMapClick} />
                    {selectedPosition && (
                      <Marker position={selectedPosition} />
                    )}
                  </MapContainer>
                </div>
                
                <div className="map-instructions">
                  <p>📍 Click on the map to select your location</p>
                  {loading && <p className="loading-text">Getting address...</p>}
                </div>

                {location && (
                  <div className="location-preview">
                    <h3>📍 Selected Location:</h3>
                    <p className="location-name">{location.locationName}</p>
                    <p className="location-coords">
                      Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                    <p className="location-accuracy">Accuracy: ±{location.accuracy}m</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={handleLocationConfirm}
                    >
                      Confirm Location
                    </button>
                  </div>
                )}

                {error && <div className="error-message">{error}</div>}
              </div>
            )}

            {/* Address Input Method */}
            {method === 'address' && (
              <form onSubmit={handleAddressSubmit} className="address-form">
                <div className="form-group">
                  <label>Full Address *</label>
                  <textarea
                    className="input"
                    rows="4"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete address (Street, Area, City, State, Pincode)"
                    required
                  />
                  <small className="form-hint">
                    Include: Street name, Area/Locality, City, State, and Pincode for best accuracy
                  </small>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Finding Location...' : 'Find Location'}
                </button>

                {location && (
                  <div className="location-preview">
                    <h3>📍 Location Found:</h3>
                    <p className="location-name">{location.locationName}</p>
                    <p className="location-coords">
                      Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                    <p className="location-accuracy">Accuracy: ±{location.accuracy}m</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={handleLocationConfirm}
                    >
                      Confirm Location
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        )}

        {/* Step 2: Document Upload */}
        {step === 2 && location && (
          <div className="verification-step">
            <h2>Step 2: Upload Verification Document</h2>
            <div className="location-preview">
              <h3>📍 Verified Location:</h3>
              <p className="location-name">{location.locationName}</p>
              <p className="location-coords">
                Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </p>
              <p className="location-accuracy">Accuracy: ±{location.accuracy}m</p>
            </div>

            <form onSubmit={handleDocumentSubmit}>
              <div className="form-group">
                <label>Document Type *</label>
                <select
                  className="input"
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                  required
                >
                  <option value="">Select document type</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="bank_statement">Bank Statement</option>
                  <option value="utility_bill">Utility Bill (Electricity/Water/Gas)</option>
                  <option value="driving_license">Driving License</option>
                  <option value="voter_id">Voter ID Card</option>
                  <option value="rent_agreement">Rent Agreement</option>
                  <option value="other">Other Government Document</option>
                </select>
                <small className="form-hint">
                  Upload a document that shows your current address
                </small>
              </div>

              <div className="form-group">
                <label>Upload Document *</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="document-upload"
                    accept="image/*,.pdf"
                    onChange={handleDocumentChange}
                    className="file-input"
                    required
                  />
                  <label htmlFor="document-upload" className="file-upload-label">
                    {formData.documentFile ? (
                      <>
                        <span className="file-name">✓ {formData.documentFile.name}</span>
                        {formData.documentPreview && (
                          <img src={formData.documentPreview} alt="Preview" className="document-preview" />
                        )}
                      </>
                    ) : (
                      <>
                        <span className="upload-icon">📄</span>
                        <span>Click to upload or drag and drop</span>
                        <small>JPG, PNG or PDF (Max 5MB)</small>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading || !formData.documentFile}>
                  {loading ? 'Uploading...' : 'Upload & Verify'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="verification-step verification-success">
            <div className="success-icon">✓</div>
            <h2>Address Verified Successfully!</h2>
            <p>Your address has been verified and your location has been updated.</p>
            <div className="verified-location">
              <p><strong>Address:</strong> {formData.address || location.locationName}</p>
              <p><strong>Location:</strong> {location.locationName}</p>
              <p><strong>Method:</strong> {method === 'map' ? 'Map Selection' : 'Address Input'}</p>
              <p><strong>Document:</strong> {formData.documentType.replace('_', ' ').toUpperCase()}</p>
            </div>
            <button onClick={handleConfirm} className="btn btn-primary btn-block">
              Continue to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressVerification;
