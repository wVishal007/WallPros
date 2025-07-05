import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-4 border-t-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-4 border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;