
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to Ice Guardian</h1>
          <p className="text-xl text-blue-700">Your trusted companion for safety and health monitoring</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">SOS Pendant</h2>
            <p className="text-gray-600 mb-4">Emergency assistance at the press of a button, anywhere you go.</p>
            <a href="/sos-pendant" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Learn More</a>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Medical Dispenser</h2>
            <p className="text-gray-600 mb-4">Never miss a dose with our smart medication management system.</p>
            <a href="/medical-dispenser" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Learn More</a>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Glucose Monitor</h2>
            <p className="text-gray-600 mb-4">Continuous monitoring of blood glucose levels for better health management.</p>
            <a href="/glucose-monitor" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Learn More</a>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">Log In</a>
            <a href="/signup" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
