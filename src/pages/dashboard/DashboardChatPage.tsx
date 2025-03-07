
import React, { useState, useRef, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Brain } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIGuardianTile from "@/components/member/dashboard/ai-guardian/AIGuardianTile";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const DashboardChatPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? 'Hello! I am ICE Alarm\'s AI assistant. How can I help you today?' 
        : '¡Hola! Soy el asistente de IA de ICE Alarm. ¿Cómo puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageText('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = {
        en: [
          "I'll help you with that right away!",
          "Let me check that for you.",
          "I understand your concern. Here's what you can do...",
          "That's a great question! The answer is...",
          "I'm processing your request. One moment please."
        ],
        es: [
          "¡Te ayudaré con eso de inmediato!",
          "Déjame verificar eso para ti.",
          "Entiendo tu preocupación. Esto es lo que puedes hacer...",
          "¡Esa es una gran pregunta! La respuesta es...",
          "Estoy procesando tu solicitud. Un momento por favor."
        ]
      };
      
      const randomResponse = botResponses[language === 'en' ? 'en' : 'es'][
        Math.floor(Math.random() * botResponses[language === 'en' ? 'en' : 'es'].length)
      ];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-6 bg-white border-b">
          <h1 className="text-xl font-bold text-ice-800">
            {language === 'en' ? 'Chat Support' : 'Soporte por Chat'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language === 'en' 
              ? 'Get help from our AI assistant or contact a human agent' 
              : 'Obtén ayuda de nuestro asistente de IA o contacta con un agente humano'}
          </p>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col p-6">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="self-center mb-4">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{language === 'en' ? 'Chat Support' : 'Soporte por Chat'}</span>
              </TabsTrigger>
              <TabsTrigger value="guardian" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>{language === 'en' ? 'AI Guardian' : 'Guardian IA'}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
              <Card className="flex-1 overflow-hidden flex flex-col">
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex items-start gap-3 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-ice-100 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-5 w-5 text-ice-600" />
                          </div>
                        )}
                        
                        <div 
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.sender === 'user' 
                              ? 'bg-ice-600 text-white' 
                              : 'bg-ice-100 text-gray-800'
                          }`}
                        >
                          <p>{message.text}</p>
                          <div 
                            className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-ice-100' : 'text-gray-500'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        
                        {message.sender === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-ice-600 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                
                <div className="p-4 border-t">
                  <div className="flex gap-3">
                    <Input 
                      placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-ice-600 hover:bg-ice-700"
                      size="icon"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-3 text-center">
                    <Button variant="link" className="text-xs text-muted-foreground">
                      {language === 'en' 
                        ? 'Connect with a human agent' 
                        : 'Conectar con un agente humano'}
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="guardian" className="flex-1 mt-0">
              <Card className="flex-1 h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-guardian-600">
                    <Brain className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'AI Guardian' : 'Guardian IA'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AIGuardianTile />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardChatPage;
