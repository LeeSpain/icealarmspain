
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, MessageSquare, Clock, Send, X, Paperclip, Smile, ArrowRight, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  read: boolean;
  isTyping?: boolean;
}

const SupportChatTab: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: language === 'en' 
        ? "Hello! How can I assist you today with ICE Alarm services?" 
        : "¡Hola! ¿Cómo puedo ayudarte hoy con los servicios de ICE Alarm?",
      sender: 'agent',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: true
    }
  ]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const connectToAgent = () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Add connection success message
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: language === 'en' 
          ? "You've been connected to a support agent. Please describe your issue." 
          : "Has sido conectado con un agente de soporte. Por favor, describe tu problema.",
        sender: 'agent',
        timestamp: new Date(),
        read: true
      }]);
    }, 2000);
  };
  
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    
    // Show agent typing indicator
    setTimeout(() => {
      setIsTyping(true);
      
      // After a delay, add the agent response
      setTimeout(() => {
        setIsTyping(false);
        
        // Simulate agent response
        const responses = [
          language === 'en' ? "Thank you for providing that information. Let me check your account." : "Gracias por proporcionar esa información. Déjame verificar tu cuenta.",
          language === 'en' ? "I understand your concern. Let me help you resolve this issue." : "Entiendo tu preocupación. Permíteme ayudarte a resolver este problema.",
          language === 'en' ? "I see the issue now. We'll need to update your device settings." : "Ahora veo el problema. Necesitaremos actualizar la configuración de tu dispositivo."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: randomResponse,
          sender: 'agent',
          timestamp: new Date(),
          read: true
        }]);
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-[75vh]">
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <MessageSquare size={64} className="text-ice-300 mb-6" />
          <h3 className="text-xl font-medium text-gray-700 mb-3">
            {language === 'en' ? 'Customer Support Chat' : 'Chat de Atención al Cliente'}
          </h3>
          <p className="text-gray-500 max-w-md mb-8">
            {language === 'en' 
              ? 'Connect with a live agent to get help with your devices, account, or any questions you might have.'
              : 'Conéctate con un agente en vivo para obtener ayuda con tus dispositivos, cuenta o cualquier pregunta que puedas tener.'}
          </p>
          
          <Button 
            className="bg-ice-600 hover:bg-ice-700 text-white min-w-[200px]"
            onClick={connectToAgent}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Clock className="h-4 w-4 animate-spin mr-2" />
                {language === 'en' ? 'Connecting...' : 'Conectando...'}
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Connect to Support' : 'Conectar con Soporte'}
              </>
            )}
          </Button>
          
          <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
            <AlertCircle size={14} />
            <span>
              {language === 'en' 
                ? 'Average wait time: 2-5 minutes' 
                : 'Tiempo de espera promedio: 2-5 minutos'}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium">
                  {language === 'en' ? 'Customer Support' : 'Atención al Cliente'}
                </h3>
                <div className="flex items-center text-xs gap-1 text-green-600">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span>{language === 'en' ? 'Online' : 'En línea'}</span>
                </div>
              </div>
            </div>
            
            <Badge variant="outline" className="bg-ice-50 py-1 gap-1">
              <MessageSquare size={12} />
              <span>{language === 'en' ? 'Open ticket' : 'Ticket abierto'}</span>
            </Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {message.sender === 'agent' && (
                    <Avatar className="flex-shrink-0 mt-1">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                  )}
                  
                  {message.sender === 'user' && (
                    <Avatar className="flex-shrink-0 mt-1">
                      <AvatarImage src={user?.photoURL || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-ice-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.text}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="flex-shrink-0 mt-1">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="p-3 bg-gray-100 text-gray-800 rounded-lg flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {language === 'en' ? 'Typing...' : 'Escribiendo...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Paperclip size={18} />
              </Button>
              
              <Input 
                placeholder={language === 'en' ? "Type your message here..." : "Escribe tu mensaje aquí..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              
              <Button 
                className="bg-ice-600 hover:bg-ice-700 rounded-full w-10 h-10 p-0"
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SupportChatTab;
