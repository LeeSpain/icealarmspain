import React from "react";

interface DashboardMetricsProps {
  data: any;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Revenue Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-gray-800">{data.totalRevenue}</p>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500 font-medium">{data.monthlyGrowth}</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </div>
      
      {/* Customers Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-500 text-sm font-medium mb-2">Total Customers</h3>
        <p className="text-3xl font-bold text-gray-800">{data.totalCustomers}</p>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500 font-medium">+12%</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </div>
      
      {/* Active Devices Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-500 text-sm font-medium mb-2">Active Devices</h3>
        <p className="text-3xl font-bold text-gray-800">{data.activeDevices}</p>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500 font-medium">+8%</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </div>
      
      {/* Pending Orders Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Orders</h3>
        <p className="text-3xl font-bold text-gray-800">{data.pendingOrders}</p>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-amber-500 font-medium">Action needed</span>
        </div>
      </div>
      
      {/* Customer Satisfaction */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
        <h3 className="text-gray-700 font-medium mb-4">Customer Satisfaction</h3>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-500 h-4 rounded-full" 
              style={{ width: data.customerSatisfaction }}
            ></div>
          </div>
          <span className="text-lg font-bold ml-4">{data.customerSatisfaction}</span>
        </div>
      </div>
      
      {/* Revenue by Product */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
        <h3 className="text-gray-700 font-medium mb-4">Revenue by Product</h3>
        <div className="space-y-4">
          {data.revenueByProduct?.map((product: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{product.name}</span>
                <span className="text-sm font-medium text-gray-700">€{product.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-ice-600 h-2.5 rounded-full" 
                  style={{ width: `${(product.value / 15000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-4">
        <h3 className="text-gray-700 font-medium mb-4">Recent Activities</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentActivities?.map((activity: any) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      activity.type === 'System' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { type DashboardMetricsProps };
export default DashboardMetrics;
