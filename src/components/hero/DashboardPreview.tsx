
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardPreviewComponent from "./dashboard-preview";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-24 mb-12 text-center">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent font-playfair">
        {language === 'en' ? "Member Dashboard Preview" : "Vista Previa del Panel de Miembro"}
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-playfair">
        {language === 'en'
          ? "Get a glimpse of our intuitive health monitoring dashboard with real-time alerts and device management."
          : "Vea un vistazo de nuestro panel intuitivo de monitoreo de salud con alertas en tiempo real y gestión de dispositivos."}
      </p>
      
      <DashboardPreviewComponent language={language} />
    </div>
  );
};

export default DashboardPreview;
