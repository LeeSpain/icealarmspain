
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";

interface WelcomeHeroProps {
  onShowAddProducts: () => void;
  showAddProducts: boolean;
  hasDevices: boolean;
  onClearDevices: () => void;
  onLogout: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onShowAddProducts,
  showAddProducts,
  hasDevices,
  onClearDevices,
  onLogout
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Get the user's name, defaulting to "Member" if not available
  const userName = (user?.displayName || user?.email) ? (user.displayName || user.email?.split('@')[0]) : 'Member';
  
  return (
    <div className="bg-gradient-to-br from-ice-50 to-ice-100/50 rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ice-700">
            {language === 'en' ? `Welcome ${userName}` : `Bienvenido ${userName}`}
          </h1>
          <p className="text-ice-600 mt-1">
            {language === 'en' 
              ? 'Manage your ICE Alarm devices and account settings' 
              : 'Administra tus dispositivos ICE Alarm y configuración de cuenta'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={onShowAddProducts}
            variant="default" 
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            {showAddProducts 
              ? (language === 'en' ? 'Hide Products' : 'Ocultar Productos')
              : (language === 'en' ? 'Add Devices' : 'Añadir Dispositivos')}
          </Button>
          
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {language === 'en' ? 'Log Out' : 'Cerrar Sesión'}
          </Button>
        </div>
      </div>
      
      {hasDevices && (
        <div className="mt-4 text-sm">
          <Button 
            onClick={onClearDevices}
            variant="link" 
            className="text-ice-600 hover:text-ice-800 p-0 h-auto"
          >
            {language === 'en' ? 'Clear devices (Demo only)' : 'Eliminar dispositivos (Solo demo)'}
          </Button>
        </div>
      )}
    </div>
  );
};
