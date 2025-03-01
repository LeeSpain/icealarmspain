
import React from "react";
import { Activity, Battery, Bell, Calendar, Check, Clock, MessageSquare, User, AlertTriangle } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  status?: "normal" | "warning" | "alert";
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  status = "normal",
  className 
}) => {
  const statusColors = {
    normal: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    alert: "bg-red-50 text-red-600"
  };
  
  return (
    <div className={`dashboard-card ${className}`}>
      <div className="dashboard-card-header">
        <div className="dashboard-card-title">{title}</div>
        <div className="text-muted-foreground/70">{icon}</div>
      </div>
      <div className="dashboard-card-value">{value}</div>
      {trend && (
        <div className={`mt-2 text-xs px-2 py-1 rounded-full self-start ${statusColors[status]}`}>
          {trend}
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-white to-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ICE Members Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            Monitor health data in real-time and receive AI-driven insights for proactive care.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative glass-panel p-6 md:p-8 lg:p-10 overflow-hidden animate-blur-in">
            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-ice-300/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-guardian-300/10 rounded-full"></div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ice-100 flex items-center justify-center">
                  <User size={20} className="text-ice-600" />
                </div>
                <div>
                  <h3 className="font-medium">María García</h3>
                  <p className="text-sm text-muted-foreground">Dashboard Overview</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>Last updated: 2 min ago</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-guardian-100 flex items-center justify-center relative">
                  <Bell size={18} className="text-guardian-600" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
              </div>
            </div>
            
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <MetricCard
                title="Glucose Level"
                value="124 mg/dL"
                icon={<Activity size={18} />}
                trend="Stable"
                status="normal"
                className="animate-slide-up animate-delay-100"
              />
              <MetricCard
                title="SOS Pendant"
                value="Active"
                icon={<Check size={18} />}
                trend="Battery: 92%"
                status="normal"
                className="animate-slide-up animate-delay-200"
              />
              <MetricCard
                title="Last Medication"
                value="8:00 AM"
                icon={<Calendar size={18} />}
                trend="On Schedule"
                status="normal"
                className="animate-slide-up animate-delay-300"
              />
            </div>
            
            {/* AI Guardian Interaction */}
            <div className="glass-panel bg-white/70 p-4 rounded-xl border border-white/50 animate-slide-up animate-delay-400">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ice-500 to-guardian-500 flex items-center justify-center text-white flex-shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">AI Guardian</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                  <p className="text-sm mt-1">
                    Good morning, María. Your glucose levels are within normal range today. Remember to take your medication at 12:00 PM. Would you like me to remind you?
                  </p>
                  
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 text-sm rounded-full bg-ice-50 text-ice-600 hover:bg-ice-100 transition-colors">
                      Yes, please
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                      No, thanks
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                      Show all reminders
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alert Section */}
            <div className="mt-8 flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100 animate-slide-up animate-delay-500">
              <AlertTriangle size={20} className="text-amber-500" />
              <p className="text-sm text-amber-700">
                Your next medication dose is in 45 minutes. The Medical Dispenser is prepared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
