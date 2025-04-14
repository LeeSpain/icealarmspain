
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Completely remove background elements that could cause white shadows */}
      <div className="absolute -z-30 opacity-0 pointer-events-none">
        {/* Placeholder div to maintain structure but with zero opacity */}
      </div>
    </>
  );
};

export default HeroBackground;
