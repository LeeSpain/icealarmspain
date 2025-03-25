
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth'; // Updated to use the new auth implementation

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

  // Try to get auth context safely
  let auth = null;
  let profile = null;
  let isLoading = false;

  try {
    // Conditionally try to use auth if we're inside an AuthProvider
    const authContext = useAuth();
    auth = authContext;
    profile = authContext?.profile;
    isLoading = authContext?.isLoading || false;
  } catch (error) {
    // If useAuth throws an error (e.g., we're not in an AuthProvider),
    // just continue without auth integration
    console.log("Auth context not available in LanguageProvider, continuing without user profile language preferences");
  }
  
  // When auth loads and profile is available, use profile language if set
  useEffect(() => {
    if (auth && !isLoading && profile && profile.language) {
      setLanguage(profile.language as Language);
    }
  }, [isLoading, profile, auth]);

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
