
import React, { useState } from "react";
import { Brain, Send, Sparkles, MessageCircle, Bot, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const AIGuardianSection: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'ai'}>>([
    {
      text: language === 'en' 
        ? "Hello! I'm ICE AI Guardian, your primary contact assistant. How can I help you today?"
        : "¡Hola! Soy ICE AI Guardian, tu asistente de contacto principal. ¿Cómo puedo ayudarte hoy?",
      sender: 'ai'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const responses = {
        en: [
          "I'm happy to help with that! Let me process your request and provide some information about our services.",
          "That's a great question. Our ICE Alár services are designed to provide comprehensive health monitoring. Would you like me to connect you with a human representative for more details?",
          "I understand your concern. I've recorded your message and one of our team members will review it within 24 hours. Is there anything else I can help with?",
          "Thank you for your inquiry. I've created a support ticket for your request. You'll receive a confirmation email shortly with your ticket number.",
          "I can assist with that! Our online support system allows me to handle most inquiries. For more complex matters, I can create a support ticket for our specialists."
        ],
        es: [
          "¡Estoy encantado de ayudarte! Permíteme procesar tu solicitud y proporcionarte información sobre nuestros servicios.",
          "Esa es una gran pregunta. Nuestros servicios de ICE Alár están diseñados para proporcionar un monitoreo integral de la salud. ¿Te gustaría que te conecte con un representante humano para más detalles?",
          "Entiendo tu preocupación. He registrado tu mensaje y uno de nuestros miembros del equipo lo revisará dentro de las próximas 24 horas. ¿Hay algo más en lo que pueda ayudarte?",
          "Gracias por tu consulta. He creado un ticket de soporte para tu solicitud. Recibirás un correo electrónico de confirmación en breve con tu número de ticket.",
          "¡Puedo ayudarte con eso! Nuestro sistema de soporte en línea me permite manejar la mayoría de las consultas. Para asuntos más complejos, puedo crear un ticket de soporte para nuestros especialistas."
        ]
      };
      
      const randomIndex = Math.floor(Math.random() * responses[language === 'en' ? 'en' : 'es'].length);
      setMessages(prev => [...prev, { 
        text: responses[language === 'en' ? 'en' : 'es'][randomIndex], 
        sender: 'ai' 
      }]);
      setIsLoading(false);
    }, 1500);
    
    setUserInput('');
  };

  return (
    <div className="mb-16 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-50/80 to-guardian-100/80 border border-guardian-200 text-guardian-600 text-sm font-medium mb-3 shadow-sm backdrop-blur-sm">
          <Brain size={16} className="mr-2" />
          <span>
            {language === 'en' ? 'ICE AI Guardian' : 'ICE AI Guardian'}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {language === 'en' ? 'Connect With Us Through AI' : 'Conéctate Con Nosotros a Través de IA'}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Our AI assistant is your primary point of contact. Get instant answers about our services, create support tickets, or request a follow-up from our team.' 
            : 'Nuestro asistente de IA es tu punto de contacto principal. Obtén respuestas instantáneas sobre nuestros servicios, crea tickets de soporte o solicita un seguimiento de nuestro equipo.'}
        </p>
      </div>
      
      <Card className="shadow-lg border-guardian-100">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-lg flex items-center text-guardian-600">
            <Bot className="mr-2 h-5 w-5" />
            {language === 'en' ? 'AI Support Assistant' : 'Asistente de Soporte IA'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 h-96 overflow-y-auto flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-ice-100 text-ice-950' 
                    : 'bg-guardian-100 text-guardian-950'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="flex items-center mb-1 text-xs font-medium">
                    <Brain size={12} className="mr-1" />
                    ICE AI Guardian
                  </div>
                )}
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-guardian-100 text-guardian-950">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-guardian-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-guardian-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-guardian-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t p-3">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={language === 'en' ? "Type your question or request here..." : "Escribe tu pregunta o solicitud aquí..."}
              className="flex-grow resize-none"
              rows={1}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-guardian-500 hover:bg-guardian-600 h-full aspect-square"
              disabled={isLoading || !userInput.trim()}
            >
              {isLoading ? <Sparkles size={18} className="animate-pulse" /> : <Send size={18} />}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="mt-8 flex justify-center gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle size={16} />
          <span>{language === 'en' ? 'Help Center' : 'Centro de Ayuda'}</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageCircle size={16} />
          <span>{language === 'en' ? 'Create Support Ticket' : 'Crear Ticket de Soporte'}</span>
        </Button>
      </div>
    </div>
  );
};

export default AIGuardianSection;
