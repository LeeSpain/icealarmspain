
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PlusSquare, Check, Bell, Clock, Smartphone } from "lucide-react";

const HowItWorks: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'How the Medical Dispenser Works' : 'Cómo Funciona el Dispensador Médico'}
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <PlusSquare className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Smart Medication Management' : 'Gestión Inteligente de Medicamentos'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Our dispenser has up to 28 compartments for organizing different medications. Program the exact schedule for each medication through our app.' 
                : 'Nuestro dispensador tiene hasta 28 compartimentos para organizar diferentes medicamentos. Programe el horario exacto para cada medicamento a través de nuestra aplicación.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Bell className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Medication Reminders' : 'Recordatorios de Medicación'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'When it\'s time to take your medication, the dispenser provides visual and audible alerts. The corresponding compartment opens automatically for easy access.' 
                : 'Cuando es hora de tomar su medicamento, el dispensador proporciona alertas visuales y audibles. El compartimento correspondiente se abre automáticamente para un fácil acceso.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Missed Dose Alerts' : 'Alertas de Dosis Perdidas'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'If a medication dose is not taken, the dispenser sends alerts to your phone. After a set period, caregivers or family members are notified to ensure proper adherence.' 
                : 'Si no se toma una dosis de medicamento, el dispensador envía alertas a su teléfono. Después de un período establecido, se notifica a los cuidadores o familiares para asegurar una adherencia adecuada.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Check className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Adherence Tracking' : 'Seguimiento de Adherencia'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'The dispenser tracks medication adherence over time, providing detailed reports through our app. This information helps healthcare providers monitor your medication regimen.' 
                : 'El dispensador realiza un seguimiento de la adherencia a la medicación a lo largo del tiempo, proporcionando informes detallados a través de nuestra aplicación. Esta información ayuda a los proveedores de atención médica a monitorear su régimen de medicación.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <Smartphone className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Remote Management' : 'Gestión Remota'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Family members or caregivers can remotely monitor and manage medication schedules through our secure app, ensuring proper care even from a distance.' 
                : 'Los familiares o cuidadores pueden monitorear y administrar de forma remota los horarios de medicación a través de nuestra aplicación segura, asegurando un cuidado adecuado incluso a distancia.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
