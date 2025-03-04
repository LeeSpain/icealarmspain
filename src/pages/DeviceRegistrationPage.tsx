
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import DeviceRegistrationForm from "@/components/devices/DeviceRegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeviceTroubleshootingGuide from "@/components/devices/DeviceTroubleshootingGuide";
import { HelpCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeviceRegistrationPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<'pendant' | 'monitor' | 'dispenser'>('pendant');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const handleDeviceSelect = (device: 'pendant' | 'monitor' | 'dispenser') => {
    setSelectedDevice(device);
    setRegistrationComplete(false);
  };
  
  const handleRegistrationComplete = () => {
    setRegistrationComplete(true);
    toast.success(
      language === 'en' 
        ? "Device registered successfully! Proceed to setup." 
        : "¡Dispositivo registrado con éxito! Proceda a la configuración."
    );
  };
  
  const handleSetupComplete = () => {
    toast.success(
      language === 'en' 
        ? "Device setup completed successfully!" 
        : "¡Configuración del dispositivo completada con éxito!"
    );
    
    setTimeout(() => {
      navigate(`/devices/${selectedDevice === 'pendant' ? 'sos-pendant' : selectedDevice === 'monitor' ? 'glucose-monitor' : 'medical-dispenser'}`);
    }, 2000);
  };
  
  const getDeviceName = () => {
    switch(selectedDevice) {
      case 'pendant':
        return language === 'en' ? 'SOS Pendant' : 'Colgante SOS';
      case 'monitor':
        return language === 'en' ? 'Health Monitor' : 'Monitor de Salud';
      case 'dispenser':
        return language === 'en' ? 'Medical Dispenser' : 'Dispensador de Medicamentos';
      default:
        return '';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-ice-50/30">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2 text-ice-700">
            {language === 'en' ? "Device Registration & Setup" : "Registro y Configuración de Dispositivos"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {language === 'en'
              ? "Register and set up your ICE Alarm devices to start monitoring your health"
              : "Registre y configure sus dispositivos ICE Alarm para comenzar a monitorear su salud"}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Device selection cards */}
            <div 
              className={`p-6 rounded-lg border cursor-pointer transition-all flex flex-col items-center text-center
                ${selectedDevice === 'pendant' 
                  ? 'border-orange-300 bg-orange-50/50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-orange-200'
                }`}
              onClick={() => handleDeviceSelect('pendant')}
            >
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-medium text-lg mb-1">
                {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "24/7 emergency assistance with one-touch alert system"
                  : "Asistencia de emergencia 24/7 con sistema de alerta de un toque"}
              </p>
            </div>
            
            <div 
              className={`p-6 rounded-lg border cursor-pointer transition-all flex flex-col items-center text-center
                ${selectedDevice === 'monitor' 
                  ? 'border-orange-300 bg-orange-50/50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-orange-200'
                }`}
              onClick={() => handleDeviceSelect('monitor')}
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <HelpCircle className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-medium text-lg mb-1">
                {language === 'en' ? 'Health Monitor' : 'Monitor de Salud'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Track vital signs and health metrics continuously"
                  : "Seguimiento continuo de signos vitales y métricas de salud"}
              </p>
            </div>
            
            <div 
              className={`p-6 rounded-lg border cursor-pointer transition-all flex flex-col items-center text-center
                ${selectedDevice === 'dispenser' 
                  ? 'border-orange-300 bg-orange-50/50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-orange-200'
                }`}
              onClick={() => handleDeviceSelect('dispenser')}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-medium text-lg mb-1">
                {language === 'en' ? 'Medical Dispenser' : 'Dispensador de Medicamentos'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Automated medication management with reminders"
                  : "Gestión automatizada de medicamentos con recordatorios"}
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {language === 'en' 
                ? `Setting up your ${getDeviceName()}` 
                : `Configurando su ${getDeviceName()}`}
            </h2>
            
            <Tabs defaultValue="register" className="mb-10">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="register">
                  {language === 'en' ? '1. Register Device' : '1. Registrar Dispositivo'}
                </TabsTrigger>
                <TabsTrigger value="setup" disabled={!registrationComplete}>
                  {language === 'en' ? '2. Setup Device' : '2. Configurar Dispositivo'}
                </TabsTrigger>
                <TabsTrigger value="troubleshoot">
                  {language === 'en' ? 'Troubleshooting' : 'Solución de Problemas'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="register" className="mt-6 p-4 border rounded-md bg-white">
                <DeviceRegistrationForm 
                  deviceType={selectedDevice} 
                  onComplete={handleRegistrationComplete} 
                />
              </TabsContent>
              
              <TabsContent value="setup" className="mt-6">
                <DeviceSetupGuide 
                  deviceType={selectedDevice} 
                  onComplete={handleSetupComplete} 
                />
              </TabsContent>
              
              <TabsContent value="troubleshoot" className="mt-6">
                <DeviceTroubleshootingGuide 
                  deviceType={selectedDevice} 
                  language={language} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default DeviceRegistrationPage;
