
import React from "react";

interface SectionDividerProps {
  variant?: "white-to-ice" | "transparent-to-white";
}

const SectionDivider: React.FC<SectionDividerProps> = ({ variant = "transparent-to-white" }) => {
  const gradientClass = variant === "transparent-to-white" 
    ? "from-transparent to-white/80" 
    : "from-white to-ice-50/30";
  
  return (
    <div className="relative">
      <div className={`absolute left-0 right-0 h-16 bg-gradient-to-b ${gradientClass} -top-16 z-10`}></div>
    </div>
  );
};

export default SectionDivider;
