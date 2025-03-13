
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatSupportPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-ice-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-ice-600" />
            {language === 'en' ? 'Chat Support' : 'Chat de Soporte'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Welcome message */}
                <div className="bg-ice-50 p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">
                    {language === 'en' 
                      ? 'Hello! Welcome to ICE Alarm chat support. How can we help you today?' 
                      : '¡Hola! Bienvenido al chat de soporte de ICE Alarm. ¿Cómo podemos ayudarte hoy?'}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {language === 'en' ? 'Support Agent • Just now' : 'Agente de Soporte • Ahora mismo'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t bg-white">
              <div className="flex gap-2">
                <Input 
                  placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {language === 'en' ? 'Contact Options' : 'Opciones de Contacto'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">{language === 'en' ? 'Phone Support' : 'Soporte Telefónico'}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' 
                  ? 'Available Monday to Friday, 9AM - 6PM' 
                  : 'Disponible de Lunes a Viernes, 9AM - 6PM'}
              </p>
              <p className="text-sm font-medium mt-2">+34 912 345 678</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">{language === 'en' ? 'Email Support' : 'Soporte por Email'}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' 
                  ? 'We typically respond within 24 hours' 
                  : 'Normalmente respondemos en 24 horas'}
              </p>
              <p className="text-sm font-medium mt-2">support@icealarm.es</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSupportPage;
