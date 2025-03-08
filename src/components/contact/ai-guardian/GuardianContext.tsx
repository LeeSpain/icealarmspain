
import React, { createContext, useContext, ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GuardianContextType } from "./types";
import { useGuardianState } from "./hooks/useGuardianState";

const GuardianContext = createContext<GuardianContextType | undefined>(undefined);

export const GuardianProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const guardianState = useGuardianState(language === 'en' ? 'en' : 'es');

  return (
    <GuardianContext.Provider value={guardianState}>
      {children}
    </GuardianContext.Provider>
  );
};

export const useGuardian = () => {
  const context = useContext(GuardianContext);
  if (context === undefined) {
    throw new Error('useGuardian must be used within a GuardianProvider');
  }
  return context;
};

// Re-export types for convenience
export type { MessageType, KnowledgeAreaType } from './types';
