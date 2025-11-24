import React from 'react';
import './ScoreDisplay.css';

const ScoreDisplay = ({ type, score, maxScore, label, size = 'medium' }) => {
  const percentage = (score / maxScore) * 100;
  const levelInfo = getLevelInfo(type, score, maxScore);
  
  return (
    <div className={`score-display score-${type} score-${size}`}>
      <div className="score-header">
        <span className="score-label">{label}</span>
        <span className={`score-level score-level-${levelInfo.color}`}>
          {levelInfo.icon} {levelInfo.name}
        </span>
      </div>
      <div className="score-visual">
        <div className="score-circle">
          <svg className="score-svg" viewBox="0 0 100 100">
            <circle
              className="score-circle-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className={`score-circle-progress score-${levelInfo.color}`}
              cx="50"
              cy="50"
              r="45"
              strokeDasharray={`${percentage * 2.827} 282.7`}
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{score}</span>
            <span className="score-max">/{maxScore}</span>
          </div>
        </div>
        <div className="score-icon">{levelInfo.icon}</div>
      </div>
      <div className="score-progress-bar">
        <div
          className={`score-progress-fill score-${levelInfo.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="score-next-level">
        {score < maxScore && (
          <span>
            {maxScore - score} points to {levelInfo.nextLevel}
          </span>
        )}
      </div>
    </div>
  );
};

const getLevelInfo = (type, score, maxScore) => {
  if (type === 'trust') {
    if (score <= 3) return { name: 'Novice', icon: '🌱', color: 'bronze', nextLevel: 'Apprentice' };
    if (score <= 6) return { name: 'Apprentice', icon: '⭐', color: 'silver', nextLevel: 'Expert' };
    if (score <= 8) return { name: 'Expert', icon: '🔥', color: 'gold', nextLevel: 'Master' };
    return { name: 'Master', icon: '👑', color: 'platinum', nextLevel: 'Max' };
  } else {
    if (score <= 40) return { name: 'Citizen', icon: '👤', color: 'bronze', nextLevel: 'Active Citizen' };
    if (score <= 60) return { name: 'Active Citizen', icon: '🌟', color: 'silver', nextLevel: 'Community Leader' };
    if (score <= 80) return { name: 'Community Leader', icon: '🏆', color: 'gold', nextLevel: 'Civic Champion' };
    return { name: 'Civic Champion', icon: '💎', color: 'platinum', nextLevel: 'Max' };
  }
};

export default ScoreDisplay;
