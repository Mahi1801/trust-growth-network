
import React from 'react';

const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="20" cy="20" r="19" stroke="#2563EB" strokeWidth="2" fill="white"/>
      
      {/* Interconnected nodes representing empowerment */}
      <circle cx="12" cy="12" r="3" fill="#2563EB"/>
      <circle cx="28" cy="12" r="3" fill="#10B981"/>
      <circle cx="20" cy="25" r="3" fill="#8B5CF6"/>
      <circle cx="20" cy="15" r="2" fill="#F59E0B"/>
      
      {/* Connection lines */}
      <line x1="12" y1="12" x2="20" y2="15" stroke="#2563EB" strokeWidth="2"/>
      <line x1="28" y1="12" x2="20" y2="15" stroke="#10B981" strokeWidth="2"/>
      <line x1="20" y1="15" x2="20" y2="25" stroke="#8B5CF6" strokeWidth="2"/>
      <line x1="12" y1="12" x2="20" y2="25" stroke="#2563EB" strokeWidth="1" opacity="0.5"/>
      <line x1="28" y1="12" x2="20" y2="25" stroke="#10B981" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
};

export default Logo;
