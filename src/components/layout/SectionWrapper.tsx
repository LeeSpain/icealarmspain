
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`py-14 ${className}`}>
      {children}
    </div>
  );
};

export default SectionWrapper;
