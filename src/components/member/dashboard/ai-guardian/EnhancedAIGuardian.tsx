
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Brain, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import TopicSelector from './TopicSelector';
import { KNOWLEDGE_BASE, healthTopics, emergencyTopics, generalTopics } from './constants';

interface Message {
  text: string;
  sender: 'user' | 'guardian';
  category?: string;
}

const EnhancedAIGuardian: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: language === 'en' 
        ? `Hello${user?.name ? `, ${user.name}` : ''}! I'm your AI Guardian. How can I assist you today?`
        : `¡Hola${user?.name ? `, ${user.name}` : ''}! Soy tu Guardián IA. ¿Cómo puedo ayudarte hoy?`,
      sender: 'guardian',
      category: 'welcome'
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setIsProcessing(true);
    
    // Get response from AI
    setTimeout(() => {
      const topic = selectedTopic || 'health';
      const responses = KNOWLEDGE_BASE[topic as keyof typeof KNOWLEDGE_BASE][language === 'en' ? 'en' : 'es'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        text: randomResponse, 
        sender: 'guardian',
        category: topic
      }]);
      setIsProcessing(false);
    }, 1000);
    
    setInput('');
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    
    // Add message to indicate topic change
    const topicMessage = language === 'en' 
      ? `I'll help you with ${topic}. What would you like to know?`
      : `Te ayudaré con ${topic}. ¿Qué te gustaría saber?`;
    
    setMessages(prev => [...prev, { 
      text: topicMessage, 
      sender: 'guardian', 
      category: topic 
    }]);
  };

  // Combine all topic categories
  const allTopics = {
    ...healthTopics,
    ...emergencyTopics,
    ...generalTopics,
    General: 'general'
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-md">
      <CardHeader className="bg-gradient-to-r from-guardian-50 to-guardian-100 py-3">
        <CardTitle className="flex items-center text-lg text-guardian-900">
          <Bot className="text-guardian-600 mr-2 h-5 w-5" />
          {language === 'en' ? 'AI Guardian Assistant' : 'Asistente IA Guardian'}
        </CardTitle>
      </CardHeader>
      
      <div className="px-4 py-2 bg-guardian-50/50 border-b">
        <TopicSelector 
          selectedTopic={selectedTopic}
          onSelectTopic={handleTopicSelect}
          topics={allTopics}
        />
      </div>
      
      <CardContent 
        className="flex-1 overflow-y-auto p-4 space-y-3"
        ref={messagesEndRef}
      >
        {messages.map((message, idx) => (
          <div 
            key={idx} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-ice-100 text-ice-900' 
                  : 'bg-guardian-100 text-guardian-950'
              }`}
            >
              {message.sender === 'guardian' && (
                <div className="flex items-center mb-1 text-xs font-medium text-guardian-600">
                  <Brain className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'AI Guardian' : 'IA Guardian'}
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-center my-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-guardian-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-guardian-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-guardian-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-guardian-100 p-3">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'en' 
              ? "Ask me anything..." 
              : "Pregúntame lo que quieras..."}
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
            className="bg-guardian-600 hover:bg-guardian-700 h-10"
            disabled={isProcessing || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default EnhancedAIGuardian;
