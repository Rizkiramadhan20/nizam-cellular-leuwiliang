import React from 'react';

export const BackgroundBlobs = () => {
  return (
    <>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[100px]" />
      <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[100px]" />
      <div className="absolute left-1/4 bottom-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[80px]" />
    </>
  );
}; 