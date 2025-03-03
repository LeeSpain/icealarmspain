
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Bot, ShieldCheck, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

const AIGuardianTile: React.FC = () => {
  const { language } = useLanguage();
  const [isInteracting, setIsInteracting] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, type: 'guardian' | 'user'}>>([
    {
      text: language === 'en' 
        ? "Hello! I'm your AI Guardian. How can I assist you today?" 
        : "¡Hola! Soy tu Guardian AI. ¿Cómo puedo ayudarte hoy?",
      type: 'guardian'
    }
  ]);
  const [input, setInput] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {text: input, type: 'user'}]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        en: [
          "I'm monitoring your vital signs and everything looks normal today.",
          "Your medication schedule is updated. Would you like me to remind you when it's time to take them?",
          "I've noticed your blood pressure readings are more stable this week. Great job keeping up with your medication!",
          "Is there anything specific you'd like to know about your health data?"
        ],
        es: [
          "Estoy monitoreando tus signos vitales y todo se ve normal hoy.",
          "Tu horario de medicación está actualizado. ¿Quieres que te recuerde cuando sea hora de tomarlos?",
          "He notado que tus lecturas de presión arterial son más estables esta semana. ¡Buen trabajo manteniendo tu medicación!",
          "¿Hay algo específico que te gustaría saber sobre tus datos de salud?"
        ]
      };
      
      const randomResponse = responses[language === 'en' ? 'en' : 'es'][Math.floor(Math.random() * responses[language === 'en' ? 'en' : 'es'].length)];
      
      setMessages(prev => [...prev, {text: randomResponse, type: 'guardian'}]);
    }, 1000);
    
    setInput("");
  };
  
  const handleStartInteraction = () => {
    setIsInteracting(true);
    toast.info(
      language === 'en' 
        ? "AI Guardian activated. You can now chat with your health assistant." 
        : "Guardian AI activado. Ahora puedes chatear con tu asistente de salud."
    );
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-guardian-600 text-white p-4 flex flex-row items-center">
        <CardTitle className="text-lg flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          {language === 'en' ? 'AI Guardian' : 'Guardian AI'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isInteracting ? (
          <div className="space-y-4">
            <div className="h-48 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-md">
              {messages.map((message, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg ${
                    message.type === 'guardian' 
                      ? 'bg-guardian-100 border-l-4 border-guardian-500' 
                      : 'bg-ice-100 border-l-4 border-ice-500 ml-6'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'guardian' && (
                      <Bot className="h-4 w-4 mt-0.5 text-guardian-600 flex-shrink-0" />
                    )}
                    <p className="text-sm">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
                className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-guardian-500 hover:bg-guardian-600"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center space-y-4">
            <div className="p-3 bg-guardian-100 rounded-full">
              <ShieldCheck className="h-8 w-8 text-guardian-500" />
            </div>
            <div>
              <h3 className="font-medium text-lg">
                {language === 'en' ? 'Health Assistant' : 'Asistente de Salud'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'en' 
                  ? 'Your AI Guardian is monitoring your health data and can provide personalized insights.' 
                  : 'Tu Guardian AI está monitoreando tus datos de salud y puede proporcionar información personalizada.'}
              </p>
            </div>
            <Button 
              onClick={handleStartInteraction} 
              className="mt-2 bg-guardian-500 hover:bg-guardian-600"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Start interaction' : 'Iniciar interacción'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIGuardianTile;
