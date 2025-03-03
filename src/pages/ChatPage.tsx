
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle, Send, UserCircle, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  read: boolean;
}

interface ChatSession {
  id: string;
  agentName: string;
  status: 'active' | 'closed';
  lastActive: Date;
  messages: Message[];
}

const ChatPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for chat functionality
  const [message, setMessage] = useState('');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simulated data for demonstration
  useEffect(() => {
    // Simulate loading chat history from a database
    const mockChatSessions: ChatSession[] = [
      {
        id: 'session-1',
        agentName: 'María García',
        status: 'active',
        lastActive: new Date(),
        messages: [
          {
            id: 'msg-1',
            text: language === 'en' 
              ? 'Hello! How can I help you today?' 
              : '¡Hola! ¿Cómo puedo ayudarte hoy?',
            sender: 'agent',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            read: true
          },
          {
            id: 'msg-2',
            text: language === 'en' 
              ? 'I need help with my SOS pendant. It\'s not connecting properly.' 
              : 'Necesito ayuda con mi colgante SOS. No se está conectando correctamente.',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            read: true
          },
          {
            id: 'msg-3',
            text: language === 'en' 
              ? 'I understand. Let\'s troubleshoot the device. First, is the pendant charged?' 
              : 'Entiendo. Vamos a solucionar el dispositivo. Primero, ¿está cargado el colgante?',
            sender: 'agent',
            timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
            read: true
          }
        ]
      },
      {
        id: 'session-2',
        agentName: 'Carlos Rodríguez',
        status: 'closed',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        messages: [
          {
            id: 'msg-4',
            text: language === 'en' 
              ? 'Hello, I\'m Carlos from technical support. How can I assist you?' 
              : 'Hola, soy Carlos de soporte técnico. ¿Cómo puedo ayudarte?',
            sender: 'agent',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 30), // 3 days and 30 minutes ago
            read: true
          },
          {
            id: 'msg-5',
            text: language === 'en' 
              ? 'My medication dispenser is showing an error code E04. What does that mean?' 
              : 'Mi dispensador de medicamentos muestra un código de error E04. ¿Qué significa eso?',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 25), // 3 days and 25 minutes ago
            read: true
          },
          {
            id: 'msg-6',
            text: language === 'en' 
              ? 'Error E04 indicates a jammed mechanism. Let me guide you through the reset process.' 
              : 'El error E04 indica un mecanismo atascado. Permítame guiarlo a través del proceso de reinicio.',
            sender: 'agent',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 20), // 3 days and 20 minutes ago
            read: true
          },
          {
            id: 'msg-7',
            text: language === 'en' 
              ? 'Thanks, that worked! The dispenser is working fine now.' 
              : '¡Gracias, funcionó! El dispensador está funcionando bien ahora.',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 15), // 3 days and 15 minutes ago
            read: true
          },
          {
            id: 'msg-8',
            text: language === 'en' 
              ? 'Great! Is there anything else I can help you with?' 
              : '¡Excelente! ¿Hay algo más en lo que pueda ayudarte?',
            sender: 'agent',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 10), // 3 days and 10 minutes ago
            read: true
          },
          {
            id: 'msg-9',
            text: language === 'en' 
              ? 'No, that\'s all. Thank you for your help!' 
              : 'No, eso es todo. ¡Gracias por tu ayuda!',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 5), // 3 days and 5 minutes ago
            read: true
          }
        ]
      }
    ];
    
    setChatSessions(mockChatSessions);
    setCurrentSessionId(mockChatSessions[0].id);
  }, [language]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSessionId, chatSessions]);
  
  // Get current chat session
  const currentSession = chatSessions.find(session => session.id === currentSessionId) || null;
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!message.trim() || !currentSessionId) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: `msg-${Date.now()}-user`,
      text: message,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };
    
    setChatSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, newUserMessage] }
          : session
      )
    );
    
    setMessage('');
    
    // Simulate agent response after a delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: `msg-${Date.now()}-agent`,
        text: language === 'en'
          ? 'Thank you for your message. An agent will respond shortly. How else can I assist you today?'
          : 'Gracias por su mensaje. Un agente responderá en breve. ¿En qué más puedo ayudarte hoy?',
        sender: 'agent',
        timestamp: new Date(),
        read: true
      };
      
      setChatSessions(prevSessions => 
        prevSessions.map(session => 
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, agentResponse] }
            : session
        )
      );
    }, 1500);
  };
  
  // Format date for display
  const formatMessageTime = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Format date for session list
  const formatSessionDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return language === 'en' ? 'Today' : 'Hoy';
    } else if (diffDays === 1) {
      return language === 'en' ? 'Yesterday' : 'Ayer';
    } else if (diffDays < 7) {
      return language === 'en' 
        ? `${diffDays} days ago` 
        : `Hace ${diffDays} días`;
    } else {
      return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-ES', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };
  
  // Create a new chat session
  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      agentName: language === 'en' ? 'Support Team' : 'Equipo de Soporte',
      status: 'active',
      lastActive: new Date(),
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          text: language === 'en' 
            ? 'Welcome to GuardianAssist support. How can we help you today?' 
            : 'Bienvenido al soporte de GuardianAssist. ¿Cómo podemos ayudarte hoy?',
          sender: 'agent',
          timestamp: new Date(),
          read: true
        }
      ]
    };
    
    setChatSessions([newSession, ...chatSessions]);
    setCurrentSessionId(newSession.id);
    
    toast.success(
      language === 'en' 
        ? 'New chat session started' 
        : 'Nueva sesión de chat iniciada'
    );
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="chat"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-hidden transition-all duration-300">
        <div className="h-full flex flex-col">
          <ToastContainer />
          
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-ice-800">
              {language === 'en' ? 'Support Chat' : 'Chat de Soporte'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Connect with our support team for assistance' 
                : 'Conéctate con nuestro equipo de soporte para recibir asistencia'}
            </p>
          </div>
          
          <div className="flex-1 overflow-hidden flex">
            {/* Chat Sessions List */}
            <div className="w-80 border-r bg-white overflow-y-auto">
              <div className="p-4 border-b">
                <Button 
                  className="w-full bg-ice-600 hover:bg-ice-700" 
                  onClick={handleNewChat}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'New Conversation' : 'Nueva Conversación'}
                </Button>
              </div>
              
              <div className="divide-y">
                {chatSessions.map(session => (
                  <div 
                    key={session.id}
                    className={`p-4 cursor-pointer hover:bg-ice-50 ${
                      currentSessionId === session.id ? 'bg-ice-100' : ''
                    }`}
                    onClick={() => setCurrentSessionId(session.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <UserCircle className="h-6 w-6 text-ice-600 mr-2" />
                        <span className="font-medium">{session.agentName}</span>
                      </div>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatSessionDate(session.lastActive)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {session.messages[session.messages.length - 1]?.text}
                    </p>
                    <div className="mt-1 flex justify-between items-center">
                      <span className={`text-xs ${
                        session.status === 'active' 
                          ? 'text-green-600' 
                          : 'text-slate-500'
                      }`}>
                        {session.status === 'active' 
                          ? (language === 'en' ? 'Active' : 'Activo') 
                          : (language === 'en' ? 'Closed' : 'Cerrado')}
                      </span>
                      <span className="text-xs text-slate-500">
                        {session.messages.length} {language === 'en' ? 'messages' : 'mensajes'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {currentSession ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white flex items-center">
                    <Avatar className="h-10 w-10 bg-ice-100 mr-3">
                      <AvatarFallback className="bg-ice-500 text-white">
                        {currentSession.agentName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-medium">{currentSession.agentName}</h2>
                      <p className="text-xs text-slate-500">
                        {currentSession.status === 'active' 
                          ? (language === 'en' ? 'Online - Typically replies within minutes' : 'En línea - Normalmente responde en minutos') 
                          : (language === 'en' ? 'Conversation closed' : 'Conversación cerrada')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    <div className="space-y-4">
                      {currentSession.messages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === 'user' 
                              ? 'bg-ice-600 text-white' 
                              : 'bg-white shadow'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                            <div className={`text-xs mt-1 text-right ${
                              msg.sender === 'user' ? 'text-ice-200' : 'text-slate-400'
                            }`}>
                              {formatMessageTime(msg.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex space-x-2">
                      <Input
                        placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button 
                        disabled={!message.trim()}
                        onClick={handleSendMessage}
                        className="bg-ice-600 hover:bg-ice-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-ice-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                      {language === 'en' ? 'No chat selected' : 'Ningún chat seleccionado'}
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {language === 'en' 
                        ? 'Select an existing conversation or start a new one to chat with our support team'
                        : 'Selecciona una conversación existente o inicia una nueva para chatear con nuestro equipo de soporte'}
                    </p>
                    <Button 
                      className="mt-4 bg-ice-600 hover:bg-ice-700" 
                      onClick={handleNewChat}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Start New Conversation' : 'Iniciar Nueva Conversación'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
