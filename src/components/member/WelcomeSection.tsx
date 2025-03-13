
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { Shield, Calendar, CheckCircle, ClipboardList, FileText } from 'lucide-react';
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
  
  const handleNavigateToPersonalDetails = () => {
    navigate('/dashboard/personal-details');
  };
  
  return (
    <Card className="mb-6 rounded-xl overflow-hidden border-none shadow-sm">
      <div className="absolute h-1 w-full bg-gradient-to-r from-ice-400 via-ice-600 to-ice-800"></div>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-ice-50 to-ice-100 p-5">
          <div className="flex flex-col space-y-3">
            {/* Top section with date and greeting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-ice-600 font-medium text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 border border-green-200 rounded-full text-green-700 text-xs">
                <CheckCircle className="h-3 w-3" />
                <span>{language === 'en' ? 'All Systems Operational' : 'Todos los Sistemas Operativos'}</span>
              </div>
            </div>
            
            {/* Main content */}
            <div>
              <h1 className="text-2xl font-bold text-ice-800 mb-1.5">
                {`${getTimeBasedGreeting()}, ${user?.name || 'Member'}!`}
              </h1>
              <p className="text-ice-700 text-sm mb-3">
                {language === 'en' 
                  ? 'Welcome to your personal dashboard. All your health metrics and devices are being monitored in real-time.' 
                  : 'Bienvenido a tu panel personal. Todas tus métricas de salud y dispositivos están siendo monitoreados en tiempo real.'}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5 bg-white"
                onClick={handleNavigateToQuestionnaire}
              >
                <ClipboardList className="h-3.5 w-3.5" />
                {language === 'en' ? 'Complete Questionnaire' : 'Completar Cuestionario'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5 bg-white"
                onClick={handleNavigateToPersonalDetails}
              >
                <FileText className="h-3.5 w-3.5" />
                {language === 'en' ? 'Personal Details' : 'Datos Personales'}
              </Button>
            </div>
            
            {/* Status tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-ice-100 border border-ice-200 rounded-full text-ice-700 text-xs">
                <Shield className="h-3 w-3" />
                <span>{language === 'en' ? 'Protected' : 'Protegido'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-xs">
                <Calendar className="h-3 w-3" />
                <span>{language === 'en' ? 'Next Check: Tomorrow' : 'Próxima Revisión: Mañana'}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
