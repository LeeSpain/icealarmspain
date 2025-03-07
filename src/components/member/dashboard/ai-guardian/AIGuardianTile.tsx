
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAIGuardian } from './useAIGuardian';
import GuardianChatInterface from './GuardianChatInterface';
import GuardianWelcome from './GuardianWelcome';

const AIGuardianTile: React.FC = () => {
  const { language } = useLanguage();
  const { 
    messages, 
    selectedTopic, 
    sendMessage, 
    isLoading, 
    showWelcome,
    input,
    setInput,
    isInteracting,
    handleStartInteraction,
    handleSubmit,
    handleTopicSelect 
  } = useAIGuardian();

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="bg-guardian-50 py-3">
        <CardTitle className="flex items-center text-lg font-medium">
          <Shield className="text-guardian-500 mr-2 h-5 w-5" />
          {language === 'en' ? 'AI Health Guardian' : 'Guardian de Salud IA'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {showWelcome && !isInteracting ? (
          <GuardianWelcome onStartInteraction={handleStartInteraction} />
        ) : (
          <GuardianChatInterface 
            messages={messages}
            input={input}
            selectedTopic={selectedTopic}
            setInput={setInput}
            onSubmit={handleSubmit}
            onTopicSelect={handleTopicSelect}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AIGuardianTile;
