
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import GuardianWelcome from "@/components/member/dashboard/ai-guardian/GuardianWelcome";
import MessagesList from "@/components/member/dashboard/ai-guardian/MessagesList";
import MessageInput from "@/components/member/dashboard/ai-guardian/MessageInput";
import TopicSelector from "@/components/member/dashboard/ai-guardian/TopicSelector";
import { useAIGuardian } from "@/components/member/dashboard/ai-guardian/useAIGuardian";

const AIGuardianChatTab: React.FC = () => {
  const { language } = useLanguage();
  const { 
    messages, 
    selectedTopic, 
    setSelectedTopic, 
    showWelcome,
    sendMessage,
    isLoading
  } = useAIGuardian();
  
  return (
    <div className="flex flex-col h-[75vh]">
      <div className="px-6 py-4 border-b">
        <TopicSelector 
          selectedTopic={selectedTopic} 
          onSelectTopic={setSelectedTopic} 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {showWelcome ? (
          <GuardianWelcome onStartInteraction={() => sendMessage("Hello")} />
        ) : (
          <MessagesList messages={messages} />
        )}
      </div>
      
      <div className="border-t p-4">
        <MessageInput 
          onSendMessage={sendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default AIGuardianChatTab;
