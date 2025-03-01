
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Briefcase, 
  Smartphone, 
  ShoppingCart, 
  DollarSign, 
  BarChart3 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Import components
import Sidebar from "@/components/admin/Sidebar";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import UserManagement from "@/components/admin/UserManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { t } = useLanguage();

  // Dummy data for dashboard metrics
  const dashboardMetrics = {
    totalRevenue: "€2,543,960",
    totalCustomers: "1,429",
    activeDevices: "3,892",
    pendingOrders: "47",
    monthlyGrowth: "+12.5%",
    customerSatisfaction: "94%",
    revenueByProduct: [
      { name: "IceAlarm Pro", value: 45 },
      { name: "IceAlarm Standard", value: 30 },
      { name: "IceAlarm Basic", value: 25 },
    ],
    recentActivities: [
      { id: 1, type: "New Order", description: "New order #37429 from Empresa de Madrid", time: "2 hours ago" },
      { id: 2, type: "Support", description: "Support ticket #2947 resolved", time: "4 hours ago" },
      { id: 3, type: "Device", description: "28 new devices activated in Barcelona region", time: "Yesterday" },
      { id: 4, type: "Payment", description: "Payment of €34,500 received from Hotel Group", time: "Yesterday" },
      { id: 5, type: "Maintenance", description: "Scheduled maintenance completed for 156 devices", time: "2 days ago" },
    ]
  };

  // Render the appropriate section based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMetrics dashboardMetrics={dashboardMetrics} />;
      case "users":
        return <UserManagement />;
      case "clients":
        return (
          <PlaceholderSection 
            title="Client Management" 
            description="Manage your clients and their accounts" 
            icon={<Briefcase className="h-5 w-5" />} 
          />
        );
      case "devices":
        return (
          <PlaceholderSection 
            title="Device Management" 
            description="Manage all IceAlarm devices and their status" 
            icon={<Smartphone className="h-5 w-5" />} 
          />
        );
      case "orders":
      case "orders-list":
      case "inventory":
        return (
          <PlaceholderSection 
            title="Orders & Inventory" 
            description="Manage orders, shipping, and inventory levels" 
            icon={<ShoppingCart className="h-5 w-5" />} 
          />
        );
      case "finance":
      case "sales":
      case "invoices":
        return (
          <PlaceholderSection 
            title="Sales & Finance" 
            description="Track sales, revenue, and financial performance" 
            icon={<DollarSign className="h-5 w-5" />} 
          />
        );
      case "reports":
        return (
          <PlaceholderSection 
            title="Reports & Analytics" 
            description="Access detailed reports and business analytics" 
            icon={<BarChart3 className="h-5 w-5" />} 
          />
        );
      case "settings":
        return (
          <PlaceholderSection 
            title="Settings" 
            description="Manage system settings and configurations" 
            icon={<BarChart3 className="h-5 w-5" />} 
          />
        );
      default:
        return <DashboardMetrics dashboardMetrics={dashboardMetrics} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <h1 className="text-2xl font-bold">
            {activeSection === "dashboard" && "Dashboard"}
            {activeSection === "users" && "User Management"}
            {activeSection === "clients" && "Client Management"}
            {activeSection === "devices" && "Device Management"}
            {activeSection === "orders" && "Orders & Inventory"}
            {activeSection === "orders-list" && "Orders List"}
            {activeSection === "inventory" && "Inventory Management"}
            {activeSection === "finance" && "Sales & Finance"}
            {activeSection === "sales" && "Sales Analytics"}
            {activeSection === "invoices" && "Invoices & Billing"}
            {activeSection === "reports" && "Reports & Analytics"}
            {activeSection === "settings" && "Settings"}
          </h1>
        </header>
        
        <main className="p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
