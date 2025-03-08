
import React, { useState, useRef, useEffect } from "react";
import { Brain, Send, Sparkles, MessageCircle, Bot, HelpCircle, Zap, Briefcase, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { findRelevantKnowledge } from "@/data/ai-knowledge-base";
import { aiKnowledgeService } from "@/services/ai/AIKnowledgeService";

const EnhancedAIGuardianSection: React.FC = () => {
  const { language } = useLanguage();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'ai', category?: string}>>([
    {
      text: language === 'en' 
        ? "Hello! I'm ICE AI Guardian, your integrated business assistant. I can help with service inquiries, connect you with specialized departments, or help you navigate our organization. How can I assist you today?"
        : "¡Hola! Soy ICE AI Guardian, tu asistente de negocio integrado. Puedo ayudarte con consultas sobre servicios, conectarte con departamentos especializados o ayudarte a navegar por nuestra organización. ¿Cómo puedo ayudarte hoy?",
      sender: 'ai',
      category: 'welcome'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeAreas, setKnowledgeAreas] = useState<string[]>([
    'services', 'support', 'business', 'appointments'
  ]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Auto-scroll to bottom of messages container when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    setIsLoading(true);
    
    try {
      // Determine the knowledge area if not already selected
      const area = selectedArea || determineKnowledgeArea(userInput);
      if (!selectedArea) {
        setSelectedArea(area);
      }
      
      // Get AI response
      const aiResponse = await getEnhancedResponse(userInput, area);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        text: aiResponse, 
        sender: 'ai',
        category: area
      }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en' 
          ? "Sorry, I encountered an error processing your request." 
          : "Lo siento, encontré un error al procesar tu solicitud.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };

  // Function to determine knowledge area based on message content
  const determineKnowledgeArea = (message: string): string => {
    const normalizedMessage = message.toLowerCase();
    
    if (normalizedMessage.includes('price') || 
        normalizedMessage.includes('service') || 
        normalizedMessage.includes('offer') || 
        normalizedMessage.includes('plan') ||
        normalizedMessage.includes('precio') || 
        normalizedMessage.includes('servicio') || 
        normalizedMessage.includes('oferta') || 
        normalizedMessage.includes('plan')) {
      return 'services';
    }
    
    if (normalizedMessage.includes('help') || 
        normalizedMessage.includes('support') || 
        normalizedMessage.includes('problem') || 
        normalizedMessage.includes('issue') ||
        normalizedMessage.includes('ayuda') || 
        normalizedMessage.includes('soporte') || 
        normalizedMessage.includes('problema') || 
        normalizedMessage.includes('inconveniente')) {
      return 'support';
    }
    
    if (normalizedMessage.includes('business') || 
        normalizedMessage.includes('company') || 
        normalizedMessage.includes('partner') || 
        normalizedMessage.includes('enterprise') ||
        normalizedMessage.includes('negocio') || 
        normalizedMessage.includes('empresa') || 
        normalizedMessage.includes('socio') || 
        normalizedMessage.includes('comercial')) {
      return 'business';
    }
    
    if (normalizedMessage.includes('appointment') || 
        normalizedMessage.includes('schedule') || 
        normalizedMessage.includes('book') || 
        normalizedMessage.includes('meet') ||
        normalizedMessage.includes('cita') || 
        normalizedMessage.includes('agenda') || 
        normalizedMessage.includes('reservar') || 
        normalizedMessage.includes('reunión')) {
      return 'appointments';
    }
    
    return 'general';
  };

  // Function to get enhanced AI response
  const getEnhancedResponse = async (message: string, area: string): Promise<string> => {
    // First get response from existing knowledge base
    const baseResponse = findRelevantKnowledge(message, language === 'en' ? 'en' : 'es');
    
    // Enhance with business-specific context based on area
    let contextualData = {};
    switch (area) {
      case 'services':
        contextualData = await aiKnowledgeService.fetchData('general');
        break;
      case 'support':
        contextualData = await aiKnowledgeService.fetchData('client_search');
        break;
      case 'business':
        contextualData = await aiKnowledgeService.fetchData('business_metrics');
        break;
      case 'appointments':
        // This would connect to a scheduling system in a real implementation
        contextualData = { 
          availableSlots: [
            { date: '2023-08-15', time: '10:00 AM' },
            { date: '2023-08-16', time: '2:00 PM' },
            { date: '2023-08-17', time: '11:30 AM' }
          ]
        };
        break;
    }
    
    // For demonstration, we're using the base response
    // In a real implementation, we would combine the base response with
    // insights from the contextual data
    
    return baseResponse;
  };

  // Function to handle knowledge area selection
  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    
    // Add message to indicate area selection
    const areaMessage = language === 'en' 
      ? `I'll help you with ${getAreaName(area, 'en')}. What would you like to know?`
      : `Te ayudaré con ${getAreaName(area, 'es')}. ¿Qué te gustaría saber?`;
    
    setMessages(prev => [...prev, { text: areaMessage, sender: 'ai', category: area }]);
  };

  // Function to get area name in selected language
  const getAreaName = (area: string, lang: 'en' | 'es'): string => {
    switch (area) {
      case 'services':
        return lang === 'en' ? 'our services' : 'nuestros servicios';
      case 'support':
        return lang === 'en' ? 'support and troubleshooting' : 'soporte y solución de problemas';
      case 'business':
        return lang === 'en' ? 'business inquiries' : 'consultas de negocio';
      case 'appointments':
        return lang === 'en' ? 'scheduling appointments' : 'programación de citas';
      default:
        return lang === 'en' ? 'general information' : 'información general';
    }
  };

  // Get icon for category
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'services':
        return <Zap size={12} className="mr-1" />;
      case 'support':
        return <HelpCircle size={12} className="mr-1" />;
      case 'business':
        return <Briefcase size={12} className="mr-1" />;
      case 'appointments':
        return <Clock size={12} className="mr-1" />;
      case 'welcome':
        return <Bot size={12} className="mr-1" />;
      default:
        return <Brain size={12} className="mr-1" />;
    }
  };

  const createSupportTicket = () => {
    toast({
      title: language === 'en' ? "Support Ticket Created" : "Ticket de Soporte Creado",
      description: language === 'en' 
        ? "Your support ticket has been created. A representative will contact you within 24 hours." 
        : "Su ticket de soporte ha sido creado. Un representante se pondrá en contacto con usted dentro de las próximas 24 horas.",
    });
    
    // Add AI confirmation message
    setMessages(prev => [...prev, { 
      text: language === 'en' 
        ? "I've created a support ticket for you. A representative will contact you within 24 hours." 
        : "He creado un ticket de soporte para ti. Un representante se pondrá en contacto contigo dentro de las próximas 24 horas.",
      sender: 'ai',
      category: 'support'
    }]);
  };

  const openHelpCenter = () => {
    toast({
      title: language === 'en' ? "Help Center" : "Centro de Ayuda",
      description: language === 'en' 
        ? "Our online help center is being loaded with the most common questions and solutions." 
        : "Nuestro centro de ayuda en línea se está cargando con las preguntas y soluciones más comunes.",
    });
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
          {language === 'en' ? 'Connect With Our Enhanced AI Assistant' : 'Conéctate Con Nuestro Asistente IA Mejorado'}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Our advanced AI assistant is integrated with all our business systems. Get instant answers about our services, create support tickets, or request specialized assistance from our team.' 
            : 'Nuestro asistente de IA avanzado está integrado con todos nuestros sistemas de negocio. Obtenga respuestas instantáneas sobre nuestros servicios, cree tickets de soporte o solicite asistencia especializada de nuestro equipo.'}
        </p>
      </div>
      
      <Card className="shadow-lg border-guardian-100">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-lg flex items-center text-guardian-600">
            <Bot className="mr-2 h-5 w-5" />
            {language === 'en' ? 'Enhanced AI Business Assistant' : 'Asistente IA de Negocios Mejorado'}
          </CardTitle>
        </CardHeader>
        
        {/* Knowledge Area Selection */}
        <div className="px-4 py-2 bg-guardian-50/50 border-b flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-medium text-guardian-700 whitespace-nowrap">
            {language === 'en' ? 'I need help with:' : 'Necesito ayuda con:'}
          </span>
          {knowledgeAreas.map(area => (
            <Button
              key={area}
              variant={selectedArea === area ? "default" : "outline"}
              size="sm"
              className={`text-xs whitespace-nowrap ${selectedArea === area 
                ? 'bg-guardian-600 hover:bg-guardian-700' 
                : 'hover:bg-guardian-100'}`}
              onClick={() => handleAreaSelect(area)}
            >
              {getCategoryIcon(area)}
              {getAreaName(area, language === 'en' ? 'en' : 'es')}
            </Button>
          ))}
        </div>
        
        <CardContent className="p-4 h-96 overflow-y-auto flex flex-col space-y-4" ref={messageContainerRef}>
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
                    {getCategoryIcon(message.category)}
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
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={openHelpCenter}
        >
          <HelpCircle size={16} />
          <span>{language === 'en' ? 'Help Center' : 'Centro de Ayuda'}</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={createSupportTicket}
        >
          <MessageCircle size={16} />
          <span>{language === 'en' ? 'Create Support Ticket' : 'Crear Ticket de Soporte'}</span>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedAIGuardianSection;
