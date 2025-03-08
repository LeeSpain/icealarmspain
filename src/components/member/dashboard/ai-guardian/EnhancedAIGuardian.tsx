import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Brain, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import MessagesList from './MessagesList';
import TopicSelector from './TopicSelector';
import { emergencyTopics, healthTopics, generalTopics } from './constants';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const EnhancedAIGuardian: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize with a welcome message
    if (messages.length === 0) {
      const welcomeMessage = language === 'en'
        ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your AI Guardian. I can assist you with health, emergencies, and general support. How can I help you today?`
        : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu Guardián de IA. Puedo ayudarte con salud, emergencias y soporte general. ¿Cómo puedo ayudarte hoy?`;

      setMessages([{ text: welcomeMessage, sender: 'ai' }]);
    }
  }, [user?.name, language, messages.length]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();

    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput("");
    setIsProcessing(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

      const aiResponse = language === 'en'
        ? `AI response to: ${userMessage} (Topic: ${selectedTopic || 'General'})`
        : `Respuesta de la IA a: ${userMessage} (Tema: ${selectedTopic || 'General'})`;

      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);

    } catch (error) {
      console.error("Error processing AI query:", error);
      toast.error(language === 'en'
        ? "Error processing AI query"
        : "Error al procesar la consulta de IA");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExpandToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleOpenToggle = () => {
    setIsOpen(prev => !prev);

    // Show welcome toast when opening
    if (!isOpen) {
      toast.info(
        language === 'en'
          ? "AI Guardian is ready to assist you."
          : "AI Guardian está listo para ayudarte.",
        {
          autoClose: 3000,
          position: "bottom-right",
        }
      );
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-ice-600 hover:bg-ice-700 z-50"
        onClick={handleOpenToggle}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isExpanded
        ? 'w-[80%] h-[80%] max-w-4xl bottom-[10%] right-[10%] top-[10%]'
        : 'w-80 h-96'
        }`}
    >
      <div className="absolute top-[-40px] right-0 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white"
          onClick={handleExpandToggle}
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3 19.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>


          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3 19.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white"
          onClick={handleOpenToggle}
        >
          <span className="sr-only">Close</span>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>

      <Card className="w-full h-full flex flex-col overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-ice-50 to-ice-100 py-3">
          <CardTitle className="flex items-center text-lg text-ice-900">
            <Bot className="text-ice-600 mr-2 h-5 w-5" />
            {language === 'en' ? 'AI Guardian' : 'Guardián de IA'}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
          <MessagesList messages={messages} messagesEndRef={messagesEndRef} language={language} />

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
          <TopicSelector
            topics={{
              [language === 'en' ? 'Emergency' : 'Emergencia']: emergencyTopics,
              [language === 'en' ? 'Health' : 'Salud']: healthTopics,
              [language === 'en' ? 'General' : 'General']: generalTopics,
            }}
            onTopicSelect={handleTopicSelect}
            language={language}
          />
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'en'
                ? "Ask about health, emergencies, etc..."
                : "Pregunta sobre salud, emergencias, etc..."}
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
    </div>
  );
};

export default EnhancedAIGuardian;
