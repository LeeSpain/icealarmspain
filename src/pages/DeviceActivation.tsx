
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Smartphone, QrCode, Wifi, Info } from "lucide-react";
import { toast } from "react-toastify";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Steps, Step } from "@/components/ui/steps";
import DeviceRegistrationForm from "@/components/devices/DeviceRegistrationForm";
import { getDevices } from "@/components/devices/deviceData";

const DeviceActivation: React.FC = () => {
  const { language } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { deviceType } = useParams<{ deviceType: string }>();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [deviceCode, setDeviceCode] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("manual");
  
  const devices = getDevices(language);
  const currentDevice = devices.find(d => d.id === deviceType) || devices[0];
  
  const handleActivateDevice = () => {
    if (!deviceCode.trim()) {
      toast.error(
        language === 'en' 
          ? "Please enter a valid device code" 
          : "Por favor, introduzca un código de dispositivo válido"
      );
      return;
    }
    
    setIsActivating(true);
    
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false);
      setActivationSuccess(true);
      
      toast.success(
        language === 'en' 
          ? `Your ${currentDevice.name} has been successfully activated` 
          : `Su ${currentDevice.name} ha sido activado con éxito`
      );
      
      // Move to next step after 1 second
      setTimeout(() => {
        setCurrentStep(4);
      }, 1000);
    }, 2000);
  };
  
  const handleFinish = () => {
    // Navigate to device management page
    navigate(`/devices/${deviceType}`);
  };
  
  const content = {
    en: {
      title: "Device Activation",
      description: "Follow the steps to activate your new device",
      step1: "Preparation",
      step2: "Connect Device",
      step3: "Activation",
      step4: "Complete",
      stepDescription1: "Prepare your device for activation",
      stepDescription2: "Connect your device to your account",
      stepDescription3: "Activate your device",
      stepDescription4: "Setup complete",
      prepare: {
        title: "Prepare Your Device",
        description: "Make sure your device is ready for activation",
        steps: [
          "Unbox your device and remove all packaging materials",
          "Charge your device for at least 30 minutes before activation",
          "Ensure your device is turned on (press and hold the power button for 3 seconds)",
          "Have your device code ready (found on the device or packaging)"
        ],
        note: "Your device must be charged and powered on for successful activation"
      },
      connect: {
        title: "Connect Your Device",
        description: "Choose how you want to connect your device",
        manualTitle: "Manual Entry",
        manualDescription: "Enter the device code manually",
        qrTitle: "QR Code",
        qrDescription: "Scan the QR code on your device",
        wifiTitle: "Wi-Fi Setup",
        wifiDescription: "Connect through your Wi-Fi network",
        codeLabel: "Device Code",
        codePlaceholder: "Enter the 8-digit device code",
        codeHelp: "The device code can be found on the back of your device or on the packaging",
        next: "Next"
      },
      activate: {
        title: "Activate Your Device",
        description: "Complete the activation process",
        deviceInfo: "Device Information",
        nameLabel: "Device Name",
        namePlaceholder: "My Device",
        locationLabel: "Device Location",
        locationPlaceholder: "Living Room, Bedroom, etc.",
        activateButton: "Activate Device",
        activatingButton: "Activating...",
        successTitle: "Activation Successful",
        successDescription: "Your device has been successfully activated and is now ready to use."
      },
      complete: {
        title: "Setup Complete",
        description: "Your device is now ready to use",
        message: "Congratulations! Your device has been successfully activated and is now connected to your account. You can now start using your device and customize its settings.",
        whatNext: "What's Next?",
        nextSteps: [
          "Configure device settings to customize its behavior",
          "Set up alerts and notifications for this device",
          "Add emergency contacts who will be notified when the device is triggered",
          "Test your device to ensure it's working properly"
        ],
        deviceDashboard: "Go to Device Dashboard",
        setupAnother: "Setup Another Device"
      }
    },
    es: {
      title: "Activación de Dispositivo",
      description: "Siga los pasos para activar su nuevo dispositivo",
      step1: "Preparación",
      step2: "Conectar Dispositivo",
      step3: "Activación",
      step4: "Completado",
      stepDescription1: "Prepare su dispositivo para la activación",
      stepDescription2: "Conecte su dispositivo a su cuenta",
      stepDescription3: "Active su dispositivo",
      stepDescription4: "Configuración completada",
      prepare: {
        title: "Prepare Su Dispositivo",
        description: "Asegúrese de que su dispositivo esté listo para la activación",
        steps: [
          "Desembale su dispositivo y retire todos los materiales de embalaje",
          "Cargue su dispositivo durante al menos 30 minutos antes de la activación",
          "Asegúrese de que su dispositivo esté encendido (mantenga presionado el botón de encendido durante 3 segundos)",
          "Tenga listo el código de su dispositivo (se encuentra en el dispositivo o en el embalaje)"
        ],
        note: "Su dispositivo debe estar cargado y encendido para una activación exitosa"
      },
      connect: {
        title: "Conectar Su Dispositivo",
        description: "Elija cómo desea conectar su dispositivo",
        manualTitle: "Entrada Manual",
        manualDescription: "Introduzca el código del dispositivo manualmente",
        qrTitle: "Código QR",
        qrDescription: "Escanee el código QR en su dispositivo",
        wifiTitle: "Configuración Wi-Fi",
        wifiDescription: "Conectar a través de su red Wi-Fi",
        codeLabel: "Código del Dispositivo",
        codePlaceholder: "Introduzca el código de 8 dígitos del dispositivo",
        codeHelp: "El código del dispositivo se puede encontrar en la parte posterior de su dispositivo o en el embalaje",
        next: "Siguiente"
      },
      activate: {
        title: "Activar Su Dispositivo",
        description: "Complete el proceso de activación",
        deviceInfo: "Información del Dispositivo",
        nameLabel: "Nombre del Dispositivo",
        namePlaceholder: "Mi Dispositivo",
        locationLabel: "Ubicación del Dispositivo",
        locationPlaceholder: "Sala de estar, Dormitorio, etc.",
        activateButton: "Activar Dispositivo",
        activatingButton: "Activando...",
        successTitle: "Activación Exitosa",
        successDescription: "Su dispositivo ha sido activado con éxito y ahora está listo para usar."
      },
      complete: {
        title: "Configuración Completada",
        description: "Su dispositivo ahora está listo para usar",
        message: "¡Felicidades! Su dispositivo ha sido activado con éxito y ahora está conectado a su cuenta. Ahora puede comenzar a usar su dispositivo y personalizar su configuración.",
        whatNext: "¿Qué Sigue?",
        nextSteps: [
          "Configure los ajustes del dispositivo para personalizar su comportamiento",
          "Configure alertas y notificaciones para este dispositivo",
          "Añada contactos de emergencia que serán notificados cuando se active el dispositivo",
          "Pruebe su dispositivo para asegurarse de que funciona correctamente"
        ],
        deviceDashboard: "Ir al Panel del Dispositivo",
        setupAnother: "Configurar Otro Dispositivo"
      }
    }
  };
  
  const ct = language === 'en' ? content.en : content.es;
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="devices"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">
                  {ct.title}: {currentDevice.name}
                </h1>
                <p className="text-muted-foreground">
                  {ct.description}
                </p>
              </div>
            </div>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <Steps currentStep={currentStep} className="mb-8">
                  <Step
                    title={ct.step1}
                    description={ct.stepDescription1}
                    icon={<Info className="h-5 w-5" />}
                  />
                  <Step
                    title={ct.step2}
                    description={ct.stepDescription2}
                    icon={<Smartphone className="h-5 w-5" />}
                  />
                  <Step
                    title={ct.step3}
                    description={ct.stepDescription3}
                    icon={<Wifi className="h-5 w-5" />}
                  />
                  <Step
                    title={ct.step4}
                    description={ct.stepDescription4}
                    icon={<CheckCircle className="h-5 w-5" />}
                  />
                </Steps>
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{ct.prepare.title}</h2>
                      <p className="text-muted-foreground mb-4">{ct.prepare.description}</p>
                      
                      <div className="space-y-4">
                        <ol className="list-decimal pl-5 space-y-3">
                          {ct.prepare.steps.map((step, index) => (
                            <li key={index} className="pl-2">{step}</li>
                          ))}
                        </ol>
                        
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{language === 'en' ? 'Note' : 'Nota'}</AlertTitle>
                          <AlertDescription>
                            {ct.prepare.note}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={() => setCurrentStep(2)}>
                        {language === 'en' ? 'Continue' : 'Continuar'}
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{ct.connect.title}</h2>
                      <p className="text-muted-foreground mb-4">{ct.connect.description}</p>
                      
                      <Tabs defaultValue="manual" onValueChange={setSelectedMethod}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="manual" className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            {ct.connect.manualTitle}
                          </TabsTrigger>
                          <TabsTrigger value="qr" className="flex items-center">
                            <QrCode className="h-4 w-4 mr-2" />
                            {ct.connect.qrTitle}
                          </TabsTrigger>
                          <TabsTrigger value="wifi" className="flex items-center">
                            <Wifi className="h-4 w-4 mr-2" />
                            {ct.connect.wifiTitle}
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="manual" className="p-4 border rounded-md mt-4">
                          <h3 className="font-medium mb-1">{ct.connect.manualTitle}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{ct.connect.manualDescription}</p>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="device-code">{ct.connect.codeLabel}</Label>
                              <Input
                                id="device-code"
                                value={deviceCode}
                                onChange={(e) => setDeviceCode(e.target.value)}
                                placeholder={ct.connect.codePlaceholder}
                                maxLength={8}
                              />
                              <p className="text-xs text-muted-foreground">{ct.connect.codeHelp}</p>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="qr" className="p-4 border rounded-md mt-4">
                          <h3 className="font-medium mb-1">{ct.connect.qrTitle}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{ct.connect.qrDescription}</p>
                          
                          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md">
                            <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-center text-sm text-muted-foreground">
                              {language === 'en' 
                                ? "Position the QR code on your device in front of your camera" 
                                : "Coloque el código QR de su dispositivo frente a su cámara"}
                            </p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="wifi" className="p-4 border rounded-md mt-4">
                          <h3 className="font-medium mb-1">{ct.connect.wifiTitle}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{ct.connect.wifiDescription}</p>
                          
                          <Alert className="mb-4">
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              {language === 'en' 
                                ? "Make sure your device is in pairing mode (blinking blue light)" 
                                : "Asegúrese de que su dispositivo esté en modo de emparejamiento (luz azul parpadeante)"}
                            </AlertDescription>
                          </Alert>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="wifi-name">
                                {language === 'en' ? "Wi-Fi Network" : "Red Wi-Fi"}
                              </Label>
                              <Input
                                id="wifi-name"
                                disabled
                                value="ICE_Secure_Network"
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        {language === 'en' ? 'Back' : 'Atrás'}
                      </Button>
                      <Button onClick={() => setCurrentStep(3)}>
                        {ct.connect.next}
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{ct.activate.title}</h2>
                      <p className="text-muted-foreground mb-4">{ct.activate.description}</p>
                      
                      {activationSuccess ? (
                        <Alert variant="success" className="border-green-500 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertTitle className="text-green-600">{ct.activate.successTitle}</AlertTitle>
                          <AlertDescription className="text-green-700">
                            {ct.activate.successDescription}
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <div className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>{ct.activate.deviceInfo}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <DeviceRegistrationForm deviceType={deviceType || 'sos-pendant'} />
                              
                              <div className="mt-6">
                                <Button 
                                  className="w-full" 
                                  onClick={handleActivateDevice}
                                  disabled={isActivating}
                                >
                                  {isActivating ? (
                                    <>
                                      <div className="spinner-border h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                      {ct.activate.activatingButton}
                                    </>
                                  ) : (
                                    ct.activate.activateButton
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} disabled={activationSuccess}>
                        {language === 'en' ? 'Back' : 'Atrás'}
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{ct.complete.title}</h2>
                      <p className="text-muted-foreground mb-4">{ct.complete.description}</p>
                      
                      <Alert variant="success" className="border-green-500 bg-green-50 mb-6">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                          {ct.complete.message}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="mb-6">
                        <h3 className="font-medium mb-2">{ct.complete.whatNext}</h3>
                        <ul className="space-y-2">
                          {ct.complete.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={handleFinish} className="flex-1">
                          {ct.complete.deviceDashboard}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setCurrentStep(1);
                            setDeviceCode("");
                            setActivationSuccess(false);
                          }}
                          className="flex-1"
                        >
                          {ct.complete.setupAnother}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceActivation;
