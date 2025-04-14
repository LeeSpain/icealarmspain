
import React from "react";

const DecorativeElements: React.FC = () => {
  return (
    <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-20">
      {/* Reduced opacity and blur for all elements */}
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-ice-100/30 to-transparent rounded-full filter blur-3xl opacity-20 animate-pulse-gentle"></div>
      <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-gradient-radial from-guardian-100/20 to-transparent rounded-full filter blur-3xl opacity-15"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-gradient-radial from-ice-200/20 to-transparent rounded-full filter blur-3xl opacity-10 animate-pulse-gentle" style={{ animationDelay: "2s" }}></div>
    </div>
  );
};

export default DecorativeElements;
