
import React from 'react';

const BasicDebug = () => {
  console.log("BasicDebug component rendering");
  return (
    <div className="fixed top-0 left-0 bg-red-500 text-white p-4 z-50">
      Debug Component (remove me after fixing)
    </div>
  );
};

export default BasicDebug;
