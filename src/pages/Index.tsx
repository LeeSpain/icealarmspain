
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { debug } from "@/utils/debug-logger";

const Index: React.FC = () => {
  useEffect(() => {
    debug("Index page mounted");
    console.log("Index page rendered successfully");
  }, []);
  
  return (
    <Layout>
      <div className="flex-grow relative bg-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Ice Guardian Alert</h1>
          <p className="text-xl mb-8">Welcome to Ice Guardian Alert - your medical alert system for seniors and expatriates in Spain.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">24/7 Monitoring</h2>
              <p>Round-the-clock alert monitoring for peace of mind.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Easy to Use</h2>
              <p>Simple, intuitive devices designed for seniors.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Multilingual Support</h2>
              <p>Support in multiple languages for the expatriate community.</p>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
            <p className="mb-6">Join thousands of satisfied customers who trust Ice Guardian Alert for their safety needs.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
