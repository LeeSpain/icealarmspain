
import React from "react";

const JoinBackgroundEffects: React.FC = () => {
  return (
    <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-30">
      {/* Minimal opacity background gradients */}
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-ice-100/8 to-transparent rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-gradient-radial from-guardian-100/8 to-transparent rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-gradient-radial from-ice-200/8 to-transparent rounded-full filter blur-3xl opacity-5"></div>
    </div>
  );
};

export default JoinBackgroundEffects;
