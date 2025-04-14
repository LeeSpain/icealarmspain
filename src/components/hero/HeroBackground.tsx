
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Significantly reduced opacity background elements */}
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-br from-guardian-600/5 to-transparent rounded-full filter blur-3xl opacity-5 -z-20"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-tl from-ice-600/3 to-transparent rounded-full filter blur-3xl opacity-3 -z-20"></div>
      
      {/* Further reduced opacity for decorative lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/3 to-transparent -z-20"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/3 to-transparent -z-20"></div>
    </>
  );
};

export default HeroBackground;
