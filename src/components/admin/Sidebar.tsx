import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  User, 
  UserCog, 
  Shield, 
  Lock, 
  AlertTriangle, 
  List, 
  Package,
  BarChart,
  Settings,
  Monitor,
  PhoneCall,
  FileText,
  HelpCircle,
  MapPin,
  ShoppingCart,
  Percent,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Check if the component is mounted
    let isMounted = true;

    const handleResize = () => {
      if (isMounted) {
        setIsMobileView(window.innerWidth < 768); // Adjust the breakpoint as needed
      }
    };

    // Set initial value
    handleResize();

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      isMounted = false; // Prevent setting state on unmounted component
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isMobileView) {
      setCollapsed(true); // Close sidebar on mobile view
    }
    navigate(`/admin?section=${sectionId}`);
  };

  // Define the sidebar sections and their items
  const sidebarSections = [
    {
      title: "Dashboard",
      items: [
        { id: "dashboard", label: "Overview", icon: LayoutDashboard },
      ]
    },
    {
      title: "Administration",
      items: [
        { id: "admin-users", label: "Admin Users", icon: Shield },
        { id: "roles", label: "Roles", icon: Users },
        { id: "permissions", label: "Permissions", icon: Lock },
      ]
    },
    {
      title: "Users",
      items: [
        { id: "users", label: "Customers", icon: User },
        { id: "clients", label: "Client Management", icon: UserCog },
      ]
    },
    {
      title: "Devices",
      items: [
        { id: "devices", label: "Device Management", icon: Monitor },
        { id: "device-monitoring", label: "Device Monitoring", icon: AlertTriangle },
        { id: "device-maintenance", label: "Device Maintenance", icon: Settings },
      ]
    },
    {
      title: "Call Center",
      items: [
        { id: "call-center", label: "Call Center Overview", icon: PhoneCall },
        { id: "call-logs", label: "Call Logs", icon: FileText },
        { id: "agent-performance", label: "Agent Performance", icon: BarChart },
      ]
    },
    {
      title: "Sales & Marketing",
      items: [
        { id: "products", label: "Products", icon: Package },
        { id: "product-catalog", label: "Product Catalog", icon: List },
        { id: "product-pricing", label: "Product Pricing", icon: Percent },
        { id: "subscriptions", label: "Subscriptions", icon: ShoppingCart },
      ]
    },
    {
      title: "Support",
      items: [
        { id: "support", label: "Support Tickets", icon: HelpCircle },
        { id: "knowledge-base", label: "Knowledge Base", icon: FileText },
        { id: "faqs", label: "FAQs", icon: HelpCircle },
      ]
    },
    {
      title: "Operations",
      items: [
        { id: "alerts", label: "Alerts Management", icon: AlertTriangle },
        { id: "inventory", label: "Inventory Management", icon: Package },
        { id: "orders-list", label: "Orders List", icon: List },
        { id: "regions", label: "Regions", icon: MapPin },
      ]
    },
    {
      title: "Analytics",
      items: [
        { id: "analytics", label: "Analytics Dashboard", icon: BarChart },
        { id: "metrics", label: "Performance Metrics", icon: Percent },
      ]
    },
    {
      title: "Settings",
      items: [
        { id: "general", label: "General Settings", icon: Settings },
        { id: "security", label: "Security Settings", icon: Lock },
        { id: "notifications", label: "Notifications", icon: AlertTriangle },
      ]
    }
  ];

  return (
    <aside
      className={cn(
        "flex flex-col w-64 bg-ice-50 border-r border-ice-200 transition-all duration-300",
        collapsed ? "-ml-64" : "ml-0",
        isMobileView ? "fixed top-0 left-0 h-full z-50" : "relative",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-ice-200">
        <span className="font-bold text-lg text-ice-800">{t("adminDashboard.title")}</span>
        <button
          className="md:hidden text-ice-600 hover:text-ice-800 focus:outline-none"
          onClick={() => setCollapsed(true)}
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {sidebarSections.map((section, index) => (
          <div key={index} className="mb-6">
            {section.title && (
              <h3 className="font-medium text-sm text-ice-500 mb-2">{t(`adminDashboard.${section.title.toLowerCase().replace(' ', '')}`)}</h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/admin?section=${item.id}`}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-ice-100 hover:text-ice-700 transition-colors duration-200",
                      activeSection === item.id
                        ? "bg-ice-100 text-ice-700 font-semibold"
                        : "text-ice-500"
                    )}
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{t(`adminDashboard.${item.label.toLowerCase().replace(' ', '')}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
