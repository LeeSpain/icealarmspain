
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
    try {
      // Check if the key exists in the current language
      if (language && translations[language] && translations[language][key]) {
        return translations[language][key];
      }
      
      // Fallback to English if the key doesn't exist in the current language
      if (translations.en && translations.en[key]) {
        return translations.en[key];
      }
      
      // If all else fails, return the key itself for debugging
      console.warn(`Translation missing for key: ${key}`);
      return key;
    } catch (error) {
      console.error("Error in translation function:", error);
      return key;
    }
  };

  const contextValue = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
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
