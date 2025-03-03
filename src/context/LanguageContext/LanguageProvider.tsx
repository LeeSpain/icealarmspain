
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from './types';
import { translations } from './translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    console.log("LanguageContext initializing with saved language:", savedLanguage || 'en');
    return savedLanguage || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    console.log("LanguageContext saving language:", language);
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    // Fallback to English translations or key itself if translation not found
    const englishValue = translations.en[key] || key;
    
    if (language === 'en') {
      return englishValue;
    }
    
    // Return Spanish translation if available, otherwise fallback to English or key itself
    return translations.es[key] || englishValue;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
