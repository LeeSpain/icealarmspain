
import React, { useState } from "react";
import { 
  Bluetooth, 
  QrCode, 
  Search, 
  Shield, 
  Smartphone, 
  Sparkles, 
  Heart,
  Check,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

interface DeviceSetupGuideProps {
  deviceType?: 'pendant' | 'monitor' | 'dispenser';
  onComplete?: () => void;
}

const DeviceSetupGuide: React.FC<DeviceSetupGuideProps> = ({ 
  deviceType = 'pendant',
  onComplete 
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const totalSteps = 4;
  
  const deviceNames = {
    pendant: language === 'en' ? 'SOS Pendant' : 'Colgante SOS',
    monitor: language === 'en' ? 'Health Monitor' : 'Monitor de Salud',
    dispenser: language === 'en' ? 'Medical Dispenser' : 'Dispensador de Medicamentos'
  };
  
  const deviceIcons = {
    pendant: <Shield className="w-6 h-6 text-ice-600" />,
    monitor: <Heart className="w-6 h-6 text-ice-600" />,
    dispenser: <Sparkles className="w-6 h-6 text-ice-600" />
  };
  
  // Handle device scanning
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate device discovery
    setTimeout(() => {
      setIsScanning(false);
      setIsConnected(true);
      toast.success(
        language === 'en' 
          ? `${deviceNames[deviceType]} found and connected!` 
          : `¡${deviceNames[deviceType]} encontrado y conectado!`
      );
      // Move to next step after successful connection
      if (currentStep === 2) {
        setCurrentStep(3);
      }
    }, 3000);
  };
  
  // Handle QR code scanning
  const handleQRScan = () => {
    // In a real app, this would activate the camera
    toast.info(
      language === 'en' 
        ? 'Camera activated for QR code scanning' 
        : 'Cámara activada para escanear código QR'
    );
    
    // Simulate successful scan
    setTimeout(() => {
      setIsConnected(true);
      toast.success(
        language === 'en' 
          ? `${deviceNames[deviceType]} registered via QR code!` 
          : `¡${deviceNames[deviceType]} registrado mediante código QR!`
      );
      // Move to next step after successful scan
      if (currentStep === 2) {
        setCurrentStep(3);
      }
    }, 2000);
  };
  
  // Complete setup
  const completeSetup = () => {
    toast.success(
      language === 'en' 
        ? `${deviceNames[deviceType]} setup completed successfully!` 
        : `¡Configuración de ${deviceNames[deviceType]} completada con éxito!`
    );
    
    if (onComplete) {
      onComplete();
    }
  };
  
  // Go to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSetup();
    }
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-ice-100 flex items-center justify-center">
                {deviceIcons[deviceType]}
              </div>
            </div>
            <h3 className="text-lg font-medium">
              {language === 'en' 
                ? `Let's set up your ${deviceNames[deviceType]}` 
                : `Vamos a configurar tu ${deviceNames[deviceType]}`}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Make sure your device is charged and ready for setup.' 
                : 'Asegúrate de que tu dispositivo esté cargado y listo para configurar.'}
            </p>
            <Button onClick={nextStep} className="mt-4 bg-ice-600 hover:bg-ice-700">
              {language === 'en' ? 'Begin Setup' : 'Comenzar Configuración'}
            </Button>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center">
              {language === 'en' 
                ? 'Connect Your Device' 
                : 'Conecta Tu Dispositivo'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-ice-200 hover:border-ice-400 transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Bluetooth className="w-5 h-5 text-ice-600" />
                    <CardTitle className="text-base">
                      {language === 'en' ? 'Bluetooth' : 'Bluetooth'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground pb-2">
                  {language === 'en' 
                    ? 'Connect your device directly via Bluetooth' 
                    : 'Conecta tu dispositivo directamente por Bluetooth'}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleScan}
                    disabled={isScanning}
                    className="w-full"
                  >
                    {isScanning ? (
                      <span className="flex items-center gap-2">
                        <Search className="w-4 h-4 animate-pulse" />
                        {language === 'en' ? 'Scanning...' : 'Buscando...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        {language === 'en' ? 'Scan for Devices' : 'Buscar Dispositivos'}
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-ice-200 hover:border-ice-400 transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-ice-600" />
                    <CardTitle className="text-base">
                      {language === 'en' ? 'QR Code' : 'Código QR'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground pb-2">
                  {language === 'en' 
                    ? 'Scan the QR code on your device package' 
                    : 'Escanea el código QR en el paquete de tu dispositivo'}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleQRScan}
                    className="w-full"
                  >
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      {language === 'en' ? 'Scan QR Code' : 'Escanear Código QR'}
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {isConnected && (
              <div className="flex justify-center">
                <Button onClick={nextStep} className="mt-4 bg-ice-600 hover:bg-ice-700">
                  {language === 'en' ? 'Continue' : 'Continuar'}
                </Button>
              </div>
            )}
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">
              {language === 'en' 
                ? 'Device Configuration' 
                : 'Configuración del Dispositivo'}
            </h3>
            
            <div className="bg-ice-50 rounded-lg p-4 border border-ice-200">
              <div className="flex items-center gap-2 text-ice-700">
                <Check className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'en' ? 'Device Connected' : 'Dispositivo Conectado'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {language === 'en' 
                  ? `Your ${deviceNames[deviceType]} is now connected and being configured.` 
                  : `Tu ${deviceNames[deviceType]} ahora está conectado y configurándose.`}
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm">
                    {language === 'en' ? 'Updating firmware...' : 'Actualizando firmware...'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm">
                    {language === 'en' ? 'Syncing account information...' : 'Sincronizando información de cuenta...'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-ice-300"></div>
                  <span className="text-sm">
                    {language === 'en' ? 'Setting up notifications...' : 'Configurando notificaciones...'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button onClick={nextStep} className="mt-4 bg-ice-600 hover:bg-ice-700">
                {language === 'en' ? 'Continue' : 'Continuar'}
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium">
              {language === 'en' 
                ? 'Setup Complete!' 
                : '¡Configuración Completa!'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? `Your ${deviceNames[deviceType]} is ready to use. You can now access all its features from your dashboard.` 
                : `Tu ${deviceNames[deviceType]} está listo para usar. Ahora puedes acceder a todas sus funciones desde tu panel.`}
            </p>
            <Button onClick={completeSetup} className="mt-4 bg-ice-600 hover:bg-ice-700">
              {language === 'en' ? 'Finish' : 'Finalizar'}
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="shadow-lg border-ice-100">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {deviceIcons[deviceType]}
            <CardTitle className="text-lg">
              {language === 'en' ? 'Device Setup' : 'Configuración de Dispositivo'}
            </CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'Step' : 'Paso'} {currentStep} {language === 'en' ? 'of' : 'de'} {totalSteps}
          </div>
        </div>
        <CardDescription>
          {language === 'en' 
            ? `Setting up your ${deviceNames[deviceType]}` 
            : `Configurando tu ${deviceNames[deviceType]}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};

export default DeviceSetupGuide;
