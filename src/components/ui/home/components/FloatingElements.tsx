import React from 'react';

export const FloatingElements = () => {
  return (
    <>
      <div className="absolute top-20 left-10 w-24 h-24 opacity-20 animate-float">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2563EB" />
          <path d="M2 17L12 22L22 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 w-24 h-24 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#2563EB" />
          <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="white" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/4 w-32 h-32 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2563EB" />
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 opacity-10 animate-float" style={{ animationDelay: '3s' }}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#2563EB" />
        </svg>
      </div>
    </>
  );
}; 