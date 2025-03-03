
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Bot, ShieldCheck, Lightbulb, Activity, BellRing, PlusSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { getDevices } from "@/components/devices/deviceData";
import { NotificationType } from './notifications/types';

// Topics the AI can help with
const AI_TOPICS = {
  en: [
    { id: 'health', label: 'Health Data', icon: <Activity className="h-4 w-4" /> },
    { id: 'devices', label: 'Device Setup', icon: <BellRing className="h-4 w-4" /> },
    { id: 'medications', label: 'Medications', icon: <PlusSquare className="h-4 w-4" /> },
  ],
  es: [
    { id: 'health', label: 'Datos de Salud', icon: <Activity className="h-4 w-4" /> },
    { id: 'devices', label: 'Configuración de Dispositivos', icon: <BellRing className="h-4 w-4" /> },
    { id: 'medications', label: 'Medicamentos', icon: <PlusSquare className="h-4 w-4" /> },
  ]
};

// Knowledge base for the AI to reference
const KNOWLEDGE_BASE = {
  health: {
    en: [
      "Your blood pressure readings show a stable trend over the past month.",
      "Your glucose levels have been within the normal range during the last week.",
      "Remember to keep track of your daily water intake.",
      "Regular physical activity can help maintain healthy blood pressure."
    ],
    es: [
      "Sus lecturas de presión arterial muestran una tendencia estable durante el último mes.",
      "Sus niveles de glucosa han estado dentro del rango normal durante la última semana.",
      "Recuerde llevar un registro de su consumo diario de agua.",
      "La actividad física regular puede ayudar a mantener una presión arterial saludable."
    ]
  },
  devices: {
    en: [
      "To set up your SOS Pendant, press and hold the main button for 5 seconds until it flashes blue.",
      "The Glucose Monitor needs to be calibrated once every 14 days for accurate readings.",
      "For optimal performance, charge your devices overnight when battery is below 30%.",
      "Place the Medical Dispenser on a flat, stable surface away from direct sunlight."
    ],
    es: [
      "Para configurar su Colgante SOS, mantenga presionado el botón principal durante 5 segundos hasta que parpadee en azul.",
      "El Monitor de Glucosa debe calibrarse una vez cada 14 días para lecturas precisas.",
      "Para un rendimiento óptimo, cargue sus dispositivos durante la noche cuando la batería esté por debajo del 30%.",
      "Coloque el Dispensador Médico en una superficie plana y estable, alejada de la luz solar directa."
    ]
  },
  medications: {
    en: [
      "Your medication schedule has been updated based on your doctor's recent recommendations.",
      "It's important to take your medications at the same time each day for optimal effectiveness.",
      "Store your medications in a cool, dry place away from direct sunlight.",
      "If you experience any side effects, contact your healthcare provider immediately."
    ],
    es: [
      "Su horario de medicación ha sido actualizado según las recomendaciones recientes de su médico.",
      "Es importante tomar sus medicamentos a la misma hora cada día para una efectividad óptima.",
      "Guarde sus medicamentos en un lugar fresco y seco, alejado de la luz solar directa.",
      "Si experimenta algún efecto secundario, contacte a su proveedor de salud inmediatamente."
    ]
  }
};

const AIGuardianTile: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isInteracting, setIsInteracting] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, type: 'guardian' | 'user'}>>([]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const devices = getDevices(language);
  
  // Initialize the chat with a greeting message
  useEffect(() => {
    const greeting = language === 'en' 
      ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your AI Guardian. How can I assist you today?` 
      : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu Guardian AI. ¿Cómo puedo ayudarte hoy?`;
    
    setMessages([{ text: greeting, type: 'guardian' }]);
  }, [language, user]);
  
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
  
  const handleStartInteraction = () => {
    setIsInteracting(true);
    toast.info(
      language === 'en' 
        ? "AI Guardian activated. You can now chat with your health assistant." 
        : "Guardian AI activado. Ahora puedes chatear con tu asistente de salud."
    );
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg flex items-center text-guardian-600">
          <Brain className="mr-2 h-5 w-5" />
          {language === 'en' ? 'AI Guardian' : 'Guardian AI'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isInteracting ? (
          <div className="space-y-4">
            <div className="h-48 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-md" id="chat-container">
              {messages.map((message, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg ${
                    message.type === 'guardian' 
                      ? 'bg-guardian-50 border-l-4 border-guardian-500' 
                      : 'bg-ice-50 border-l-4 border-ice-500 ml-6'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'guardian' && (
                      <Bot className="h-4 w-4 mt-0.5 text-guardian-600 flex-shrink-0" />
                    )}
                    <p className="text-sm">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedTopic && (
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="font-medium text-guardian-600">
                  {language === 'en' ? 'Discussing:' : 'Discutiendo:'}
                </span>
                <span className="px-2 py-0.5 bg-guardian-100 text-guardian-700 rounded-full flex items-center">
                  {AI_TOPICS[language === 'en' ? 'en' : 'es'].find(t => t.id === selectedTopic)?.icon}
                  <span className="ml-1">
                    {AI_TOPICS[language === 'en' ? 'en' : 'es'].find(t => t.id === selectedTopic)?.label}
                  </span>
                </span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {AI_TOPICS[language === 'en' ? 'en' : 'es'].map(topic => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-md flex items-center"
                >
                  {topic.icon}
                  <span className="ml-1">{topic.label}</span>
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-guardian-500 hover:bg-guardian-600"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center space-y-4">
            <div className="p-3 bg-guardian-100 rounded-full">
              <ShieldCheck className="h-8 w-8 text-guardian-500" />
            </div>
            <div>
              <h3 className="font-medium text-lg">
                {language === 'en' ? 'Health Assistant' : 'Asistente de Salud'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'en' 
                  ? 'Your AI Guardian is monitoring your health data and can provide personalized insights.' 
                  : 'Tu Guardian AI está monitoreando tus datos de salud y puede proporcionar información personalizada.'}
              </p>
            </div>
            <Button 
              onClick={handleStartInteraction} 
              className="mt-2 bg-guardian-500 hover:bg-guardian-600"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Start interaction' : 'Iniciar interacción'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIGuardianTile;
