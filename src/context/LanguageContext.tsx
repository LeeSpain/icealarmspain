
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('language') || 'en';
  });
  const { profile, isLoading } = useAuth();

  // When auth loads and profile is available, use profile language if set
  useEffect(() => {
    if (!isLoading && profile && profile.language) {
      setLanguage(profile.language);
    }
  }, [isLoading, profile]);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
