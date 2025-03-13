
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, LineChart, Bell, Smartphone, FileText } from "lucide-react";

const HowItWorks: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'How the Glucose Monitor Works' : 'Cómo Funciona el Monitor de Glucosa'}
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Continuous Monitoring' : 'Monitoreo Continuo'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Our sensor automatically checks your glucose levels every 5 minutes, day and night, providing a complete picture of your glucose patterns without the need for fingersticks.' 
                : 'Nuestro sensor verifica automáticamente sus niveles de glucosa cada 5 minutos, día y noche, proporcionando una imagen completa de sus patrones de glucosa sin necesidad de pinchazos en los dedos.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <LineChart className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'AI-Powered Analysis' : 'Análisis Impulsado por IA'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Our advanced AI algorithms analyze your glucose data to identify patterns and predict potential issues before they occur, helping you make proactive health decisions.' 
                : 'Nuestros algoritmos avanzados de IA analizan sus datos de glucosa para identificar patrones y predecir posibles problemas antes de que ocurran, ayudándole a tomar decisiones de salud proactivas.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <Bell className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Real-time Alerts' : 'Alertas en Tiempo Real'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Receive immediate notifications when your glucose levels are trending too high or too low, allowing you to take action before a serious situation develops.' 
                : 'Reciba notificaciones inmediatas cuando sus niveles de glucosa tienden a ser demasiado altos o demasiado bajos, permitiéndole tomar medidas antes de que se desarrolle una situación grave.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Smartphone className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Mobile Integration' : 'Integración Móvil'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'View your glucose data in real-time on your smartphone through our app. Easily share reports with healthcare providers and set up remote monitoring for loved ones.' 
                : 'Vea sus datos de glucosa en tiempo real en su smartphone a través de nuestra aplicación. Comparta fácilmente informes con proveedores de atención médica y configure monitoreo remoto para sus seres queridos.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Personalized Insights' : 'Información Personalizada'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Receive customized recommendations based on your unique glucose patterns, helping you understand how different foods, activities, and medications affect your levels.' 
                : 'Reciba recomendaciones personalizadas basadas en sus patrones únicos de glucosa, ayudándole a comprender cómo diferentes alimentos, actividades y medicamentos afectan sus niveles.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
