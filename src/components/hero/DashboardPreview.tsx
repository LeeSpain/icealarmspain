
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardPreviewComponent from "./dashboard-preview";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight } from "lucide-react";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-16 mb-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {language === 'en' ? "Member Dashboard Overview" : "Vista Previa del Panel de Miembro"}
      </h2>
      <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
        {language === 'en'
          ? "Experience our streamlined health monitoring dashboard with essential real-time insights and device management."
          : "Experimente nuestro panel de monitoreo de salud optimizado con información en tiempo real y gestión de dispositivos."}
      </p>
      
      <div className="max-w-4xl mx-auto">
        <DashboardPreviewComponent language={language} />
        
        <div className="mt-4">
          <ButtonCustom 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="group"
          >
            <span className="flex items-center">
              {language === 'en' ? 'Explore Full Dashboard' : 'Explorar Panel Completo'}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
