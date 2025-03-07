
import React from 'react';
import MessagesList from './MessagesList';
import TopicSelector from './TopicSelector';
import MessageInput from './MessageInput';

interface GuardianChatInterfaceProps {
  messages: Array<{text: string, type: 'guardian' | 'user'}>;
  input: string;
  selectedTopic: string | null;
  setInput: (input: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTopicSelect: (topic: string) => void;
}

const GuardianChatInterface: React.FC<GuardianChatInterfaceProps> = ({
  messages,
  input,
  selectedTopic,
  setInput,
  onSubmit,
  onTopicSelect
}) => {
  return (
    <div className="space-y-4">
      <MessagesList messages={messages} />
      
      <TopicSelector 
        selectedTopic={selectedTopic} 
        onSelectTopic={onTopicSelect} 
      />
      
      <MessageInput 
        input={input} 
        setInput={setInput} 
        onSubmit={onSubmit} 
        onSendMessage={() => {}} // We're using onSubmit instead
      />
    </div>
  );
};

export default GuardianChatInterface;
