import React from 'react';

export const BackgroundElements = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb10_1px,transparent_1px),linear-gradient(to_bottom,#2563eb10_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb10_1px,transparent_1px),linear-gradient(to_bottom,#2563eb10_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-indigo-50/20 to-purple-50/20"></div>
    </div>
  );
}; 