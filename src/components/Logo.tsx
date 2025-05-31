
import React from 'react';

const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className={className}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Modern gradient background circle */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:"#8B5CF6", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#10B981", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#FFFFFF", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#F3F4F6", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* Main background circle with gradient */}
        <circle cx="25" cy="25" r="24" fill="url(#bgGradient)" stroke="white" strokeWidth="1"/>
        
        {/* Inner connecting network representing empowerment */}
        <circle cx="15" cy="15" r="4" fill="url(#nodeGradient)" stroke="#3B82F6" strokeWidth="1.5"/>
        <circle cx="35" cy="15" r="4" fill="url(#nodeGradient)" stroke="#10B981" strokeWidth="1.5"/>
        <circle cx="25" cy="35" r="4" fill="url(#nodeGradient)" stroke="#8B5CF6" strokeWidth="1.5"/>
        <circle cx="25" cy="25" r="3" fill="#F59E0B" stroke="white" strokeWidth="1"/>
        
        {/* Dynamic connection lines with glow effect */}
        <line x1="15" y1="15" x2="25" y2="25" stroke="white" strokeWidth="2.5" opacity="0.9"/>
        <line x1="35" y1="15" x2="25" y2="25" stroke="white" strokeWidth="2.5" opacity="0.9"/>
        <line x1="25" y1="25" x2="25" y2="35" stroke="white" strokeWidth="2.5" opacity="0.9"/>
        <line x1="15" y1="15" x2="25" y2="35" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="35" y1="15" x2="25" y2="35" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        
        {/* Small connecting dots for enhanced network effect */}
        <circle cx="20" cy="20" r="1.5" fill="#F59E0B" opacity="0.8"/>
        <circle cx="30" cy="20" r="1.5" fill="#F59E0B" opacity="0.8"/>
        <circle cx="25" cy="30" r="1.5" fill="#F59E0B" opacity="0.8"/>
      </svg>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
        EmpowerLink
      </span>
    </div>
  );
};

export default Logo;
