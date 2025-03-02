
import React from "react";
import { Activity, Battery, Bell, Calendar, Check, Clock, MessageSquare, User, AlertTriangle, Shield, Heart, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className={`glass-panel p-4 rounded-xl transition-all duration-300 hover:shadow-glass-lg ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-foreground/80">{title}</div>
        <div className="text-ice-600">{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`mt-2 text-xs px-2 py-1 rounded-full self-start inline-flex items-center gap-1 ${statusColors[status]}`}>
          {status === "normal" && <Check size={12} />}
          {status === "warning" && <AlertTriangle size={12} />}
          {status === "alert" && <AlertTriangle size={12} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-ice-50/40"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/30 to-transparent rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-radial from-guardian-100/30 to-transparent rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center shadow-lg">
              <Shield className="text-white h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ice-800">
            ICE Members Dashboard
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Monitor health data in real-time and receive AI-driven insights for proactive care.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ice-100 text-ice-700 text-sm">
              <Heart className="h-3.5 w-3.5" /> Health Monitoring
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-guardian-100 text-guardian-700 text-sm">
              <Shield className="h-3.5 w-3.5" /> Emergency Response
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ice-100 text-ice-700 text-sm">
              <Medal className="h-3.5 w-3.5" /> AI Assistance
            </span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Card className="relative shadow-glass-lg overflow-hidden border-0 bg-white/80 backdrop-blur-md animate-blur-in">
            {/* Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ice-400 via-ice-500 to-guardian-500"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-ice-300/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-guardian-300/10 rounded-full"></div>

            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center shadow-md">
                    <User size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">María García</h3>
                    <p className="text-sm text-muted-foreground">Dashboard Overview</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                    <Clock size={16} />
                    <span>Last updated: 2 min ago</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center relative">
                    <Bell size={18} className="text-guardian-600" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <MetricCard
                  title="Glucose Level"
                  value="124 mg/dL"
                  icon={<Activity size={20} />}
                  trend="Stable"
                  status="normal"
                  className="animate-slide-up animate-delay-100"
                />
                <MetricCard
                  title="SOS Pendant"
                  value="Active"
                  icon={<Check size={20} />}
                  trend="Battery: 92%"
                  status="normal"
                  className="animate-slide-up animate-delay-200"
                />
                <MetricCard
                  title="Last Medication"
                  value="8:00 AM"
                  icon={<Calendar size={20} />}
                  trend="On Schedule"
                  status="normal"
                  className="animate-slide-up animate-delay-300"
                />
              </div>
              
              {/* AI Guardian Interaction */}
              <div className="glass-panel bg-white/90 p-5 rounded-xl border border-white/50 shadow-sm animate-slide-up animate-delay-400 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ice-500 to-guardian-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <MessageSquare size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-lg">AI Guardian</p>
                      <p className="text-xs text-muted-foreground px-2 py-1 bg-ice-50 rounded-full">Just now</p>
                    </div>
                    <p className="text-sm mb-4 text-muted-foreground">
                      Good morning, María. Your glucose levels are within normal range today. Remember to take your medication at 12:00 PM. Would you like me to remind you?
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button className="h-8 rounded-full bg-ice-600 hover:bg-ice-700">
                        Yes, please
                      </Button>
                      <Button variant="outline" className="h-8 rounded-full border-ice-200 text-ice-700 hover:bg-ice-50">
                        No, thanks
                      </Button>
                      <Button variant="outline" className="h-8 rounded-full border-ice-200 text-ice-700 hover:bg-ice-50">
                        Show all reminders
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Alert Section */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 mb-8 animate-slide-up animate-delay-500">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800">Medication Reminder</p>
                  <p className="text-sm text-amber-700">
                    Your next medication dose is in 45 minutes. The Medical Dispenser is prepared.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Experience the full benefits of the ICE Members Dashboard with our complete range of smart devices.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-ice-600 hover:bg-ice-700 rounded-full px-6">
                    Explore Our Products
                  </Button>
                  <Button variant="outline" className="border-ice-300 text-ice-700 hover:bg-ice-50 rounded-full px-6">
                    Become a Member
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-6">
                    Request Live Demo
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
