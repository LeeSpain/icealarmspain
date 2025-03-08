
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface TopicSelectorProps {
  selectedTopic: string | null;
  onSelectTopic: (topic: string) => void;
  topics?: { [key: string]: string };
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  selectedTopic, 
  onSelectTopic,
  topics = {} 
}) => {
  const { language } = useLanguage();
  
  const defaultTopics = {
    'health': language === 'en' ? 'Health Monitoring' : 'Monitoreo de Salud',
    'devices': language === 'en' ? 'Device Setup' : 'Configuración de Dispositivos',
    'medications': language === 'en' ? 'Medications' : 'Medicamentos',
  };
  
  const topicsToRender = Object.keys(topics).length > 0 ? 
    Object.entries(topics).map(([label, id]) => ({ id, label })) :
    Object.entries(defaultTopics).map(([id, label]) => ({ id, label }));
  
  return (
    <div className="flex flex-wrap gap-2">
      {topicsToRender.map((topic) => (
        <Button
          key={topic.id}
          size="sm"
          variant={selectedTopic === topic.id ? "default" : "outline"}
          className={selectedTopic === topic.id ? "bg-guardian-500 hover:bg-guardian-600" : ""}
          onClick={() => onSelectTopic(topic.id)}
        >
          {topic.label}
        </Button>
      ))}
    </div>
  );
};

export default TopicSelector;
