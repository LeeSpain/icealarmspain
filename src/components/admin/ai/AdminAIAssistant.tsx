
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Send, Brain, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

interface Message {
  text: string;
  sender: 'user' | 'ai';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );
  
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    const userMessage = input.trim();
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput("");
    setIsProcessing(true);
    
    try {
      // Add a thinking message
      setMessages(prev => [...prev, { 
        text: language === 'en' ? "Analyzing your request..." : "Analizando tu solicitud...", 
        sender: 'ai' 
      }]);
      
      // Call the Supabase edge function
      const systemMessage = `You are an administrative AI assistant for ICE Alarm España. The user's current dashboard section is: ${currentSection}. 
      Help with business metrics, client management, device monitoring, inventory, and alerts. 
      If you detect the user wants to navigate to a specific section, suggest it clearly.`;
      
      const { data, error } = await supabase.functions.invoke('admin-ai-assistant', {
        body: { prompt: userMessage, systemMessage }
      });
      
      if (error) throw error;
      
      // Replace thinking message with response
      setMessages(prev => {
        const newMessages = [...prev];
        // Remove the thinking message
        newMessages.pop();
        
        // Add the AI response
        newMessages.push({ text: data.response, sender: 'ai' });
        return newMessages;
      });
      
      // Check for navigation intent
      if (data.response.toLowerCase().includes('navigate to') && onNavigate) {
        // Simple navigation detection - could be improved
        const navigationMap: Record<string, string> = {
          'dashboard': 'dashboard',
          'clients': 'clients',
          'devices': 'devices',
          'inventory': 'inventory',
          'users': 'admin-users',
          'alerts': 'alerts'
        };
        
        for (const [key, value] of Object.entries(navigationMap)) {
          if (data.response.toLowerCase().includes(key.toLowerCase())) {
            // Ask user if they want to navigate
            toast.info(
              language === 'en'
                ? `Would you like to navigate to ${key}?`
                : `¿Te gustaría navegar a ${key}?`,
              {
                autoClose: 5000,
                closeButton: true,
                position: "bottom-right",
                onClick: () => {
                  onNavigate(value);
                  toast.success(
                    language === 'en'
                      ? `Navigated to ${key}`
                      : `Navegado a ${key}`
                  );
                }
              }
            );
            break;
          }
        }
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
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AdminAIAssistant;
