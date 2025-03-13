
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
      {/* Removed the white circle that was here */}
      
      {/* Decorative accent lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
    </>
  );
};

export default HeroBackground;
