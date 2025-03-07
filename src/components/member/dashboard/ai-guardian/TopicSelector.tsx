
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface TopicSelectorProps {
  selectedTopic: string | null;
  onSelectTopic: (topic: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onSelectTopic }) => {
  const { language } = useLanguage();
  
  const topics = [
    { id: 'health', label: language === 'en' ? 'Health Monitoring' : 'Monitoreo de Salud' },
    { id: 'devices', label: language === 'en' ? 'Device Setup' : 'Configuración de Dispositivos' },
    { id: 'medications', label: language === 'en' ? 'Medications' : 'Medicamentos' },
  ];
  
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
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
