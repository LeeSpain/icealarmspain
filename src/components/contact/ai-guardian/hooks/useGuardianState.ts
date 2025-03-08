
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { MessageType, KnowledgeAreaType } from "../types";
import { determineKnowledgeArea, getAreaName } from "../utils/knowledgeAreaUtils";
import { getEnhancedResponse } from "../services/aiResponseService";

export const useGuardianState = (language: 'en' | 'es') => {
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
      const aiResponse = await getEnhancedResponse(userMessage, area, language);
      
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

  return {
    messages,
    isLoading,
    selectedArea,
    sendMessage,
    handleAreaSelect,
    createSupportTicket,
    openHelpCenter
  };
};
