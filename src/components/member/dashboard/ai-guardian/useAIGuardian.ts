
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { KNOWLEDGE_BASE } from './constants';

export const useAIGuardian = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{text: string, type: 'guardian' | 'user'}>>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [input, setInput] = useState(""); 
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Initialize the chat with a greeting message
  useEffect(() => {
    const greeting = language === 'en' 
      ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your AI Guardian. How can I assist you today?` 
      : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu Guardian AI. ¿Cómo puedo ayudarte hoy?`;
    
    setMessages([{ text: greeting, type: 'guardian' }]);
  }, [language, user]);

  const handleStartInteraction = () => {
    setIsInteracting(true);
    setShowWelcome(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    responseFromKnowledgeBase(topic);
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {text: message, type: 'user'}]);
    setIsLoading(true);
    setShowWelcome(false);
    setIsInteracting(true);
    
    // Process user query
    setTimeout(() => {
      processUserQuery(message);
      setIsLoading(false);
    }, 1000); // Simulate AI processing time
  };
  
  const processUserQuery = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    let topic = null;
    
    // Determine the topic based on keywords in the query
    if (lowercaseQuery.includes('glucose') || lowercaseQuery.includes('blood') || lowercaseQuery.includes('health') || 
        lowercaseQuery.includes('glucosa') || lowercaseQuery.includes('sangre') || lowercaseQuery.includes('salud')) {
      topic = 'health';
    } 
    else if (lowercaseQuery.includes('setup') || lowercaseQuery.includes('device') || lowercaseQuery.includes('monitor') || 
             lowercaseQuery.includes('pendant') || lowercaseQuery.includes('configurar') || lowercaseQuery.includes('dispositivo')) {
      topic = 'devices';
    } 
    else if (lowercaseQuery.includes('medication') || lowercaseQuery.includes('medicine') || lowercaseQuery.includes('pill') || 
             lowercaseQuery.includes('medicamento') || lowercaseQuery.includes('medicina') || lowercaseQuery.includes('pastilla')) {
      topic = 'medications';
    } 
    
    if (topic) {
      setSelectedTopic(topic);
      responseFromKnowledgeBase(topic);
    } else {
      // General response if no specific topic is identified
      const generalResponses = {
        en: [
          "I can help you with health monitoring, device setup, or medication management. What would you like to know about?",
          "I'm here to assist with your health data, device configuration, or medication schedule. How can I help today?",
          "Feel free to ask me about your health metrics, how to set up your devices, or about your medications."
        ],
        es: [
          "Puedo ayudarte con el monitoreo de salud, configuración de dispositivos o gestión de medicamentos. ¿Sobre qué te gustaría saber?",
          "Estoy aquí para ayudarte con tus datos de salud, configuración de dispositivos o horario de medicamentos. ¿Cómo puedo ayudarte hoy?",
          "No dudes en preguntarme sobre tus métricas de salud, cómo configurar tus dispositivos o sobre tus medicamentos."
        ]
      };
      
      const randomIndex = Math.floor(Math.random() * generalResponses[language === 'en' ? 'en' : 'es'].length);
      const responseText = generalResponses[language === 'en' ? 'en' : 'es'][randomIndex];
      
      setMessages(prev => [...prev, {text: responseText, type: 'guardian'}]);
    }
  };
  
  const responseFromKnowledgeBase = (topic: string) => {
    const topicResponses = KNOWLEDGE_BASE[topic as keyof typeof KNOWLEDGE_BASE][language === 'en' ? 'en' : 'es'];
    const randomIndex = Math.floor(Math.random() * topicResponses.length);
    const responseText = topicResponses[randomIndex];
    
    setMessages(prev => [...prev, {text: responseText, type: 'guardian'}]);
  };

  return {
    messages,
    selectedTopic,
    setSelectedTopic,
    sendMessage,
    isLoading,
    showWelcome,
    input,
    setInput,
    isInteracting,
    handleStartInteraction,
    handleSubmit,
    handleTopicSelect
  };
};
