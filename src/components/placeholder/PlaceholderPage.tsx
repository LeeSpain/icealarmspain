
import React from 'react';

interface PlaceholderPageProps {
  name: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ name }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{name}</h1>
        <p className="text-gray-600 mb-6">
          This page is currently under development.
        </p>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-left">
          <p className="font-medium text-amber-800 mb-2">Page Information:</p>
          <ul className="list-disc pl-5 text-amber-700 space-y-1">
            <li>Page: {name}</li>
            <li>Status: Coming Soon</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
