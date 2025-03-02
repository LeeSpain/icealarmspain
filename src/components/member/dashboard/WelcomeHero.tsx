
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Bell, Settings, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeHeroProps {
  onShowAddProducts: () => void;
  showAddProducts: boolean;
  onClearDevices?: () => void;
  hasDevices: boolean;
  onLogout: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ 
  onShowAddProducts, 
  showAddProducts, 
  onClearDevices,
  hasDevices,
  onLogout
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  return (
    <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-ice-100 to-ice-200 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ice-800 mb-2">
            {language === 'en' 
              ? `Welcome, ${user?.name || 'Member'}!` 
              : `Bienvenido, ${user?.name || 'Miembro'}!`}
          </h1>
          <p className="text-ice-700 max-w-xl">
            {language === 'en' 
              ? 'Manage your ICE Alarm devices and explore new products to enhance your safety system.' 
              : 'Gestiona tus dispositivos ICE Alarm y explora nuevos productos para mejorar tu sistema de seguridad.'}
          </p>
        </div>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/80 hover:bg-white"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
            {language === 'en' ? 'Log Out' : 'Cerrar Sesión'}
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <Button 
          className="bg-ice-600 hover:bg-ice-700"
          onClick={onShowAddProducts}
        >
          {showAddProducts 
            ? (language === 'en' ? 'Hide Store' : 'Ocultar Tienda') 
            : (language === 'en' ? 'Explore Products' : 'Explorar Productos')}
        </Button>
        
        {hasDevices ? (
          <>
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              <Bell className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Test Alarm' : 'Probar Alarma'}
            </Button>
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Settings' : 'Configuración'}
            </Button>
            {/* For demo purposes */}
            {onClearDevices && (
              <Button 
                variant="outline" 
                className="bg-white/80 hover:bg-white ml-auto"
                onClick={onClearDevices}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Demo: Clear Devices' : 'Demo: Eliminar Dispositivos'}
              </Button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
