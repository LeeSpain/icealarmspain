import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { PlusCircle, ShoppingCart, Trash2, LogOut, FileText, ClipboardList } from 'lucide-react';
import { User } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

interface WelcomeHeroProps {
  onShowAddProducts: () => void;
  showAddProducts: boolean;
  hasDevices: boolean;
  onClearDevices: () => void;
  onLogout: () => void;
  user: User | null;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onShowAddProducts,
  showAddProducts,
  hasDevices,
  onClearDevices,
  onLogout,
  user
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'en') {
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    } else {
      if (hour < 12) return 'Buenos días';
      if (hour < 18) return 'Buenas tardes';
      return 'Buenas noches';
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Clear all localStorage
    localStorage.clear();
    
    // Call the provided onLogout handler
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to home with replace to prevent going back
    navigate('/', { replace: true });
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-r from-ice-50 to-ice-100 rounded-lg mb-8 p-6 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 h-40 w-40 bg-ice-500 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute left-20 bottom-0 h-20 w-20 bg-ice-500 rounded-full translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getTimeBasedGreeting()}, {user?.name || (language === 'en' ? 'Member' : 'Miembro')}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'en' 
                ? 'Welcome to your ICE Alarm España dashboard' 
                : 'Bienvenido a tu panel de ICE Alarm España'}
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                onClick={() => navigate('/dashboard/personal-details')}
                className="bg-ice-100 hover:bg-ice-200 text-ice-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                {language === 'en' 
                  ? 'Personal Details' 
                  : 'Datos Personales'}
              </Button>
              
              <Button
                onClick={() => navigate('/dashboard/questionnaire')}
                className="bg-ice-100 hover:bg-ice-200 text-ice-700"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                {language === 'en' 
                  ? 'Personal Questionnaire' 
                  : 'Cuestionario Personal'}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={showAddProducts ? "secondary" : "default"} 
              className="flex items-center gap-2"
              onClick={onShowAddProducts}
            >
              {showAddProducts 
                ? <ShoppingCart className="h-4 w-4" /> 
                : <PlusCircle className="h-4 w-4" />
              }
              {showAddProducts 
                ? (language === 'en' ? 'Hide products' : 'Ocultar productos') 
                : (language === 'en' ? 'Add devices' : 'Añadir dispositivos')
              }
            </Button>
            
            {hasDevices && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={onClearDevices}
              >
                <Trash2 className="h-4 w-4" />
                {language === 'en' ? 'Clear devices' : 'Borrar dispositivos'}
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-gray-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {language === 'en' ? 'Logout' : 'Cerrar sesión'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
