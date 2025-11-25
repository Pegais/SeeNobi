// Location utilities for caching and reverse geocoding

const LOCATION_CACHE_KEY = 'seenobi_user_location';
const LOCATION_CHANGE_THRESHOLD = 0.01; // ~1km change in lat/long

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

// Check if location has changed significantly
export const hasLocationChanged = (newLat, newLon, cachedLat, cachedLon) => {
  if (!cachedLat || !cachedLon) return true;
  const distance = calculateDistance(newLat, newLon, cachedLat, cachedLon);
  return distance > 1; // Changed if moved more than 1km
};

// Get cached location
export const getCachedLocation = () => {
  try {
    const cached = localStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('Error reading cached location:', e);
  }
  return null;
};

// Cache location
export const cacheLocation = (location) => {
  try {
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify({
      ...location,
      cachedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Error caching location:', e);
  }
};

// Get location from IP address (fallback method)
const getLocationFromIP = async () => {
  try {
    // Using ip-api.com (free, no API key required, 45 requests/minute)
    const response = await fetch('http://ip-api.com/json/?fields=status,message,lat,lon,city,regionName,country,countryCode');
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        latitude: data.lat,
        longitude: data.lon,
        locationName: `${data.city}, ${data.regionName}, ${data.country}`,
        city: data.city,
        region: data.regionName,
        country: data.country,
        countryCode: data.countryCode,
        accuracy: 5000, // IP-based is less accurate (~5km)
        source: 'ip'
      };
    }
    throw new Error(data.message || 'IP geolocation failed');
  } catch (error) {
    console.error('Error getting location from IP:', error);
    // Try alternative IP geolocation service
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data.latitude && data.longitude) {
        return {
          latitude: data.latitude,
          longitude: data.longitude,
          locationName: `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
          city: data.city,
          region: data.region,
          country: data.country_name,
          countryCode: data.country_code,
          accuracy: 5000,
          source: 'ip'
        };
      }
    } catch (e) {
      console.error('Alternative IP geolocation also failed:', e);
    }
    throw error;
  }
};

// Reverse geocoding using OpenStreetMap Nominatim (free, no API key)
export const reverseGeocode = async (lat, lon) => {
  try {
    // Using OpenStreetMap Nominatim API (free, requires User-Agent header)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'SeeNobi Platform - Civic Engagement App' // Required by Nominatim
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.address) {
      const addr = data.address;
      // Build location name from available address components
      const parts = [];
      
      // Try to get area/locality/suburb first (most specific)
      if (addr.suburb || addr.neighbourhood || addr.village) {
        parts.push(addr.suburb || addr.neighbourhood || addr.village);
      }
      
      // Then city/town
      if (addr.city || addr.town || addr.municipality) {
        parts.push(addr.city || addr.town || addr.municipality);
      }
      
      // Then district/state
      if (addr.state_district || addr.state) {
        parts.push(addr.state_district || addr.state);
      }
      
      // Finally country
      if (addr.country) {
        parts.push(addr.country);
      }
      
      const locationName = parts.length > 0 
        ? parts.join(', ') 
        : data.display_name || `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
      
      return {
        locationName,
        city: addr.city || addr.town || addr.municipality || '',
        area: addr.suburb || addr.neighbourhood || addr.village || addr.locality || '',
        region: addr.state_district || addr.state || '',
        country: addr.country || '',
        postalCode: addr.postcode || ''
      };
    }
    
    // Fallback to display_name if address parsing fails
    return {
      locationName: data.display_name || `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
      city: '',
      area: '',
      region: '',
      country: '',
      postalCode: ''
    };
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    // Fallback to coordinates
    return {
      locationName: `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
      city: '',
      area: '',
      region: '',
      country: '',
      postalCode: ''
    };
  }
};

// Get user location with caching - Hybrid approach (GPS + IP fallback)
export const getUserLocation = () => {
  return new Promise(async (resolve, reject) => {
    // Check cache first
    const cached = getCachedLocation();
    if (cached && cached.latitude && cached.longitude) {
      // Check if cache is still valid (less than 1 hour old)
      const cacheAge = cached.cachedAt 
        ? (Date.now() - new Date(cached.cachedAt).getTime()) / 1000 / 60 // minutes
        : Infinity;
      
      if (cacheAge < 60) { // Cache valid for 1 hour
        resolve(cached);
        return;
      }
    }

    // Try Browser Geolocation API first (most accurate)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            source: 'gps'
          };

          // Check if location changed significantly from cache
          if (cached && cached.latitude && cached.longitude) {
            if (!hasLocationChanged(
              location.latitude,
              location.longitude,
              cached.latitude,
              cached.longitude
            )) {
              // Location hasn't changed significantly, use cached location name
              resolve(cached);
              return;
            }
          }

          // Get location name using reverse geocoding
          try {
            const geoData = await reverseGeocode(location.latitude, location.longitude);
            location.locationName = geoData.locationName;
            location.city = geoData.city;
            location.area = geoData.area;
            location.region = geoData.region;
            location.country = geoData.country;
            location.postalCode = geoData.postalCode;
          } catch (e) {
            console.error('Error getting location name:', e);
            location.locationName = `Location (${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)})`;
          }

          // Cache the location
          cacheLocation(location);
          resolve(location);
        },
        async (error) => {
          // GPS failed, fallback to IP-based geolocation
          console.log('GPS geolocation failed, trying IP-based fallback...', error);
          try {
            const ipLocation = await getLocationFromIP();
            // Cache the IP-based location
            cacheLocation(ipLocation);
            resolve(ipLocation);
          } catch (ipError) {
            // Both methods failed
            reject(new Error('Unable to determine location. GPS and IP geolocation both failed.'));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      // Browser doesn't support geolocation, use IP-based
      console.log('Browser geolocation not supported, using IP-based location...');
      try {
        const ipLocation = await getLocationFromIP();
        cacheLocation(ipLocation);
        resolve(ipLocation);
      } catch (error) {
        reject(new Error('Geolocation not supported and IP geolocation failed.'));
      }
    }
  });
};
