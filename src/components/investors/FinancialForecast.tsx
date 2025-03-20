
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, BadgeDollarSign } from 'lucide-react';

const data = [
  {
    name: 'Year 1',
    users: 1000,
    revenue: 300000,
  },
  {
    name: 'Year 2',
    users: 5000,
    revenue: 1500000,
  },
  {
    name: 'Year 3',
    users: 20000,
    revenue: 6000000,
  },
];

const FinancialForecast: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Business Model & Financial Structure</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our business model is built on device sales and recurring subscriptions, with multiple revenue streams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <BadgeDollarSign className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Device Sales</h3>
            <p className="text-muted-foreground">
              Customers purchase devices outright with no leasing options, creating immediate revenue.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Subscription Model</h3>
            <p className="text-muted-foreground">
              €24.99/month per user for AI monitoring, call center assistance, and automated emergency alerts.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Commercial Partnerships</h3>
            <p className="text-muted-foreground">
              Partnering with healthcare organizations, care facilities, and emergency service providers.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center">Financial Forecast (Projected Growth)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                <YAxis yAxisId="right" orientation="right" stroke="#2563eb" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'revenue') {
                      return [`€${(Number(value)/1000000).toFixed(1)}M`, 'Revenue'];
                    }
                    return [value, 'Active Users'];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="users" name="Active Users" fill="#10b981" />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue (€)" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-ice-600">
            <div className="text-ice-600 font-semibold mb-2">Year 1</div>
            <div className="text-2xl font-bold mb-1">1,000+ active users</div>
            <div className="text-muted-foreground">€300K revenue</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-ice-600">
            <div className="text-ice-600 font-semibold mb-2">Year 2</div>
            <div className="text-2xl font-bold mb-1">5,000+ active users</div>
            <div className="text-muted-foreground">€1.5M revenue</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-ice-600">
            <div className="text-ice-600 font-semibold mb-2">Year 3</div>
            <div className="text-2xl font-bold mb-1">20,000+ active users</div>
            <div className="text-muted-foreground">€6M revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialForecast;
