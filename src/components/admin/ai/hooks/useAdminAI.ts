
import { useState, useEffect } from "react";
import { Message } from "../types";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

export const useAdminAI = (currentSection?: string, onNavigate?: (section: string, params?: any) => void) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
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
      
      // Since we're not using Supabase anymore, we'll use a simple AI response simulation
      // In a real app, this would be replaced with a call to a real AI service or Firebase function
      setTimeout(() => {
        // Generate a simple response based on the user's message
        let aiResponse = "";
        const lowerCaseMessage = userMessage.toLowerCase();
        
        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
          aiResponse = language === 'en' 
            ? `Hello! How can I assist you with your administrative tasks today?` 
            : `¡Hola! ¿Cómo puedo ayudarte con tus tareas administrativas hoy?`;
        } 
        else if (lowerCaseMessage.includes("client") || lowerCaseMessage.includes("customer")) {
          aiResponse = language === 'en'
            ? `To manage clients, you can navigate to the Clients section in the sidebar. Would you like me to help you find specific client information?`
            : `Para administrar clientes, puedes navegar a la sección de Clientes en la barra lateral. ¿Te gustaría que te ayude a encontrar información de un cliente específico?`;
        }
        else if (lowerCaseMessage.includes("device") || lowerCaseMessage.includes("inventory")) {
          aiResponse = language === 'en'
            ? `For device management and inventory, check the Devices section. You can monitor status, schedule maintenance, and check inventory levels there.`
            : `Para la gestión de dispositivos e inventario, revisa la sección Dispositivos. Allí puedes monitorear el estado, programar mantenimiento y verificar los niveles de inventario.`;
        }
        else if (lowerCaseMessage.includes("dashboard") || lowerCaseMessage.includes("overview")) {
          aiResponse = language === 'en'
            ? `The dashboard provides an overview of key metrics, recent activities, and system status. You can access it by clicking on Dashboard in the sidebar.`
            : `El panel principal proporciona una visión general de métricas clave, actividades recientes y estado del sistema. Puedes acceder a él haciendo clic en Panel en la barra lateral.`;
        }
        else {
          aiResponse = language === 'en'
            ? `I understand you're asking about "${userMessage}". As an administrative assistant, I can help with client management, device monitoring, inventory tracking, and business metrics. Could you please provide more details about what you need?`
            : `Entiendo que estás preguntando sobre "${userMessage}". Como asistente administrativo, puedo ayudarte con la gestión de clientes, monitoreo de dispositivos, seguimiento de inventario y métricas de negocio. ¿Podrías proporcionar más detalles sobre lo que necesitas?`;
        }
        
        // Replace thinking message with response
        setMessages(prev => {
          const newMessages = [...prev];
          // Remove the thinking message
          newMessages.pop();
          
          // Add the AI response
          newMessages.push({ text: aiResponse, sender: 'ai' });
          return newMessages;
        });
        
        // Check for navigation intent
        if ((lowerCaseMessage.includes("go to") || lowerCaseMessage.includes("navigate to")) && onNavigate) {
          // Simple navigation detection
          const navigationMap: Record<string, string> = {
            'dashboard': 'dashboard',
            'clients': 'clients',
            'devices': 'devices',
            'inventory': 'inventory',
            'users': 'admin-users',
            'alerts': 'alerts'
          };
          
          for (const [key, value] of Object.entries(navigationMap)) {
            if (lowerCaseMessage.includes(key.toLowerCase())) {
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
        
        setIsProcessing(false);
      }, 1500); // Simulated response delay
      
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
