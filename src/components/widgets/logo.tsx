import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 50, className = '' }) => {
  return (
    <div className={`logo-wrapper ${className}`}>
      <img
        src="/logo-nobg.png"
        alt="Company Logo"
        width={width}
        height={height}
        className="logo-image"
      />
    </div>
  );
};

export default Logo;
