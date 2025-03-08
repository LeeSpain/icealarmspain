
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Send, Brain, Search, Zap, User, Package, Bell, ClipboardList } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { aiKnowledgeService, AIQueryType, AIQueryContext } from "@/services/ai/AIKnowledgeService";

interface Message {
  text: string;
  sender: 'user' | 'ai';
  data?: any;
}

interface AdminAIAssistantProps {
  currentSection?: string;
  onNavigate?: (section: string, params?: any) => void;
}

const AdminAIAssistant: React.FC<AdminAIAssistantProps> = ({ 
  currentSection, 
  onNavigate 
}) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryType, setQueryType] = useState<AIQueryType>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize with a welcome message
    if (messages.length === 0) {
      const welcomeMessage = language === 'en' 
        ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your administrative AI assistant. I can help you manage clients, check on device status, analyze business metrics, and more. How can I assist you today?`
        : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu asistente de IA administrativo. Puedo ayudarte a gestionar clientes, verificar el estado de dispositivos, analizar métricas de negocio y más. ¿Cómo puedo ayudarte hoy?`;
      
      setMessages([{ text: welcomeMessage, sender: 'ai' }]);
    }
  }, [user?.name, language, messages.length]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Process user query to determine the appropriate query type
  const determineQueryType = (query: string): AIQueryType => {
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery.includes('client') || normalizedQuery.includes('customer')) {
      if (normalizedQuery.includes('search') || normalizedQuery.includes('find')) {
        return 'client_search';
      } else if (normalizedQuery.includes('onboard') || normalizedQuery.includes('new')) {
        return 'client_onboarding';
      }
    }
    
    if (normalizedQuery.includes('metrics') || normalizedQuery.includes('stats') || 
        normalizedQuery.includes('business') || normalizedQuery.includes('performance')) {
      return 'business_metrics';
    }
    
    if (normalizedQuery.includes('device') || normalizedQuery.includes('pendant') || 
        normalizedQuery.includes('monitor') || normalizedQuery.includes('equipment')) {
      return 'device_status';
    }
    
    if (normalizedQuery.includes('user') || normalizedQuery.includes('admin') || 
        normalizedQuery.includes('staff') || normalizedQuery.includes('employee')) {
      return 'user_management';
    }
    
    if (normalizedQuery.includes('inventory') || normalizedQuery.includes('stock') || 
        normalizedQuery.includes('product')) {
      return 'inventory';
    }
    
    if (normalizedQuery.includes('alert') || normalizedQuery.includes('emergency') || 
        normalizedQuery.includes('notification')) {
      return 'alerts';
    }
    
    return 'general';
  };

  // Extract context from the query (e.g., search terms, date ranges)
  const extractContext = (query: string): AIQueryContext => {
    const context: AIQueryContext = { user };
    
    // Extract search terms
    const searchMatch = query.match(/(?:find|search|look for|about|named|called) (.+?)(?=\s|$|\?|\.)/i);
    if (searchMatch && searchMatch[1]) {
      context.searchTerm = searchMatch[1].trim();
    }
    
    // Extract client ID if present
    const clientIdMatch = query.match(/client (?:id|number|#) (\d+)/i);
    if (clientIdMatch && clientIdMatch[1]) {
      context.clientId = parseInt(clientIdMatch[1], 10);
    }
    
    // Extract device ID if present
    const deviceIdMatch = query.match(/device (?:id|number|#) ([a-zA-Z0-9-]+)/i);
    if (deviceIdMatch && deviceIdMatch[1]) {
      context.deviceId = deviceIdMatch[1];
    }
    
    // Set the current section as context
    if (currentSection) {
      context.section = currentSection;
    }
    
    return context;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    const userMessage = input.trim();
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput("");
    setIsProcessing(true);
    
    // Determine query type and extract context
    const detectedQueryType = determineQueryType(userMessage);
    setQueryType(detectedQueryType);
    const context = extractContext(userMessage);
    
    try {
      // Add a thinking message
      setMessages(prev => [...prev, { 
        text: language === 'en' ? "Analyzing your request..." : "Analizando tu solicitud...", 
        sender: 'ai' 
      }]);
      
      // Fetch relevant data
      const data = await aiKnowledgeService.fetchData(detectedQueryType, context);
      
      // Replace thinking message with response
      setMessages(prev => {
        const newMessages = [...prev];
        // Remove the thinking message
        newMessages.pop();
        
        // Generate appropriate response based on query type and data
        let responseText = generateResponse(detectedQueryType, data, language);
        
        // Add the AI response
        newMessages.push({ text: responseText, sender: 'ai', data });
        return newMessages;
      });
      
      // If navigation action is detected and onNavigate prop is provided
      const navigationAction = detectNavigationAction(userMessage, detectedQueryType);
      if (navigationAction && onNavigate) {
        onNavigate(navigationAction.section, navigationAction.params);
        toast.info(language === 'en' 
          ? `Navigating to ${navigationAction.section}` 
          : `Navegando a ${navigationAction.section}`);
      }
      
    } catch (error) {
      console.error("Error processing AI query:", error);
      
      // Replace thinking message with error message
      setMessages(prev => {
        const newMessages = [...prev];
        // Remove the thinking message
        newMessages.pop();
        
        // Add error message
        newMessages.push({ 
          text: language === 'en' 
            ? "I'm sorry, I encountered an error while processing your request. Please try again."
            : "Lo siento, encontré un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
          sender: 'ai' 
        });
        return newMessages;
      });
      
      toast.error(language === 'en' 
        ? "Error processing AI query" 
        : "Error al procesar la consulta de IA");
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate response text based on query type and data
  const generateResponse = (queryType: AIQueryType, data: any, lang: 'en' | 'es'): string => {
    switch (queryType) {
      case 'client_search':
        if (data.matchingClients && data.matchingClients.length > 0) {
          const clientList = data.matchingClients.map((c: any) => 
            `${c.name} (ID: ${c.id}, Status: ${c.status}, Devices: ${c.devices})`).join('\n- ');
          
          return lang === 'en'
            ? `I found the following clients matching your search:\n- ${clientList}\n\nWould you like more details on any of these clients?`
            : `Encontré los siguientes clientes que coinciden con tu búsqueda:\n- ${clientList}\n\n¿Te gustaría más detalles sobre alguno de estos clientes?`;
        } else {
          return lang === 'en'
            ? "I couldn't find any clients matching your search criteria. Would you like to try a different search term?"
            : "No pude encontrar clientes que coincidan con tu criterio de búsqueda. ¿Te gustaría probar con un término diferente?";
        }
        
      case 'business_metrics':
        return lang === 'en'
          ? `Here are the current business metrics:\n- Active Clients: ${data.activeClients}\n- New Clients: ${data.newClients}\n- Revenue Generated: ${data.revenueGenerated}\n- Active Devices: ${data.activeDevices}\n- Alerts Handled: ${data.alertsHandled}\n\nWould you like to see metrics for a specific time period?`
          : `Aquí están las métricas actuales del negocio:\n- Clientes Activos: ${data.activeClients}\n- Nuevos Clientes: ${data.newClients}\n- Ingresos Generados: ${data.revenueGenerated}\n- Dispositivos Activos: ${data.activeDevices}\n- Alertas Gestionadas: ${data.alertsHandled}\n\n¿Te gustaría ver métricas para un período específico?`;
        
      // Add more case handlers for other query types
      
      default:
        return lang === 'en'
          ? "I'm here to help you manage your business. You can ask me about clients, devices, business metrics, inventory, alerts, and more."
          : "Estoy aquí para ayudarte a gestionar tu negocio. Puedes preguntarme sobre clientes, dispositivos, métricas de negocio, inventario, alertas y más.";
    }
  };

  // Detect if the user wants to navigate to a specific section
  const detectNavigationAction = (query: string, queryType: AIQueryType): { section: string, params?: any } | null => {
    const normalizedQuery = query.toLowerCase();
    
    // Check for navigation intent keywords
    const hasNavigationIntent = normalizedQuery.includes('go to') || 
                                normalizedQuery.includes('show me') || 
                                normalizedQuery.includes('navigate to') ||
                                normalizedQuery.includes('open');
    
    if (!hasNavigationIntent) return null;
    
    // Map query types to dashboard sections
    switch (queryType) {
      case 'client_search':
        return { section: 'clients' };
      case 'business_metrics':
        return { section: 'dashboard' };
      case 'device_status':
        return { section: 'devices' };
      case 'user_management':
        return { section: 'admin-users' };
      case 'inventory':
        return { section: 'inventory' };
      case 'client_onboarding':
        return { section: 'client-onboarding' };
      case 'alerts':
        return { section: 'alerts' };
      default:
        return null;
    }
  };

  // Get icon for query type
  const getQueryTypeIcon = () => {
    switch (queryType) {
      case 'client_search':
        return <Search className="h-4 w-4" />;
      case 'business_metrics':
        return <Zap className="h-4 w-4" />;
      case 'device_status':
        return <Package className="h-4 w-4" />;
      case 'user_management':
        return <User className="h-4 w-4" />;
      case 'inventory':
        return <ClipboardList className="h-4 w-4" />;
      case 'alerts':
        return <Bell className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-md">
      <CardHeader className="bg-gradient-to-r from-ice-50 to-ice-100 py-3">
        <CardTitle className="flex items-center text-lg text-ice-900">
          <Bot className="text-ice-600 mr-2 h-5 w-5" />
          {language === 'en' ? 'Administrative AI Assistant' : 'Asistente de IA Administrativo'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, idx) => (
          <div 
            key={idx} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-ice-100 text-ice-900' 
                  : 'bg-white border border-ice-200 shadow-sm'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center mb-2 text-xs font-medium text-ice-500">
                  <Brain className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'Admin AI' : 'IA Admin'}
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              {message.data && message.sender === 'ai' && (
                <div className="mt-2 pt-2 border-t border-dashed border-ice-200 text-xs text-ice-500">
                  <div className="flex items-center">
                    {getQueryTypeIcon()}
                    <span className="ml-1 capitalize">{queryType.replace('_', ' ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isProcessing && (
          <div className="flex justify-center my-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-ice-100 p-3">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'en' 
              ? "Ask about clients, metrics, inventory, etc..." 
              : "Pregunta sobre clientes, métricas, inventario, etc..."}
            className="flex-1 resize-none h-10 py-2"
            disabled={isProcessing}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            variant="default"
            className="bg-ice-600 hover:bg-ice-700 h-10"
            disabled={isProcessing || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AdminAIAssistant;
