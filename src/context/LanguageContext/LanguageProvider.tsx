
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

  // Translation function with robust fallbacks
  const t = (key: string): string => {
    try {
      // Add additional debugging for development
      console.log(`Attempting to translate key: ${key} in language: ${language}`);
      
      // Check if key exists in current language
      if (language && 
          translations[language] && 
          translations[language][key] &&
          translations[language][key].trim() !== '') {
        return translations[language][key];
      }
      
      // If not found or empty in current language, try English
      if (translations.en && 
          translations.en[key] &&
          translations.en[key].trim() !== '') {
        return translations.en[key];
      }
      
      // Hard fallbacks for common navigation items
      if (key === 'nav.home') return language === 'en' ? 'Home' : 'Inicio';
      if (key === 'nav.devices') return language === 'en' ? 'Devices' : 'Dispositivos';
      if (key === 'nav.pricing') return language === 'en' ? 'Pricing' : 'Precios';
      if (key === 'nav.about_us') return language === 'en' ? 'About Us' : 'Sobre Nosotros';
      if (key === 'nav.contact') return language === 'en' ? 'Contact' : 'Contacto';
      if (key === 'nav.login') return language === 'en' ? 'Login' : 'Iniciar Sesión';
      if (key === 'nav.signup') return language === 'en' ? 'Sign Up' : 'Registrarse';
      if (key === 'nav.logout') return language === 'en' ? 'Logout' : 'Cerrar Sesión';
      
      // Expat section fallbacks
      if (key.startsWith('expat.')) {
        if (key === 'expat.title') return 'Expat Support Services';
        if (key === 'expat.subtitle') return 'Special assistance for foreign residents';
        if (key === 'expat.desc') return 'We understand the unique challenges faced by expatriates in Spain. Our support services are designed to provide peace of mind in your new home.';
        if (key === 'expat.service.title') return 'Multilingual Assistance';
        if (key === 'expat.service.desc') return 'Our support team speaks your language. Get help in English, German, French, Dutch and more.';
        if (key === 'expat.translation.title') return 'Document Translation';
        if (key === 'expat.translation.desc') return 'We can help translate important medical documents and communicate with local healthcare providers.';
        if (key === 'expat.emergency.title') return '24/7 Emergency Support';
        if (key === 'expat.emergency.desc') return 'Our emergency line is always available with English-speaking operators ready to assist you day or night.';
      }
      
      // Login form fallbacks
      if (key === 'email') return language === 'en' ? 'Email Address' : 'Correo Electrónico';
      if (key === 'password') return language === 'en' ? 'Password' : 'Contraseña';
      if (key === 'login') return language === 'en' ? 'Sign In' : 'Iniciar Sesión';
      if (key === 'loading') return language === 'en' ? 'Processing...' : 'Procesando...';
      
      // Log missing translations as warnings
      console.warn(`Translation missing for key: ${key}`);
      
      // Return the key as last resort
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
