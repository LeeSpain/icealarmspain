
import React, { createContext, useState, useContext, useEffect } from 'react';

export type Language = 'en' | 'es';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultTranslations: Record<string, Record<string, string>> = {
  en: {},
  es: {}
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage first
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Simple translation function
  const t = (key: string): string => {
    // Simplified translation function - can be expanded later
    const translations = defaultTranslations;
    
    if (language && 
        translations[language] && 
        translations[language][key]) {
      return translations[language][key];
    }
    
    // Return key as fallback
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
