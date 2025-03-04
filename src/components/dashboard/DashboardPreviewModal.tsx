
import React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface DashboardPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DashboardPreviewModal: React.FC<DashboardPreviewModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-xl font-semibold">
            {language === 'en' ? 'Dashboard Preview' : 'Vista Previa del Panel'}
          </DialogTitle>
          <ButtonCustom 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </ButtonCustom>
        </DialogHeader>
        
        <div className="bg-ice-50/50 p-4 rounded-lg border border-ice-100">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {language === 'en' ? 'Welcome back, Maria!' : '¡Bienvenido de nuevo, Maria!'}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === 'en'
                    ? 'Here\'s a summary of your ICE Alarm account.'
                    : 'Aquí tienes un resumen de tu cuenta de ICE Alarm.'}
                </p>
              </div>
              <div className="bg-ice-50 px-3 py-2 rounded-md text-sm">
                <div className="font-medium text-ice-800">
                  {language === 'en' ? 'Madrid, Spain' : 'Madrid, España'}
                </div>
                <div className="text-ice-600 flex items-center">
                  <span className="text-lg mr-1">23°C</span>
                  <span className="text-xs">Sunny</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-ice-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">
                  {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-sm">
                    {language === 'en' ? 'Active' : 'Activo'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {language === 'en' ? 'Battery: 85%' : 'Batería: 85%'}
                  </span>
                </div>
              </div>
              
              <div className="bg-ice-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">
                  {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-sm">
                    {language === 'en' ? 'Normal' : 'Normal'}
                  </span>
                  <span className="text-sm text-gray-500">
                    112 mg/dL
                  </span>
                </div>
              </div>
              
              <div className="bg-ice-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">
                  {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-sm">
                    {language === 'en' ? 'Next: 14:00' : 'Próximo: 14:00'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {language === 'en' ? 'Vitamins' : 'Vitaminas'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-ice-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-3">
                {language === 'en' ? 'AI Guardian' : 'Guardián de IA'}
              </h3>
              <div className="bg-white p-3 rounded-lg border border-ice-100">
                <p className="text-sm text-ice-800">
                  {language === 'en' 
                    ? 'Good morning Maria. Your vital signs look normal today. Remember to take your medication at 2pm.'
                    : 'Buenos días Maria. Tus signos vitales se ven normales hoy. Recuerda tomar tu medicación a las 2pm.'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {language === 'en' 
                  ? 'Last update: 5 minutes ago'
                  : 'Última actualización: hace 5 minutos'}
              </div>
              <Link to="/join">
                <ButtonCustom size="sm">
                  {language === 'en' ? 'Sign Up Now' : 'Regístrate Ahora'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPreviewModal;
