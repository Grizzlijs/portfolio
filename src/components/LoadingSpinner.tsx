import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'white'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };
  
  return (
    <div className={`loading-spinner ${sizeClasses[size]}`} 
         style={{ borderTopColor: color }}>
    </div>
  );
};

export default LoadingSpinner;
