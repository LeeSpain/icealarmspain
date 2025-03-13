
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { Shield, Calendar, Bell, Activity, CheckCircle, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WelcomeSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get current date
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);
  
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = currentDate.getHours();
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

  const handleNavigateToQuestionnaire = () => {
    navigate('/dashboard/questionnaire');
  };
  
  return (
    <Card className="mb-6 rounded-xl overflow-hidden border-none shadow-sm">
      <div className="absolute h-1 w-full bg-gradient-to-r from-ice-400 via-ice-600 to-ice-800"></div>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-ice-50 to-ice-100 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left column: Greeting and date */}
            <div className="md:col-span-2">
              <div className="flex items-center text-ice-600 font-medium text-xs mb-1">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>{formattedDate}</span>
              </div>
              <h1 className="text-2xl font-bold text-ice-800 mb-1.5">
                {`${getTimeBasedGreeting()}, ${user?.name || 'Member'}!`}
              </h1>
              <p className="text-ice-700 text-sm mb-3">
                {language === 'en' 
                  ? 'Welcome to your personal dashboard. All your health metrics and devices are being monitored in real-time.' 
                  : 'Bienvenido a tu panel personal. Todas tus métricas de salud y dispositivos están siendo monitoreados en tiempo real.'}
              </p>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5"
                onClick={handleNavigateToQuestionnaire}
              >
                <ClipboardList className="h-3.5 w-3.5" />
                {language === 'en' ? 'Complete Personal Questionnaire' : 'Completar Cuestionario Personal'}
              </Button>
            </div>
            
            {/* Right column: Status cards */}
            <div className="flex flex-col gap-2 md:justify-center">
              <div className="bg-white p-2.5 rounded-lg shadow-sm flex items-center text-ice-600 border border-ice-100">
                <Activity className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <div className="font-medium text-xs">
                    {language === 'en' ? 'Health Status' : 'Estado de Salud'}
                  </div>
                  <div className="text-green-500 font-medium text-xs">
                    {language === 'en' ? 'Excellent' : 'Excelente'}
                  </div>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg shadow-sm flex items-center text-ice-600 border border-ice-100">
                <Bell className="h-4 w-4 mr-2 text-ice-500" />
                <div>
                  <div className="font-medium text-xs">
                    {language === 'en' ? 'Alerts' : 'Alertas'}
                  </div>
                  <div className="text-ice-500 font-medium text-xs">
                    {language === 'en' ? 'None Active' : 'Ninguna Activa'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-ice-100 border border-ice-200 rounded-full text-ice-700 text-xs">
              <Shield className="h-3 w-3" />
              <span>{language === 'en' ? 'Protected' : 'Protegido'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 border border-green-200 rounded-full text-green-700 text-xs">
              <CheckCircle className="h-3 w-3" />
              <span>{language === 'en' ? 'All Systems Operational' : 'Todos los Sistemas Operativos'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-xs">
              <Calendar className="h-3 w-3" />
              <span>{language === 'en' ? 'Next Check: Tomorrow' : 'Próxima Revisión: Mañana'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
