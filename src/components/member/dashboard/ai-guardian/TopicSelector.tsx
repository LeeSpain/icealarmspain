
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { AI_TOPICS } from './constants';

interface TopicSelectorProps {
  selectedTopic: string | null;
  onTopicSelect: (topic: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onTopicSelect }) => {
  const { language } = useLanguage();
  
  return (
    <>
      {selectedTopic && (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="font-medium text-guardian-600">
            {language === 'en' ? 'Discussing:' : 'Discutiendo:'}
          </span>
          <span className="px-2 py-0.5 bg-guardian-100 text-guardian-700 rounded-full flex items-center">
            {AI_TOPICS[language === 'en' ? 'en' : 'es'].find(t => t.id === selectedTopic)?.icon}
            <span className="ml-1">
              {AI_TOPICS[language === 'en' ? 'en' : 'es'].find(t => t.id === selectedTopic)?.label}
            </span>
          </span>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {AI_TOPICS[language === 'en' ? 'en' : 'es'].map(topic => (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-md flex items-center"
          >
            {topic.icon}
            <span className="ml-1">{topic.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default TopicSelector;
