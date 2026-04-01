// ProfileCard.jsx
import React from 'react';
import './ProfileCard.css';

function ProfileCard() {
  // ── Student data stored as JavaScript variables ──
  const name       = 'Arjun Sharma';
  const department = 'Computer Science & Engineering';
  const year       = '3rd Year';
  const section    = 'Section B';
  const rollNo     = 'CS22B1042';
  const status     = 'Enrolled';

  // Derive initials for the avatar from the name variable
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        {/* ── Header ── */}
        <div className="profile-header">
          {/* Avatar rendered with dynamic initials */}
          <div className="avatar">{initials}</div>

          {/* Name bound dynamically via JSX curly-brace expression */}
          <h1 className="profile-name">{name}</h1>

          {/* Status badge */}
          <span className="profile-badge">⬤ &nbsp;{status}</span>
        </div>

        {/* ── Detail rows ── */}
        <div className="profile-body">

          <div className="detail-row">
            <span className="detail-label">
              <span className="detail-icon">🎓</span> Roll No
            </span>
            {/* JSX expression binding renders the rollNo variable */}
            <span className="detail-value">{rollNo}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              <span className="detail-icon">🏛️</span> Department
            </span>
            {/* JSX expression binding renders the department variable */}
            <span className="detail-value">{department}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              <span className="detail-icon">📅</span> Year
            </span>
            {/* JSX expression binding renders the year variable */}
            <span className="detail-value">{year}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              <span className="detail-icon">📌</span> Section
            </span>
            {/* JSX expression binding renders the section variable */}
            <span className="detail-value">{section}</span>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="profile-footer">
          <span className="status-dot"></span>
          <span className="status-text">Currently Active · Academic Year 2025–26</span>
        </div>

      </div>
    </div>
  );
}

export default ProfileCard;
