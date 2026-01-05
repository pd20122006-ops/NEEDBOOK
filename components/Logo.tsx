
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'icon';
  color?: 'white' | 'blue';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, variant = 'full', color = 'blue' }) => {
  const primaryColor = color === 'blue' ? '#2563eb' : '#FFFFFF';
  const secondaryColor = color === 'blue' ? '#60a5fa' : '#BFDBFE';

  const iconMarkup = (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract Book Shape */}
      <rect x="20" y="25" width="60" height="50" rx="8" fill={primaryColor} />
      
      {/* Pages Detail */}
      <path d="M50 25V75" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      
      {/* Connection/Swap Swoosh */}
      <path 
        d="M35 50C35 40 45 35 55 35C65 35 75 45 75 55C75 65 65 75 55 75" 
        stroke={secondaryColor} 
        strokeWidth="6" 
        strokeLinecap="round" 
        className="animate-pulse"
      />
      
      {/* Arrow Head for Swap */}
      <path 
        d="M58 72L53 77L48 72" 
        stroke={secondaryColor} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Academic Cap Detail (Subtle) */}
      <path d="M50 15L65 22L50 29L35 22L50 15Z" fill={secondaryColor} />
      <path d="M65 22V32" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'icon') return iconMarkup;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {iconMarkup}
      <span 
        className={`text-2xl font-black tracking-tighter ${color === 'white' ? 'text-white' : 'text-blue-600'}`}
        style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
      >
        NeedBook
      </span>
    </div>
  );
};

export default Logo;
