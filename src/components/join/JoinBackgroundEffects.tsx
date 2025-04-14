import React from "react";

const JoinBackgroundEffects: React.FC = () => {
  return (
    <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-30">
      {/* Removed all gradient effects that were causing white shadows */}
    </div>
  );
};

export default JoinBackgroundEffects;
