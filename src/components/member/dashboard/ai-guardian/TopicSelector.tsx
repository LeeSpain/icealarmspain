
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { AI_TOPICS } from './constants';

interface TopicSelectorProps {
  selectedTopic: string | null;
  onSelectTopic: (topic: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onSelectTopic }) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'es';
  
  return (
    <div className="flex flex-wrap gap-2">
      {AI_TOPICS[lang].map(topic => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className={`px-3 py-1.5 text-xs rounded-full flex items-center transition-colors ${
            selectedTopic === topic.id 
              ? 'bg-guardian-100 text-guardian-700 border border-guardian-300' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {React.createElement(topic.icon, { className: "h-4 w-4 mr-1.5" })}
          <span>{topic.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TopicSelector;
