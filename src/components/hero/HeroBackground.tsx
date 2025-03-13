
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Simple colored accent elements without any white or light gradients */}
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-br from-guardian-600/20 to-transparent rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-tl from-ice-600/10 to-transparent rounded-full filter blur-3xl opacity-20 -z-10"></div>
      
      {/* Decorative accent lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/30 to-transparent -z-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/20 to-transparent -z-10"></div>
    </>
  );
};

export default HeroBackground;
