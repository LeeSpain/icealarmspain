
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAIGuardian } from './useAIGuardian';
import GuardianWelcome from './GuardianWelcome';
import GuardianChatInterface from './GuardianChatInterface';

const AIGuardianTile: React.FC = () => {
  const { language } = useLanguage();
  const {
    isInteracting,
    messages,
    input,
    selectedTopic,
    handleStartInteraction,
    handleSubmit,
    handleTopicSelect,
    setInput
  } = useAIGuardian();
  
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg flex items-center text-guardian-600">
          <Brain className="mr-2 h-5 w-5" />
          {language === 'en' ? 'AI Guardian' : 'Guardian AI'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isInteracting ? (
          <GuardianChatInterface
            messages={messages}
            input={input}
            selectedTopic={selectedTopic}
            setInput={setInput}
            onSubmit={handleSubmit}
            onTopicSelect={handleTopicSelect}
          />
        ) : (
          <GuardianWelcome onStartInteraction={handleStartInteraction} />
        )}
      </CardContent>
    </Card>
  );
};

export default AIGuardianTile;
