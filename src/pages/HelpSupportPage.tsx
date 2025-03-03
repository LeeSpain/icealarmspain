
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, HelpCircle, FileText, ExternalLink, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpSupportPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language, t } = useLanguage();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="help"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Help & Support' : 'Ayuda y Soporte'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Get assistance with your ICE Alarm service and devices' 
                : 'Obtén asistencia con tu servicio y dispositivos ICE Alarm'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-ice-500" />
                  <CardTitle>
                    {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
                  </CardTitle>
                </div>
                <CardDescription>
                  {language === 'en' 
                    ? 'Quick answers to common questions' 
                    : 'Respuestas rápidas a preguntas comunes'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      {language === 'en' 
                        ? 'How do I set up my SOS Pendant?' 
                        : '¿Cómo configuro mi Colgante SOS?'}
                    </AccordionTrigger>
                    <AccordionContent>
                      {language === 'en' 
                        ? 'To set up your SOS Pendant, first ensure it\'s fully charged. Then, press and hold the power button for 3 seconds until the LED light flashes blue. Open the ICE Alarm app on your smartphone, go to "Devices" and select "Add Device." Follow the on-screen instructions to complete the pairing process.' 
                        : 'Para configurar su Colgante SOS, primero asegúrese de que esté completamente cargado. Luego, mantenga presionado el botón de encendido durante 3 segundos hasta que la luz LED parpadee en azul. Abra la aplicación ICE Alarm en su smartphone, vaya a "Dispositivos" y seleccione "Agregar dispositivo". Siga las instrucciones en pantalla para completar el proceso de emparejamiento.'}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      {language === 'en' 
                        ? 'What happens when I press the SOS button?' 
                        : '¿Qué sucede cuando presiono el botón SOS?'}
                    </AccordionTrigger>
                    <AccordionContent>
                      {language === 'en' 
                        ? 'When you press and hold the SOS button for 3 seconds, your device will immediately alert our 24/7 monitoring center. An agent will attempt to contact you through the device\'s speakerphone. If you don\'t respond, we\'ll contact your emergency contacts and, if necessary, dispatch emergency services to your GPS location.' 
                        : 'Cuando presiona y mantiene presionado el botón SOS durante 3 segundos, su dispositivo alertará inmediatamente a nuestro centro de monitoreo 24/7. Un agente intentará contactarlo a través del altavoz del dispositivo. Si no responde, contactaremos a sus contactos de emergencia y, si es necesario, enviaremos servicios de emergencia a su ubicación GPS.'}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      {language === 'en' 
                        ? 'How accurate is the GPS location?' 
                        : '¿Qué tan precisa es la ubicación GPS?'}
                    </AccordionTrigger>
                    <AccordionContent>
                      {language === 'en' 
                        ? 'Our devices use advanced GPS technology that provides location accuracy within 2-5 meters outdoors. Indoors, the accuracy may vary depending on building materials and structure, but our systems use Wi-Fi and cellular triangulation as backup to ensure we can locate you even when GPS signal is limited.' 
                        : 'Nuestros dispositivos utilizan tecnología GPS avanzada que proporciona una precisión de ubicación de 2-5 metros en exteriores. En interiores, la precisión puede variar según los materiales y la estructura del edificio, pero nuestros sistemas utilizan Wi-Fi y triangulación celular como respaldo para garantizar que podamos localizarlo incluso cuando la señal GPS es limitada.'}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      {language === 'en' 
                        ? 'How long does the battery last?' 
                        : '¿Cuánto dura la batería?'}
                    </AccordionTrigger>
                    <AccordionContent>
                      {language === 'en' 
                        ? 'The SOS Pendant battery typically lasts 3-5 days on a single charge, depending on usage. The Glucose Monitor has a battery life of up to 14 days, while the Medical Dispenser should remain plugged in but includes a 24-hour backup battery in case of power outages.' 
                        : 'La batería del Colgante SOS generalmente dura de 3 a 5 días con una sola carga, dependiendo del uso. El Monitor de Glucosa tiene una duración de batería de hasta 14 días, mientras que el Dispensador Médico debe permanecer enchufado, pero incluye una batería de respaldo de 24 horas en caso de cortes de energía.'}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      {language === 'en' 
                        ? 'How do I update my emergency contacts?' 
                        : '¿Cómo actualizo mis contactos de emergencia?'}
                    </AccordionTrigger>
                    <AccordionContent>
                      {language === 'en' 
                        ? 'You can update your emergency contacts by going to your Profile page, selecting "Emergency Contacts," and then using the edit or add buttons to modify your contact list. Changes take effect immediately across all your devices.' 
                        : 'Puede actualizar sus contactos de emergencia yendo a su página de Perfil, seleccionando "Contactos de Emergencia" y luego usando los botones de editar o agregar para modificar su lista de contactos. Los cambios surten efecto inmediatamente en todos sus dispositivos.'}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Contact Support' : 'Contactar Soporte'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PhoneCall size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? '24/7 Support Line' : 'Línea de Soporte 24/7'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        +34 900 123 456
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageSquare size={18} className="text-ice-500" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {language === 'en' ? 'Email Support' : 'Soporte por Email'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        support@icealarm.com
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-ice-600 hover:bg-ice-700">
                    {language === 'en' ? 'Start Live Chat' : 'Iniciar Chat en Vivo'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Resources' : 'Recursos'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'User Guides' : 'Guías de Usuario'}
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Device Manuals' : 'Manuales de Dispositivos'}
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Video Tutorials' : 'Tutoriales en Video'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
