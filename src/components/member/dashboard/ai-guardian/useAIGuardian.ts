
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { KNOWLEDGE_BASE } from './constants';

export const useAIGuardian = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isInteracting, setIsInteracting] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, type: 'guardian' | 'user'}>>([]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Initialize the chat with a greeting message
  useEffect(() => {
    const greeting = language === 'en' 
      ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your AI Guardian. How can I assist you today?` 
      : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu Guardian AI. ¿Cómo puedo ayudarte hoy?`;
    
    setMessages([{ text: greeting, type: 'guardian' }]);
  }, [language, user]);

  const handleStartInteraction = () => {
    setIsInteracting(true);
    toast.info(
      language === 'en' 
        ? "AI Guardian activated. You can now chat with your health assistant." 
        : "Guardian AI activado. Ahora puedes chatear con tu asistente de salud."
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {text: input, type: 'user'}]);
    
    // Process user query
    processUserQuery(input);
    
    setInput("");
  };
  
  const processUserQuery = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    let responseText = '';
    
    // Determine the topic based on keywords in the query
    if (lowercaseQuery.includes('glucose') || lowercaseQuery.includes('blood') || lowercaseQuery.includes('health') || 
        lowercaseQuery.includes('glucosa') || lowercaseQuery.includes('sangre') || lowercaseQuery.includes('salud')) {
      responseFromKnowledgeBase('health');
    } 
    else if (lowercaseQuery.includes('setup') || lowercaseQuery.includes('device') || lowercaseQuery.includes('monitor') || 
             lowercaseQuery.includes('pendant') || lowercaseQuery.includes('configurar') || lowercaseQuery.includes('dispositivo')) {
      responseFromKnowledgeBase('devices');
    } 
    else if (lowercaseQuery.includes('medication') || lowercaseQuery.includes('medicine') || lowercaseQuery.includes('pill') || 
             lowercaseQuery.includes('medicamento') || lowercaseQuery.includes('medicina') || lowercaseQuery.includes('pastilla')) {
      responseFromKnowledgeBase('medications');
    } 
    else {
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
      responseText = generalResponses[language === 'en' ? 'en' : 'es'][randomIndex];
      
      setTimeout(() => {
        setMessages(prev => [...prev, {text: responseText, type: 'guardian'}]);
      }, 1000);
    }
  };
  
  const responseFromKnowledgeBase = (topic: string) => {
    const topicResponses = KNOWLEDGE_BASE[topic as keyof typeof KNOWLEDGE_BASE][language === 'en' ? 'en' : 'es'];
    const randomIndex = Math.floor(Math.random() * topicResponses.length);
    const responseText = topicResponses[randomIndex];
    
    setTimeout(() => {
      setMessages(prev => [...prev, {text: responseText, type: 'guardian'}]);
    }, 1000);
    
    setSelectedTopic(topic);
  };
  
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    responseFromKnowledgeBase(topic);
  };

  return {
    isInteracting,
    messages,
    input,
    selectedTopic,
    handleStartInteraction,
    handleSubmit,
    handleTopicSelect,
    setInput
  };
};
