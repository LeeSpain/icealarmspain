
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  return (
    <div className="mt-24 mb-12 text-center">
      <h2 className="text-3xl font-playfair font-bold mb-6">
        {language === 'en' ? "Member Dashboard Preview" : "Vista Previa del Panel de Miembro"}
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
        {language === 'en'
          ? "See how easily you can monitor your health data and manage your devices from our intuitive dashboard."
          : "Vea cómo puede monitorear fácilmente sus datos de salud y administrar sus dispositivos desde nuestro panel intuitivo."}
      </p>
      
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
        <div className="bg-gradient-to-r from-ice-500 to-guardian-600 h-8 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-70"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          </div>
        </div>
        <img 
          src="/lovable-uploads/dashboard-preview.png" 
          alt="Dashboard Preview" 
          className="w-full object-cover border-t border-gray-200"
          style={{ height: '400px' }}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1200x600/f8fafc/a3a3a3?text=Dashboard+Preview";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
          <Link to="/login">
            <ButtonCustom size="lg" className="bg-white text-ice-700 hover:bg-ice-50">
              {language === 'en' ? "Try The Dashboard" : "Pruebe El Panel"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
