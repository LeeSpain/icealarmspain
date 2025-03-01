
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-ice-500 rounded-lg rotate-45 transform origin-center"></div>
        <div className="absolute inset-1 bg-white rounded-md rotate-45 transform origin-center"></div>
        <div className="absolute inset-[5px] bg-ice-500 rounded-sm rotate-45 transform origin-center"></div>
      </div>
      <div className="font-semibold text-xl">
        <span className="text-ice-700">ICE</span>
        <span className="text-gray-700"> Alarm</span>
        <span className="text-guardian-700"> España</span>
      </div>
    </div>
  );
};

export default Logo;
