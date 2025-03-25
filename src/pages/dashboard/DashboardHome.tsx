
import React from 'react';
import { useAuth } from '@/context/auth';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Home</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-medium mb-4">Welcome, {user?.displayName || 'User'}</h2>
        <p className="text-gray-600">
          This is your personal dashboard. From here you can access all your account features.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
