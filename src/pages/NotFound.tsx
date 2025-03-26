
import React from 'react';
import Layout from '@/components/layout/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">404 - Page Not Found</h1>
        <p className="text-xl mb-8">The page you are looking for does not exist.</p>
        <a 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </Layout>
  );
};

export default NotFound;
