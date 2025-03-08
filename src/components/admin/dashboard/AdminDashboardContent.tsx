
import React from "react";
import { AdminDashboardContentProps } from "./AdminDashboardContent.d";
import DashboardMetrics from "../DashboardMetrics";
import SectionRenderer from "./SectionRenderer";
import ActivityManager from "./ActivityManager";

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({
  activeSection,
  dashboardData,
  addActivity
}) => {
  return (
    <div className="space-y-8">
      {activeSection === 'dashboard' || activeSection === '' ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Data metric cards with proper props */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.totalRevenue}</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-emerald-500 font-medium">{dashboardData.monthlyGrowth}</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Customers</h3>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.totalCustomers}</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-blue-500 font-medium">+12%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Devices</h3>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.activeDevices}</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-purple-500 font-medium">+8%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Orders</h3>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.pendingOrders}</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-amber-500 font-medium">Action needed</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
              {/* Chart or visualization would go here */}
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Revenue visualization</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {/* Using direct recentActivities array and onActivityAdded prop */}
              <ActivityManager 
                activities={dashboardData.recentActivities || []} 
                onActivityAdded={(activities) => {
                  // Handle updated activities
                  // This is a wrapper for the addActivity function
                  if (activities && activities.length > 0) {
                    const latestActivity = activities[0];
                    addActivity(latestActivity.type, latestActivity.description);
                  }
                }} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Growth</span>
                  <span className="text-green-600 font-medium">{dashboardData.monthlyGrowth}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: dashboardData.monthlyGrowth }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="text-blue-600 font-medium">{dashboardData.customerSatisfaction}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: dashboardData.customerSatisfaction }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors flex flex-col items-center justify-center">
                  <span className="material-icons mb-1">add_circle</span>
                  <span className="text-sm">New Order</span>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors flex flex-col items-center justify-center">
                  <span className="material-icons mb-1">person_add</span>
                  <span className="text-sm">Add User</span>
                </button>
                <button className="p-4 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors flex flex-col items-center justify-center">
                  <span className="material-icons mb-1">inventory</span>
                  <span className="text-sm">Inventory</span>
                </button>
                <button className="p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors flex flex-col items-center justify-center">
                  <span className="material-icons mb-1">analytics</span>
                  <span className="text-sm">Reports</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <SectionRenderer 
          activeSection={activeSection}
          onAction={(action) => {
            // This wrapper converts the single-argument onAction to the two-argument addActivity
            addActivity("System", action);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboardContent;
