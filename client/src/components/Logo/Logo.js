import React from 'react';
import logoImage from '../../assests/seenobi.png';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-container logo-${size}`}>
      <div className="logo-wrapper">
        <img 
          src={logoImage} 
          alt="SeeNobi Logo" 
          className="logo-image"
          style={{
            mixBlendMode: 'screen',
            filter: 'brightness(1.4) contrast(1.2)',
          }}
        />
      </div>
    </div>
  );
};

export default Logo;
