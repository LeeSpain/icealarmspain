
import { useState, useEffect } from "react";
import { Message } from "../types";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";
import { createClient } from "@supabase/supabase-js";

export const useAdminAI = (currentSection?: string, onNavigate?: (section: string, params?: any) => void) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );
  
  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = language === 'en' 
        ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your administrative AI assistant. I can help you manage clients, check on device status, analyze business metrics, and more. How can I assist you today?`
        : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu asistente de IA administrativo. Puedo ayudarte a gestionar clientes, verificar el estado de dispositivos, analizar métricas de negocio y más. ¿Cómo puedo ayudarte hoy?`;
      
      setMessages([{ text: welcomeMessage, sender: 'ai' }]);
    }
  }, [user?.name, language, messages.length]);

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

  return {
    messages,
    input,
    setInput,
    isProcessing,
    handleSubmit
  };
};
