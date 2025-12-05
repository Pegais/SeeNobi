import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', width, height }) => {
  // Size-based dimensions
  const sizeMap = {
    small: { logoSize: 32, circleSize: 24, textSize: 20 },
    medium: { logoSize: 40, circleSize: 32, textSize: 24 },
    large: { logoSize: 80, circleSize: 64, textSize: 48 }
  };

  const dimensions = sizeMap[size] || sizeMap.medium;
  const logoWidth = width || dimensions.logoSize * 2;
  const logoHeight = height || dimensions.logoSize * 2.5;

  return (
    <div 
      className={`logo-container logo-${size}`}
      style={{ 
        width: `${logoWidth}px`, 
        height: `${logoHeight}px`,
      }}
    >
      <div className="logo-content">
        {/* Logo Circle */}
        <div className="logo-circle-wrapper">
          {/* Glow effect */}
          <div className="logo-glow"></div>
          
          {/* Main circle */}
          <div className="logo-circle">
            {/* Hooded figure and camera icon */}
            <svg viewBox="0 0 200 200" className="logo-svg">
              {/* Hood - gray side */}
              <path
                d="M 100 50 Q 130 50 140 80 L 140 120 Q 135 125 120 125 L 100 125 L 100 50 Z"
                fill="#9ca3af"
              />
              
              {/* Hood - orange side */}
              <path
                d="M 100 50 Q 70 50 60 80 L 60 120 Q 65 125 80 125 L 100 125 L 100 50 Z"
                fill="#ff8c3c"
              />
              
              {/* Face mask - dark */}
              <ellipse cx="100" cy="90" rx="30" ry="25" fill="#1a1a1a" />
              
              {/* Eyes */}
              <ellipse cx="90" cy="85" rx="8" ry="5" fill="#ff8c3c" />
              <ellipse cx="110" cy="85" rx="8" ry="5" fill="#ff8c3c" />
              
              {/* Lower face mask */}
              <path
                d="M 75 95 Q 100 105 125 95 L 125 100 Q 100 108 75 100 Z"
                fill="#ff8c3c"
              />
              
              {/* Camera aperture circle */}
              <circle cx="100" cy="150" r="28" fill="#1a1a1a" stroke="#ff8c3c" strokeWidth="3" />
              
              {/* Aperture blades */}
              <g transform="translate(100, 150)">
                <path d="M 0 -15 L 8 -8 L 0 0 Z" fill="#ff8c3c" />
                <path d="M 13 -7.5 L 8 0 L 13 7.5 Z" fill="#ff8c3c" />
                <path d="M 8 8 L 0 15 L 0 0 Z" fill="#ff8c3c" />
                <path d="M -8 8 L 0 0 L 0 15 Z" fill="#ff8c3c" />
                <path d="M -13 7.5 L -8 0 L -13 -7.5 Z" fill="#ff8c3c" />
                <path d="M -8 -8 L 0 -15 L 0 0 Z" fill="#ff8c3c" />
              </g>
              
              {/* Center circle of aperture */}
              <circle cx="100" cy="150" r="6" fill="#1a1a1a" />
            </svg>
          </div>
        </div>
        
        {/* Text Logo */}
        <div className="logo-text">
          <span className="logo-text-see">See</span>
          <span className="logo-text-nubee">Nubee</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
