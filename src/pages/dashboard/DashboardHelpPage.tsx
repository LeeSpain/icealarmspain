
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HelpCircle, MessageSquare, PhoneCall, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardHelpPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Help & Support' : 'Ayuda y Soporte'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Find answers to your questions and get assistance' 
                : 'Encuentra respuestas a tus preguntas y obtén asistencia'}
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 bg-white"
                placeholder={language === 'en' ? "Search for help..." : "Buscar ayuda..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full md:grid-cols-4 grid-cols-2 mb-8">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                {language === 'en' ? 'FAQs' : 'Preguntas Frecuentes'}
              </TabsTrigger>
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {language === 'en' ? 'User Guides' : 'Guías de Usuario'}
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                {language === 'en' ? 'Video Tutorials' : 'Tutoriales en Video'}
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                {language === 'en' ? 'Contact Support' : 'Contactar Soporte'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Find answers to common questions about our products and services' 
                      : 'Encuentra respuestas a preguntas comunes sobre nuestros productos y servicios'}
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
                          ? 'To set up your SOS Pendant, ensure it is fully charged, then press and hold the power button for 3 seconds until the LED light turns on. Open the ICE Alarm app on your smartphone and follow the in-app instructions to pair your device.' 
                          : 'Para configurar tu Colgante SOS, asegúrate de que esté completamente cargado, luego mantén presionado el botón de encendido durante 3 segundos hasta que se encienda la luz LED. Abre la aplicación ICE Alarm en tu smartphone y sigue las instrucciones en la aplicación para emparejar tu dispositivo.'}
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        {language === 'en' 
                          ? 'How do I add emergency contacts?' 
                          : '¿Cómo añado contactos de emergencia?'}
                      </AccordionTrigger>
                      <AccordionContent>
                        {language === 'en' 
                          ? 'To add emergency contacts, go to the Emergency Contacts section in your dashboard. Click on "Add Contact" and fill in the required information. You can add multiple contacts and set their priority order.' 
                          : 'Para añadir contactos de emergencia, ve a la sección de Contactos de Emergencia en tu panel. Haz clic en "Añadir Contacto" y completa la información requerida. Puedes añadir múltiples contactos y establecer su orden de prioridad.'}
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        {language === 'en' 
                          ? 'What should I do if my device is not connecting?' 
                          : '¿Qué debo hacer si mi dispositivo no se conecta?'}
                      </AccordionTrigger>
                      <AccordionContent>
                        {language === 'en' 
                          ? 'If your device is not connecting, try the following steps: 1) Ensure the device is charged, 2) Restart the device by holding the power button for 10 seconds, 3) Make sure Bluetooth is enabled on your smartphone, 4) Try restarting the app, 5) If the problem persists, contact our support team.' 
                          : 'Si tu dispositivo no se conecta, prueba los siguientes pasos: 1) Asegúrate de que el dispositivo esté cargado, 2) Reinicia el dispositivo manteniendo presionado el botón de encendido durante 10 segundos, 3) Asegúrate de que el Bluetooth esté habilitado en tu smartphone, 4) Intenta reiniciar la aplicación, 5) Si el problema persiste, contacta a nuestro equipo de soporte.'}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'User Guides' : 'Guías de Usuario'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Detailed guides on how to use our products and services' 
                      : 'Guías detalladas sobre cómo usar nuestros productos y servicios'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">
                        {language === 'en' ? 'SOS Pendant User Guide' : 'Guía de Usuario del Colgante SOS'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Learn how to set up and use your SOS Pendant effectively' 
                          : 'Aprende cómo configurar y usar eficazmente tu Colgante SOS'}
                      </p>
                      <Button variant="outline">
                        {language === 'en' ? 'Read Guide' : 'Leer Guía'}
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">
                        {language === 'en' ? 'Glucose Monitor User Guide' : 'Guía de Usuario del Monitor de Glucosa'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Learn how to set up and use your Glucose Monitor effectively' 
                          : 'Aprende cómo configurar y usar eficazmente tu Monitor de Glucosa'}
                      </p>
                      <Button variant="outline">
                        {language === 'en' ? 'Read Guide' : 'Leer Guía'}
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">
                        {language === 'en' ? 'Medical Dispenser User Guide' : 'Guía de Usuario del Dispensador Médico'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Learn how to set up and use your Medical Dispenser effectively' 
                          : 'Aprende cómo configurar y usar eficazmente tu Dispensador Médico'}
                      </p>
                      <Button variant="outline">
                        {language === 'en' ? 'Read Guide' : 'Leer Guía'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Video Tutorials' : 'Tutoriales en Video'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Watch video tutorials on how to use our products and services' 
                      : 'Mira tutoriales en video sobre cómo usar nuestros productos y servicios'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">
                        {language === 'en' ? 'How to Set Up Your SOS Pendant' : 'Cómo Configurar tu Colgante SOS'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? '3:24 min | Step-by-step guide on setting up your SOS Pendant' 
                          : '3:24 min | Guía paso a paso para configurar tu Colgante SOS'}
                      </p>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        {language === 'en' ? 'Watch Video' : 'Ver Video'}
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">
                        {language === 'en' ? 'Using Your Glucose Monitor' : 'Usando tu Monitor de Glucosa'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? '4:12 min | Learn how to use your Glucose Monitor effectively' 
                          : '4:12 min | Aprende a usar eficazmente tu Monitor de Glucosa'}
                      </p>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        {language === 'en' ? 'Watch Video' : 'Ver Video'}
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">
                        {language === 'en' ? 'Programming Your Medical Dispenser' : 'Programando tu Dispensador Médico'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? '5:37 min | How to program medication schedules on your dispenser' 
                          : '5:37 min | Cómo programar horarios de medicación en tu dispensador'}
                      </p>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        {language === 'en' ? 'Watch Video' : 'Ver Video'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Contact Support' : 'Contactar Soporte'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Get in touch with our support team for assistance' 
                      : 'Ponte en contacto con nuestro equipo de soporte para obtener ayuda'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <PhoneCall className="mx-auto h-8 w-8 text-ice-600 mb-2" />
                      <h3 className="font-medium mb-1">
                        {language === 'en' ? 'Phone Support' : 'Soporte Telefónico'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'en' 
                          ? 'Available 24/7' 
                          : 'Disponible 24/7'}
                      </p>
                      <p className="font-medium">+1 (800) 555-0123</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <MessageSquare className="mx-auto h-8 w-8 text-ice-600 mb-2" />
                      <h3 className="font-medium mb-1">
                        {language === 'en' ? 'Live Chat' : 'Chat en Vivo'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'en' 
                          ? 'Chat with a support agent' 
                          : 'Chatea con un agente de soporte'}
                      </p>
                      <Button className="bg-ice-600 hover:bg-ice-700 w-full">
                        {language === 'en' ? 'Start Chat' : 'Iniciar Chat'}
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <BookOpen className="mx-auto h-8 w-8 text-ice-600 mb-2" />
                      <h3 className="font-medium mb-1">
                        {language === 'en' ? 'Support Ticket' : 'Ticket de Soporte'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'en' 
                          ? 'Submit a support ticket' 
                          : 'Envía un ticket de soporte'}
                      </p>
                      <Button variant="outline" className="w-full">
                        {language === 'en' ? 'Create Ticket' : 'Crear Ticket'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardHelpPage;
