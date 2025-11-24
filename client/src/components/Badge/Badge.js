import React from 'react';
import './Badge.css';

const Badge = ({ type, text, icon, size = 'medium' }) => {
  return (
    <div className={`badge badge-${type} badge-${size}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-text">{text}</span>
    </div>
  );
};

export default Badge;

