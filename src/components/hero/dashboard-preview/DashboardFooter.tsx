
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight } from "lucide-react";

interface DashboardFooterProps {
  language: string;
}

const DashboardFooter: React.FC<DashboardFooterProps> = ({ language }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log("Dashboard preview button clicked, redirecting to pricing page");
    navigate('/join');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
      <ButtonCustom 
        size="lg" 
        onClick={handleClick}
        className="bg-ice-600 hover:bg-ice-700 text-white transition-colors"
      >
        <span className="flex items-center">
          {language === 'en' ? "See Pricing Plans" : "Ver Planes de Precios"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </span>
      </ButtonCustom>
    </div>
  );
};

export default DashboardFooter;
