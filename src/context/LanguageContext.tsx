
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Simple translations just for core functionality
const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'Ice Guardian',
    'app.loading': 'Loading...',
    'error.general': 'Something went wrong',
    'error.firebase': 'Firebase configuration error'
  },
  es: {
    'app.name': 'Guardián de Hielo',
    'app.loading': 'Cargando...',
    'error.general': 'Algo salió mal',
    'error.firebase': 'Error de configuración de Firebase'
  },
  fr: {
    'app.name': 'Gardien de Glace',
    'app.loading': 'Chargement...',
    'error.general': 'Quelque chose s\'est mal passé',
    'error.firebase': 'Erreur de configuration Firebase'
  },
  de: {
    'app.name': 'Eis Wächter',
    'app.loading': 'Wird geladen...',
    'error.general': 'Etwas ist schief gelaufen',
    'error.firebase': 'Firebase-Konfigurationsfehler'
  }
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
