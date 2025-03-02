
import React from "react";

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-ice-50/40"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-200 to-transparent rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-radial from-guardian-200 to-transparent rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute top-40 left-1/4 w-64 h-64 bg-gradient-radial from-ice-100/30 to-transparent rounded-full filter blur-2xl"></div>
    </>
  );
};
