
import React from "react";

export const LoginLoading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-ice-50/30">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
        <p className="text-ice-700">Loading...</p>
      </div>
    </div>
  );
};
