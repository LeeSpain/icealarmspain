
import React from 'react';

const TestingPage: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Testing Page</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Application Status</h2>
          <div className="grid gap-4">
            <div className="border-b pb-2">
              <span className="font-medium">Environment:</span> {import.meta.env.VITE_ENVIRONMENT || 'Not set'}
            </div>
            <div className="border-b pb-2">
              <span className="font-medium">Firebase Config:</span> {!!import.meta.env.VITE_FIREBASE_API_KEY ? 'Available' : 'Missing'}
            </div>
            <div className="border-b pb-2">
              <span className="font-medium">Build Mode:</span> {import.meta.env.MODE}
            </div>
            <div className="border-b pb-2">
              <span className="font-medium">Window Diagnostics:</span> {typeof window !== 'undefined' && window.appDiagnostics ? 'Available' : 'Not available'}
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a href="/" className="p-3 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 text-center">Home</a>
            <a href="/about" className="p-3 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 text-center">About</a>
            <a href="/contact" className="p-3 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 text-center">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
