
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Check, CheckCircle2, Smartphone, MapPin, PlugZap, Info, AlertCircle, Wifi, User2 } from "lucide-react";

const DeviceActivation: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [activationProgress, setActivationProgress] = useState<number>(0);
  
  const [deviceType, setDeviceType] = useState<string>("glucose");
  const [activationCode, setActivationCode] = useState<string>("");
  const [deviceLocation, setDeviceLocation] = useState<string>("livingroom");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [wifiNetwork, setWifiNetwork] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  
  const [otpValue, setOtpValue] = useState("");
  const [availableNetworks] = useState([
    { id: "network1", name: "Home-WiFi-2.4G", strength: 4 },
    { id: "network2", name: "Neighbor-5G", strength: 2 },
    { id: "network3", name: "CoffeeShop_Guest", strength: 1 },
    { id: "network4", name: "Movistar_FTTH", strength: 3 },
  ]);
  
  const deviceTypes = {
    glucose: {
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png"
    },
    pendant: {
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png"
    },
    dispenser: {
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png"
    }
  };

  // Function to handle device detection
  const detectDevice = () => {
    setLoading(true);
    setActivationProgress(10);
    
    // Simulate device detection
    setTimeout(() => {
      // Determine device type based on deviceId from URL or default to glucose
      const detectedType = deviceId?.includes("pendant") 
        ? "pendant" 
        : deviceId?.includes("dispenser") 
          ? "dispenser" 
          : "glucose";
      
      setDeviceType(detectedType);
      setLoading(false);
      setActivationProgress(20);
      setStep(2);
    }, 2000);
  };
  
  // Function to verify activation code
  const verifyActivationCode = () => {
    if (activationCode.length < 6) {
      toast({
        title: language === 'en' ? "Invalid Code" : "Código No Válido",
        description: language === 'en' 
          ? "Please enter a valid 6-digit activation code" 
          : "Por favor ingrese un código de activación de 6 dígitos válido",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setActivationProgress(30);
    
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      setActivationProgress(40);
      setStep(3);
    }, 1500);
  };
  
  // Function to connect to WiFi
  const connectToWifi = () => {
    if (!wifiNetwork || !wifiPassword) {
      toast({
        title: language === 'en' ? "Missing Information" : "Información Faltante",
        description: language === 'en' 
          ? "Please select a network and enter the password" 
          : "Por favor seleccione una red e ingrese la contraseña",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setActivationProgress(50);
    
    // Simulate WiFi connection
    setTimeout(() => {
      setLoading(false);
      setActivationProgress(60);
      setStep(4);
    }, 3000);
  };
  
  // Function to set up device
  const setupDevice = () => {
    if (!deviceName || !deviceLocation) {
      toast({
        title: language === 'en' ? "Missing Information" : "Información Faltante",
        description: language === 'en' 
          ? "Please name your device and select a location" 
          : "Por favor nombre su dispositivo y seleccione una ubicación",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setActivationProgress(70);
    
    // Simulate device setup
    setTimeout(() => {
      setLoading(false);
      setActivationProgress(80);
      setStep(5);
    }, 2500);
  };
  
  // Function to complete activation
  const completeActivation = () => {
    if (!acceptedTerms) {
      toast({
        title: language === 'en' ? "Terms Required" : "Términos Requeridos",
        description: language === 'en' 
          ? "Please accept the terms and conditions to continue" 
          : "Por favor acepte los términos y condiciones para continuar",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setActivationProgress(90);
    
    // Simulate final activation
    setTimeout(() => {
      setLoading(false);
      setActivationProgress(100);
      
      // Show success toast
      toast({
        title: language === 'en' ? "Activation Complete" : "Activación Completa",
        description: language === 'en' 
          ? `Your ${deviceTypes[deviceType as keyof typeof deviceTypes].name} has been successfully activated!` 
          : `¡Su ${deviceTypes[deviceType as keyof typeof deviceTypes].name} ha sido activado con éxito!`,
        variant: "default",
      });
      
      setStep(6);
    }, 2000);
  };
  
  // Function to finish and navigate
  const finishSetup = () => {
    // Navigate to the device-specific page based on type
    switch (deviceType) {
      case "glucose":
        navigate("/glucose-monitor");
        break;
      case "pendant":
        navigate("/sos-pendant");
        break;
      case "dispenser":
        navigate("/medical-dispenser");
        break;
      default:
        navigate("/dashboard");
    }
    
    // Show a toast to confirm
    toast({
      title: language === 'en' ? "Setup Complete" : "Configuración Completa",
      description: language === 'en' 
        ? "You can now start using your device" 
        : "Ahora puede comenzar a usar su dispositivo",
      variant: "default",
    });
  };
  
  // Function to handle OTP verification for the SMS verification step
  const verifyOTP = () => {
    if (otpValue.length < 6) {
      toast({
        title: language === 'en' ? "Invalid Code" : "Código No Válido",
        description: language === 'en' 
          ? "Please enter the complete 6-digit verification code" 
          : "Por favor ingrese el código de verificación de 6 dígitos completo",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      // Navigate to the device activation flow
      setDeviceType("glucose"); // Default to glucose if not specified
      setStep(1);
      setActivationProgress(0);
    }, 1500);
  };
  
  // Get the current step title
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return language === 'en' ? "Device Detection" : "Detección de Dispositivo";
      case 2:
        return language === 'en' ? "Activation Code" : "Código de Activación";
      case 3:
        return language === 'en' ? "WiFi Connection" : "Conexión WiFi";
      case 4:
        return language === 'en' ? "Device Setup" : "Configuración de Dispositivo";
      case 5:
        return language === 'en' ? "Finalize Setup" : "Finalizar Configuración";
      case 6:
        return language === 'en' ? "Setup Complete" : "Configuración Completa";
      default:
        return language === 'en' ? "Device Activation" : "Activación de Dispositivo";
    }
  };
  
  return (
    <div className="min-h-screen bg-ice-50/30 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {language === 'en' ? 'Device Activation' : 'Activación de Dispositivo'}
        </h1>
        
        <p className="text-muted-foreground text-center mb-8">
          {language === 'en' 
            ? "Follow the steps below to set up your new device" 
            : "Siga los pasos a continuación para configurar su nuevo dispositivo"}
        </p>
        
        {step < 6 && (
          <div className="mb-8">
            <Progress value={activationProgress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {activationProgress}% {language === 'en' ? "Complete" : "Completado"}
            </p>
          </div>
        )}
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>
              {step === 1 && (language === 'en' 
                ? "Let's detect your device. Make sure it's turned on and nearby." 
                : "Vamos a detectar su dispositivo. Asegúrese de que esté encendido y cerca.")}
              
              {step === 2 && (language === 'en' 
                ? "Enter the 6-digit activation code found on your device or packaging." 
                : "Ingrese el código de activación de 6 dígitos que se encuentra en su dispositivo o empaque.")}
              
              {step === 3 && (language === 'en' 
                ? "Connect your device to your home WiFi network." 
                : "Conecte su dispositivo a su red WiFi doméstica.")}
              
              {step === 4 && (language === 'en' 
                ? "Customize your device settings." 
                : "Personalice la configuración de su dispositivo.")}
              
              {step === 5 && (language === 'en' 
                ? "Review and finalize your device setup." 
                : "Revise y finalice la configuración de su dispositivo.")}
              
              {step === 6 && (language === 'en' 
                ? "Your device is now ready to use!" 
                : "¡Su dispositivo está listo para usar!")}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <img 
                    src={deviceTypes[deviceType as keyof typeof deviceTypes].image} 
                    alt={deviceTypes[deviceType as keyof typeof deviceTypes].name}
                    className="h-48 object-contain mb-4" 
                  />
                  <h3 className="text-xl font-medium">
                    {deviceType === "glucose" && (language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa")}
                    {deviceType === "pendant" && (language === 'en' ? "SOS Pendant" : "Colgante SOS")}
                    {deviceType === "dispenser" && (language === 'en' ? "Medical Dispenser" : "Dispensador Médico")}
                  </h3>
                </div>
                
                <Alert className="bg-blue-50">
                  <Info className="h-4 w-4" />
                  <AlertTitle>
                    {language === 'en' ? "Instruction" : "Instrucción"}
                  </AlertTitle>
                  <AlertDescription>
                    {language === 'en' 
                      ? "Press and hold the power button on your device for 3 seconds until the LED light blinks blue." 
                      : "Mantenga presionado el botón de encendido en su dispositivo durante 3 segundos hasta que la luz LED parpadee en azul."}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-4">
                  <img 
                    src={deviceTypes[deviceType as keyof typeof deviceTypes].image} 
                    alt={deviceTypes[deviceType as keyof typeof deviceTypes].name}
                    className="h-32 object-contain mb-4" 
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="activation-code">
                    {language === 'en' ? "Activation Code" : "Código de Activación"}
                  </Label>
                  <Input
                    id="activation-code"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    placeholder={language === 'en' ? "Enter 6-digit code" : "Ingrese código de 6 dígitos"}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? "The activation code can be found on the back of your device or on the packaging." 
                      : "El código de activación se encuentra en la parte posterior de su dispositivo o en el empaque."}
                  </p>
                </div>
                
                <Alert variant="default" className="bg-amber-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {language === 'en' 
                      ? "Make sure the LED on your device is still blinking blue. If not, please restart the device." 
                      : "Asegúrese de que el LED en su dispositivo siga parpadeando en azul. Si no, reinicie el dispositivo."}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>
                    {language === 'en' ? "Select WiFi Network" : "Seleccionar Red WiFi"}
                  </Label>
                  
                  <RadioGroup value={wifiNetwork} onValueChange={setWifiNetwork} className="space-y-3">
                    {availableNetworks.map((network) => (
                      <div key={network.id} className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={network.id} id={network.id} />
                          <Label htmlFor={network.id} className="cursor-pointer">{network.name}</Label>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Wifi 
                              key={i} 
                              className={`h-4 w-4 ${i < network.strength ? 'text-ice-600' : 'text-muted-foreground/30'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="wifi-password">
                    {language === 'en' ? "WiFi Password" : "Contraseña WiFi"}
                  </Label>
                  <Input
                    id="wifi-password"
                    type="password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder={language === 'en' ? "Enter WiFi password" : "Ingrese contraseña WiFi"}
                  />
                </div>
                
                <Alert className="bg-blue-50">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {language === 'en' 
                      ? "Your device will use this WiFi connection to send and receive data." 
                      : "Su dispositivo utilizará esta conexión WiFi para enviar y recibir datos."}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="device-name">
                    {language === 'en' ? "Device Name" : "Nombre del Dispositivo"}
                  </Label>
                  <Input
                    id="device-name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder={language === 'en' ? "E.g. Living Room Monitor" : "Ej. Monitor Sala de Estar"}
                  />
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? "Give your device a name to easily identify it." 
                      : "Asigne un nombre a su dispositivo para identificarlo fácilmente."}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label>
                    {language === 'en' ? "Device Location" : "Ubicación del Dispositivo"}
                  </Label>
                  <RadioGroup value={deviceLocation} onValueChange={setDeviceLocation} className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="livingroom" id="livingroom" />
                      <Label htmlFor="livingroom" className="cursor-pointer">
                        {language === 'en' ? "Living Room" : "Sala de Estar"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="bedroom" id="bedroom" />
                      <Label htmlFor="bedroom" className="cursor-pointer">
                        {language === 'en' ? "Bedroom" : "Dormitorio"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="kitchen" id="kitchen" />
                      <Label htmlFor="kitchen" className="cursor-pointer">
                        {language === 'en' ? "Kitchen" : "Cocina"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="bathroom" id="bathroom" />
                      <Label htmlFor="bathroom" className="cursor-pointer">
                        {language === 'en' ? "Bathroom" : "Baño"}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {deviceType === "glucose" && (
                  <Alert className="bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'en' 
                        ? "Your glucose monitor should be placed in a location where you typically test your glucose levels." 
                        : "Su monitor de glucosa debe colocarse en un lugar donde normalmente mida sus niveles de glucosa."}
                    </AlertDescription>
                  </Alert>
                )}
                
                {deviceType === "pendant" && (
                  <Alert className="bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'en' 
                        ? "The SOS pendant is wearable, but you can set its charging station location here." 
                        : "El colgante SOS es portátil, pero puede establecer la ubicación de su estación de carga aquí."}
                    </AlertDescription>
                  </Alert>
                )}
                
                {deviceType === "dispenser" && (
                  <Alert className="bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'en' 
                        ? "The medical dispenser should be placed in a location where you'll easily remember to take your medication." 
                        : "El dispensador médico debe colocarse en un lugar donde recordará fácilmente tomar su medicación."}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-md space-y-3">
                  <h3 className="font-medium">
                    {language === 'en' ? "Device Summary" : "Resumen del Dispositivo"}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        {language === 'en' ? "Device Type:" : "Tipo de Dispositivo:"}
                      </p>
                      <p className="font-medium">{deviceTypes[deviceType as keyof typeof deviceTypes].name}</p>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        {language === 'en' ? "Device Name:" : "Nombre del Dispositivo:"}
                      </p>
                      <p className="font-medium">{deviceName}</p>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        {language === 'en' ? "Location:" : "Ubicación:"}
                      </p>
                      <p className="font-medium">
                        {deviceLocation === "livingroom" && (language === 'en' ? "Living Room" : "Sala de Estar")}
                        {deviceLocation === "bedroom" && (language === 'en' ? "Bedroom" : "Dormitorio")}
                        {deviceLocation === "kitchen" && (language === 'en' ? "Kitchen" : "Cocina")}
                        {deviceLocation === "bathroom" && (language === 'en' ? "Bathroom" : "Baño")}
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        {language === 'en' ? "WiFi Network:" : "Red WiFi:"}
                      </p>
                      <p className="font-medium">
                        {availableNetworks.find(n => n.id === wifiNetwork)?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal leading-snug"
                    >
                      {language === 'en' 
                        ? "I accept the terms and conditions for using this device" 
                        : "Acepto los términos y condiciones para usar este dispositivo"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' 
                        ? "By accepting, you allow the device to collect and transmit data related to its functionality." 
                        : "Al aceptar, permite que el dispositivo recopile y transmita datos relacionados con su funcionalidad."}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {step === 6 && (
              <div className="flex flex-col items-center py-6 space-y-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">
                    {language === 'en' ? "Setup Complete!" : "¡Configuración Completa!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? `Your ${deviceTypes[deviceType as keyof typeof deviceTypes].name} is now set up and ready to use.` 
                      : `Su ${deviceTypes[deviceType as keyof typeof deviceTypes].name} está configurado y listo para usar.`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>
                    {language === 'en' ? "Device Activated" : "Dispositivo Activado"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>
                    {language === 'en' ? "Connected to WiFi" : "Conectado a WiFi"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>
                    {language === 'en' ? "Data Synchronization Enabled" : "Sincronización de Datos Habilitada"}
                  </span>
                </div>
                
                {deviceType === "glucose" && (
                  <Alert className="bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'en' 
                        ? "Your glucose monitor will take a few minutes to calibrate. Please follow the instructions in your dashboard for the first reading." 
                        : "Su monitor de glucosa tardará unos minutos en calibrarse. Siga las instrucciones en su panel para la primera lectura."}
                    </AlertDescription>
                  </Alert>
                )}
                
                {deviceType === "pendant" && (
                  <Alert className="bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'en' 
                        ? "Please test your SOS pendant by pressing the emergency button for 3 seconds. This will trigger a test alert." 
                        : "Pruebe su colgante SOS presionando el botón de emergencia durante 3 segundos. Esto activará una alerta de prueba."}
                    </AlertDescription>
                  </Alert>
                )}
                
                {deviceType === "dispenser" && (
                  <Alert className="bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'en' 
                        ? "Please go to your dashboard to set up your medication schedule." 
                        : "Vaya a su panel para configurar su horario de medicación."}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            {step === 1 && (
              <Button 
                onClick={detectDevice} 
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    {language === 'en' ? "Detecting..." : "Detectando..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    {language === 'en' ? "Detect Device" : "Detectar Dispositivo"}
                  </span>
                )}
              </Button>
            )}
            
            {step === 2 && (
              <div className="w-full flex flex-col space-y-3">
                <Button 
                  onClick={verifyActivationCode} 
                  disabled={loading || activationCode.length < 6}
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      {language === 'en' ? "Verifying..." : "Verificando..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Verify Code" : "Verificar Código"}
                    </span>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  {language === 'en' ? "Back" : "Atrás"}
                </Button>
              </div>
            )}
            
            {step === 3 && (
              <div className="w-full flex flex-col space-y-3">
                <Button 
                  onClick={connectToWifi} 
                  disabled={loading || !wifiNetwork || !wifiPassword}
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      {language === 'en' ? "Connecting..." : "Conectando..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Wifi className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Connect to WiFi" : "Conectar a WiFi"}
                    </span>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  disabled={loading}
                >
                  {language === 'en' ? "Back" : "Atrás"}
                </Button>
              </div>
            )}
            
            {step === 4 && (
              <div className="w-full flex flex-col space-y-3">
                <Button 
                  onClick={setupDevice} 
                  disabled={loading || !deviceName || !deviceLocation}
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      {language === 'en' ? "Setting up..." : "Configurando..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <PlugZap className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Set Up Device" : "Configurar Dispositivo"}
                    </span>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setStep(3)}
                  disabled={loading}
                >
                  {language === 'en' ? "Back" : "Atrás"}
                </Button>
              </div>
            )}
            
            {step === 5 && (
              <div className="w-full flex flex-col space-y-3">
                <Button 
                  onClick={completeActivation} 
                  disabled={loading || !acceptedTerms}
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      {language === 'en' ? "Activating..." : "Activando..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Complete Activation" : "Completar Activación"}
                    </span>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setStep(4)}
                  disabled={loading}
                >
                  {language === 'en' ? "Back" : "Atrás"}
                </Button>
              </div>
            )}
            
            {step === 6 && (
              <div className="w-full flex flex-col space-y-3">
                <Button 
                  onClick={finishSetup} 
                  className="w-full"
                >
                  <span className="flex items-center">
                    <User2 className="mr-2 h-4 w-4" />
                    {language === 'en' ? "Go to Device Dashboard" : "Ir al Panel del Dispositivo"}
                  </span>
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DeviceActivation;
