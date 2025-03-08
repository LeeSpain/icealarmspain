
import React from "react";
import { Brain, Zap, HelpCircle, Briefcase, Clock, Bot } from "lucide-react";

export const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'services':
      return <Zap size={12} className="mr-1" />;
    case 'support':
      return <HelpCircle size={12} className="mr-1" />;
    case 'business':
      return <Briefcase size={12} className="mr-1" />;
    case 'appointments':
      return <Clock size={12} className="mr-1" />;
    case 'welcome':
      return <Bot size={12} className="mr-1" />;
    default:
      return <Brain size={12} className="mr-1" />;
  }
};
