
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Shield, Calendar, Bell } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Get current date
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);
  
  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-ice-50 to-ice-100 p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-ice-600 font-medium text-sm mb-2 block">
            {formattedDate}
          </span>
          <h1 className="text-3xl font-bold text-ice-800 mb-2">
            {language === 'en' 
              ? `Welcome back, ${user?.name || 'Member'}!` 
              : `Bienvenido de nuevo, ${user?.name || 'Miembro'}!`}
          </h1>
          <p className="text-ice-700 max-w-xl">
            {language === 'en' 
              ? 'All your health information and device status is looking good today.' 
              : 'Toda tu información de salud y el estado de tus dispositivos se ven bien hoy.'}
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center text-ice-600">
            <Bell className="h-5 w-5 mr-2" />
            <span className="font-medium">
              {language === 'en' ? 'All Clear' : 'Todo Bien'}
            </span>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center text-ice-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="font-medium">
              {language === 'en' ? 'Next Check: Tomorrow' : 'Próxima Revisión: Mañana'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-ice-100 border border-ice-200 rounded-full text-ice-700 text-sm">
          <Shield className="h-4 w-4" />
          <span>{language === 'en' ? 'Protected' : 'Protegido'}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-200 rounded-full text-green-700 text-sm">
          <Bell className="h-4 w-4" />
          <span>{language === 'en' ? 'All Devices Active' : 'Todos los Dispositivos Activos'}</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
