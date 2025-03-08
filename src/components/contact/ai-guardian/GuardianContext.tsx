
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { findRelevantKnowledge } from "@/data/ai-knowledge-base";
import { aiKnowledgeService } from "@/services/ai/AIKnowledgeService";
import { toast } from "@/components/ui/use-toast";

export type MessageType = {
  text: string;
  sender: 'user' | 'ai';
  category?: string;
};

export type KnowledgeAreaType = 'services' | 'support' | 'business' | 'appointments' | 'general';

interface GuardianContextType {
  messages: MessageType[];
  isLoading: boolean;
  selectedArea: string | null;
  sendMessage: (message: string) => Promise<void>;
  handleAreaSelect: (area: string) => void;
  createSupportTicket: () => void;
  openHelpCenter: () => void;
}

const GuardianContext = createContext<GuardianContextType | undefined>(undefined);

export const GuardianProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      text: language === 'en' 
        ? "Hello! I'm ICE AI Guardian, your integrated business assistant. I can help with service inquiries, connect you with specialized departments, or help you navigate our organization. How can I assist you today?"
        : "¡Hola! Soy ICE AI Guardian, tu asistente de negocio integrado. Puedo ayudarte con consultas sobre servicios, conectarte con departamentos especializados o ayudarte a navegar por nuestra organización. ¿Cómo puedo ayudarte hoy?",
      sender: 'ai',
      category: 'welcome'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Function to determine knowledge area based on message content
  const determineKnowledgeArea = (message: string): KnowledgeAreaType => {
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

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);
    
    try {
      // Determine the knowledge area if not already selected
      const area = selectedArea || determineKnowledgeArea(userMessage);
      if (!selectedArea) {
        setSelectedArea(area);
      }
      
      // Get AI response
      const aiResponse = await getEnhancedResponse(userMessage, area);
      
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
    }
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
    <GuardianContext.Provider 
      value={{ 
        messages, 
        isLoading, 
        selectedArea, 
        sendMessage, 
        handleAreaSelect,
        createSupportTicket,
        openHelpCenter
      }}
    >
      {children}
    </GuardianContext.Provider>
  );
};

export const useGuardian = () => {
  const context = useContext(GuardianContext);
  if (context === undefined) {
    throw new Error('useGuardian must be used within a GuardianProvider');
  }
  return context;
};
