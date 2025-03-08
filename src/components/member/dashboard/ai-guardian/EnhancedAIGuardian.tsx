import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Send, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import MessagesList from "./MessagesList";
import TopicSelector from "./TopicSelector";
import { toast } from "react-toastify";
import { aiKnowledgeService } from "@/services/ai/AIKnowledgeService";

interface EnhancedAIGuardianProps {
  // Interface with existing systems
  initialTopic?: string;
  onNavigate?: (route: string, params?: any) => void;
  className?: string;
}

const EnhancedAIGuardian: React.FC<EnhancedAIGuardianProps> = ({
  initialTopic,
  onNavigate,
  className = ""
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{text: string, type: 'guardian' | 'user'}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(initialTopic || null);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = language === 'en' 
        ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your AI Health Guardian. How can I assist you today?` 
        : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu Guardián de Salud IA. ¿Cómo puedo ayudarte hoy?`;
      
      setMessages([{ text: greeting, type: 'guardian' }]);
    }
  }, [user?.name, language, messages.length]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Handle topic selection
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    
    // Add visual indication that topic was selected
    setMessages(prev => [
      ...prev, 
      { 
        text: language === 'en' 
          ? `I'll help you with ${topic}.` 
          : `Te ayudaré con ${topic}.`, 
        type: 'guardian' 
      }
    ]);
    
    setShowWelcome(false);
  };
  
  // Process and send user message
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, type: 'user' }]);
    setInput("");
    setIsLoading(true);
    setShowWelcome(false);
    
    try {
      // First, show "thinking" message
      setMessages(prev => [
        ...prev, 
        { 
          text: language === 'en' ? "Thinking..." : "Pensando...", 
          type: 'guardian' 
        }
      ]);
      
      // Determine context from message and selected topic
      const contextType = determineContextType(userMessage, selectedTopic);
      
      // Fetch relevant data if needed
      let dataContext = {};
      if (contextType !== 'general') {
        const aiQueryType = mapContextTypeToAIQueryType(contextType);
        dataContext = await aiKnowledgeService.fetchData(aiQueryType, { 
          user,
          searchTerm: userMessage
        });
      }
      
      // Generate response based on context
      const responseText = generateResponse(contextType, userMessage, dataContext);
      
      // Replace "thinking" message with actual response
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop(); // Remove "thinking" message
        newMessages.push({ text: responseText, type: 'guardian' });
        return newMessages;
      });
      
      // Check if message contains action request (e.g., "show me my health data")
      const actionRequest = detectActionRequest(userMessage);
      if (actionRequest && onNavigate) {
        setTimeout(() => {
          // Add navigation message
          setMessages(prev => [
            ...prev, 
            { 
              text: language === 'en' 
                ? `Let me take you to ${actionRequest.label}.` 
                : `Déjame llevarte a ${actionRequest.label}.`, 
              type: 'guardian' 
            }
          ]);
          
          // Perform navigation after a short delay
          setTimeout(() => {
            onNavigate(actionRequest.route, actionRequest.params);
          }, 1000);
        }, 1500);
      }
      
    } catch (error) {
      console.error("Error processing message:", error);
      
      // Replace "thinking" message with error message
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop(); // Remove "thinking" message
        newMessages.push({ 
          text: language === 'en' 
            ? "I'm sorry, I encountered an error. Please try again." 
            : "Lo siento, encontré un error. Por favor, inténtalo de nuevo.", 
          type: 'guardian' 
        });
        return newMessages;
      });
      
      toast.error(language === 'en' 
        ? "Error processing your request" 
        : "Error al procesar tu solicitud");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Determine context type from message and selected topic
  const determineContextType = (message: string, topic: string | null): string => {
    const normalizedMessage = message.toLowerCase();
    
    // If a topic is already selected, prioritize that
    if (topic) return topic;
    
    // Otherwise, try to determine from message content
    if (normalizedMessage.includes('health') || normalizedMessage.includes('medical') || 
        normalizedMessage.includes('salud') || normalizedMessage.includes('médico')) {
      return 'health';
    }
    
    if (normalizedMessage.includes('device') || normalizedMessage.includes('pendant') || 
        normalizedMessage.includes('monitor') || normalizedMessage.includes('dispositivo')) {
      return 'devices';
    }
    
    if (normalizedMessage.includes('medication') || normalizedMessage.includes('medicine') || 
        normalizedMessage.includes('pill') || normalizedMessage.includes('medicamento')) {
      return 'medications';
    }
    
    if (normalizedMessage.includes('emergency') || normalizedMessage.includes('help') || 
        normalizedMessage.includes('emergencia') || normalizedMessage.includes('ayuda')) {
      return 'emergency';
    }
    
    return 'general';
  };
  
  // Map context type to AI query type
  const mapContextTypeToAIQueryType = (contextType: string) => {
    switch (contextType) {
      case 'health':
        return 'business_metrics'; // We would create a proper health data type in production
      case 'devices':
        return 'device_status';
      case 'medications':
        return 'general'; // We would create a proper medications type in production
      case 'emergency':
        return 'alerts';
      default:
        return 'general';
    }
  };
  
  // Generate response based on context type
  const generateResponse = (contextType: string, message: string, data: any): string => {
    switch (contextType) {
      case 'health':
        return language === 'en'
          ? "Based on your health data, your vital signs have been stable over the past week. Your last glucose reading was 120 mg/dL, which is within your target range. Would you like me to show your detailed health dashboard?"
          : "Según tus datos de salud, tus signos vitales han estado estables durante la última semana. Tu última lectura de glucosa fue de 120 mg/dL, lo cual está dentro de tu rango objetivo. ¿Te gustaría que te mostrara tu panel de salud detallado?";
        
      case 'devices':
        return language === 'en'
          ? "Your devices are all functioning normally. The SOS Pendant battery is at 85%, and the Glucose Monitor was last synced 2 hours ago. Is there a specific device you'd like to know more about?"
          : "Todos tus dispositivos están funcionando normalmente. La batería del Colgante SOS está al 85%, y el Monitor de Glucosa se sincronizó por última vez hace 2 horas. ¿Hay algún dispositivo específico sobre el que te gustaría saber más?";
        
      case 'medications':
        return language === 'en'
          ? "You have 3 medications scheduled for today. Your next dose is Metformin (500mg) at 2:00 PM. Would you like me to show your complete medication schedule?"
          : "Tienes 3 medicamentos programados para hoy. Tu próxima dosis es Metformina (500mg) a las 2:00 PM. ¿Te gustaría que te mostrara tu horario completo de medicamentos?";
        
      case 'emergency':
        return language === 'en'
          ? "If you're experiencing an emergency, please press the SOS button on your pendant or use the emergency button on your dashboard. Would you like me to connect you with emergency services?"
          : "Si estás experimentando una emergencia, por favor presiona el botón SOS en tu colgante o usa el botón de emergencia en tu panel. ¿Te gustaría que te conectara con servicios de emergencia?";
        
      default:
        return language === 'en'
          ? "I'm here to help you manage your health and wellness. You can ask me about your health data, devices, medications, or emergency services. How can I assist you today?"
          : "Estoy aquí para ayudarte a gestionar tu salud y bienestar. Puedes preguntarme sobre tus datos de salud, dispositivos, medicamentos o servicios de emergencia. ¿Cómo puedo ayudarte hoy?";
    }
  };
  
  // Detect action requests in user messages
  const detectActionRequest = (message: string): { route: string, params?: any, label: string } | null => {
    const normalizedMessage = message.toLowerCase();
    
    // Check for navigation intent keywords
    const hasNavigationIntent = normalizedMessage.includes('show me') || 
                               normalizedMessage.includes('take me to') || 
                               normalizedMessage.includes('open') ||
                               normalizedMessage.includes('go to') ||
                               normalizedMessage.includes('muéstrame') ||
                               normalizedMessage.includes('llévame a') ||
                               normalizedMessage.includes('abrir') ||
                               normalizedMessage.includes('ir a');
    
    if (!hasNavigationIntent) return null;
    
    // Check for specific destinations
    if (normalizedMessage.includes('health') || normalizedMessage.includes('salud')) {
      return { route: '/dashboard/health-metrics', label: language === 'en' ? 'Health Dashboard' : 'Panel de Salud' };
    }
    
    if (normalizedMessage.includes('device') || normalizedMessage.includes('dispositivo')) {
      return { route: '/dashboard/devices', label: language === 'en' ? 'Devices Dashboard' : 'Panel de Dispositivos' };
    }
    
    if (normalizedMessage.includes('medication') || normalizedMessage.includes('medicamento')) {
      return { route: '/dashboard/medications', label: language === 'en' ? 'Medications Dashboard' : 'Panel de Medicamentos' };
    }
    
    if (normalizedMessage.includes('emergency') || normalizedMessage.includes('emergencia')) {
      return { route: '/dashboard/emergency', label: language === 'en' ? 'Emergency Services' : 'Servicios de Emergencia' };
    }
    
    return null;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  return (
    <Card className={`shadow-md overflow-hidden ${className}`}>
      <CardHeader className="bg-guardian-50 py-3">
        <CardTitle className="flex items-center text-lg font-medium">
          <Brain className="text-guardian-500 mr-2 h-5 w-5" />
          {language === 'en' ? 'AI Health Guardian' : 'Guardián de Salud IA'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {showWelcome ? (
          <div className="text-center py-6">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-guardian-100 mb-4">
              <Sparkles className="h-8 w-8 text-guardian-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {language === 'en' ? 'AI Health Guardian' : 'Guardián de Salud IA'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Your personal health assistant powered by AI. Get help with health monitoring, device management, and more.' 
                : 'Tu asistente de salud personal impulsado por IA. Obtén ayuda con monitoreo de salud, gestión de dispositivos y más.'}
            </p>
            <Button 
              onClick={() => setShowWelcome(false)}
              className="bg-guardian-500 hover:bg-guardian-600"
            >
              {language === 'en' ? 'Start Conversation' : 'Iniciar Conversación'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div 
              className="h-48 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-md"
              ref={messagesContainerRef}
            >
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
                      <Brain className="h-4 w-4 mt-0.5 text-guardian-600 flex-shrink-0" />
                    )}
                    <p className="text-sm">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <TopicSelector 
              selectedTopic={selectedTopic} 
              onSelectTopic={handleTopicSelect} 
            />
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-guardian-500 hover:bg-guardian-600"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-guardian-50/50 py-2 px-4 text-xs text-muted-foreground">
        <div className="flex items-center w-full justify-between">
          <span>
            {language === 'en' ? 'Powered by ICE Alarm AI' : 'Desarrollado por ICE Alarm AI'}
          </span>
          <Button 
            variant="link" 
            size="sm" 
            className="text-xs p-0 h-auto text-guardian-600"
            onClick={() => {
              toast.info(
                language === 'en' 
                  ? "You can ask about your health metrics, devices, or medications" 
                  : "Puedes preguntar sobre tus métricas de salud, dispositivos o medicamentos"
              );
            }}
          >
            {language === 'en' ? 'Help Topics' : 'Temas de Ayuda'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedAIGuardian;
