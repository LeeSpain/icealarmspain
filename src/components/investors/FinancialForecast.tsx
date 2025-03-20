import React from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, BadgeDollarSign, PieChart, Landmark, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  {
    name: 'Year 1',
    users: 1000,
    revenue: 300000,
    profit: 50000
  },
  {
    name: 'Year 2',
    users: 5000,
    revenue: 1500000,
    profit: 400000
  },
  {
    name: 'Year 3',
    users: 20000,
    revenue: 6000000,
    profit: 2000000
  },
  {
    name: 'Year 4',
    users: 50000,
    revenue: 15000000,
    profit: 5500000
  },
];

const FinancialForecast: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Business Model & Financial Structure</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our business model combines hardware sales with recurring subscriptions to create multiple revenue streams with high margins and scalability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <BadgeDollarSign className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Device Sales</h3>
            <p className="text-muted-foreground">
              One-time purchase of premium hardware devices with 45% profit margins, creating immediate revenue and customer acquisition.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Subscription Model</h3>
            <p className="text-muted-foreground">
              €24.99/month per user with 70% profit margins for AI monitoring, call center support, and emergency services with 92% retention rate.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Strategic Partnerships</h3>
            <p className="text-muted-foreground">
              B2B contracts with healthcare providers, assisted living facilities, and insurance companies for bulk deployments and integrations.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Recurring Revenue</h3>
            <p className="text-muted-foreground">
              85% of projected revenue comes from recurring subscriptions, creating predictable cash flow and high customer lifetime value.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <Landmark className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Infrastructure</h3>
            <p className="text-muted-foreground">
              Cloud-based monitoring platform with AI capabilities and scalable infrastructure allowing expansion to new markets with minimal capital.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-ice-100 w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Growth Timeline</h3>
            <p className="text-muted-foreground">
              Focused expansion across Europe in years 1-2, with North American and Asian market entry planned for years 3-4.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Financial Projection (5-Year Growth)</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our scalable business model projects exponential growth in users, revenue, and profit margins over the next 5 years.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-ice-600 mr-2" />
                Revenue & Profit Growth
              </h4>
              <div className="h-80">
                <ChartContainer
                  config={{
                    revenue: { color: "#2563eb" },
                    profit: { color: "#8b5cf6" }
                  }}
                >
                  <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => 
                        value >= 1000000 
                          ? `€${(value/1000000).toFixed(1)}M` 
                          : `€${(value/1000).toFixed(0)}K`
                      } 
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue" 
                      stroke="#2563eb" 
                      fill="#2563eb" 
                      fillOpacity={0.2} 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      name="Profit" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.3} 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <Users className="h-5 w-5 text-ice-600 mr-2" />
                User Growth
              </h4>
              <div className="h-80">
                <ChartContainer
                  config={{
                    users: { color: "#10b981" }
                  }}
                >
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => 
                        value >= 1000 
                          ? `${(value/1000).toFixed(0)}K` 
                          : value
                      } 
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      name="Active Users" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      dot={{ r: 6, strokeWidth: 2, fill: "white" }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="text-indigo-600 font-semibold mb-2">Year 1</div>
              <div className="text-2xl font-bold mb-1">1,000+ users</div>
              <div className="text-muted-foreground">€300K revenue</div>
              <div className="text-emerald-600 text-sm mt-1">€50K profit</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="text-blue-600 font-semibold mb-2">Year 2</div>
              <div className="text-2xl font-bold mb-1">5,000+ users</div>
              <div className="text-muted-foreground">€1.5M revenue</div>
              <div className="text-emerald-600 text-sm mt-1">€400K profit</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="text-purple-600 font-semibold mb-2">Year 3</div>
              <div className="text-2xl font-bold mb-1">20,000+ users</div>
              <div className="text-muted-foreground">€6M revenue</div>
              <div className="text-emerald-600 text-sm mt-1">€2M profit</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-500 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="text-emerald-600 font-semibold mb-2">Year 4</div>
              <div className="text-2xl font-bold mb-1">50,000+ users</div>
              <div className="text-muted-foreground">€15M revenue</div>
              <div className="text-emerald-600 text-sm mt-1">€5.5M profit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialForecast;
