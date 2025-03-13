
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
    <Card className="mb-8 rounded-xl overflow-hidden border-none shadow-md">
      <div className="absolute h-1.5 w-full bg-gradient-to-r from-ice-400 via-ice-600 to-ice-800"></div>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-ice-50 to-ice-100 p-6">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4">
            <div>
              <div className="flex items-center text-ice-600 font-medium text-sm mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <h1 className="text-3xl font-bold text-ice-800 mb-2">
                {`${getTimeBasedGreeting()}, ${user?.name || 'Member'}!`}
              </h1>
              <p className="text-ice-700 max-w-xl">
                {language === 'en' 
                  ? 'Welcome to your personal dashboard. All your health metrics and devices are being monitored in real-time.' 
                  : 'Bienvenido a tu panel personal. Todas tus métricas de salud y dispositivos están siendo monitoreados en tiempo real.'}
              </p>
              
              <Button 
                variant="outline" 
                className="mt-4 flex items-center gap-2"
                onClick={handleNavigateToQuestionnaire}
              >
                <ClipboardList className="h-4 w-4" />
                {language === 'en' ? 'Complete Personal Questionnaire' : 'Completar Cuestionario Personal'}
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center text-ice-600 border border-ice-100">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                <div>
                  <div className="font-medium text-sm">
                    {language === 'en' ? 'Health Status' : 'Estado de Salud'}
                  </div>
                  <div className="text-green-500 font-medium text-sm">
                    {language === 'en' ? 'Excellent' : 'Excelente'}
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center text-ice-600 border border-ice-100">
                <Bell className="h-5 w-5 mr-2 text-ice-500" />
                <div>
                  <div className="font-medium text-sm">
                    {language === 'en' ? 'Alerts' : 'Alertas'}
                  </div>
                  <div className="text-ice-500 font-medium text-sm">
                    {language === 'en' ? 'None Active' : 'Ninguna Activa'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ice-100 border border-ice-200 rounded-full text-ice-700 text-sm">
              <Shield className="h-4 w-4" />
              <span>{language === 'en' ? 'Protected' : 'Protegido'}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-200 rounded-full text-green-700 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>{language === 'en' ? 'All Systems Operational' : 'Todos los Sistemas Operativos'}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{language === 'en' ? 'Next Check: Tomorrow' : 'Próxima Revisión: Mañana'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
