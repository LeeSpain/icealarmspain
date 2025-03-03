
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

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

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.devices': 'Devices',
    'nav.pricing': 'Pricing',
    'nav.about_us': 'About Us',
    'nav.contact': 'Contact',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Log Out',
    
    // Hero Section
    'hero.title': 'Next-Generation AI Emergency Response for Expats in Spain',
    'hero.subtitle': 'Peace of mind for you and your loved ones. AI-powered health monitoring and emergency response system.',
    'hero.cta': 'Get Started',
    'hero.learn_more': 'Learn More',
    
    // Features
    'features.title': 'Advanced Protection Features',
    'features.subtitle': 'ICE Alarm combines cutting-edge technology with personalized care',
    
    // Expat Section
    'expat.title': 'Expat Health Support Services',
    'expat.subtitle': 'Specialized assistance for the international community',
    'expat.desc': 'Our team of professionals provides dedicated health support services designed specifically for expatriates living in Spain.',
    'expat.service.title': 'Multilingual Support',
    'expat.service.desc': 'Get help in your preferred language with our team of multilingual support specialists available 24/7.',
    'expat.translation.title': 'Document Translation',
    'expat.translation.desc': 'We handle translation of medical documents, prescriptions, and health reports to ensure clear communication.',
    'expat.emergency.title': 'Emergency Assistance',
    'expat.emergency.desc': 'Immediate support during emergencies with professionals who understand expatriate needs and Spanish healthcare procedures.',
    
    // Footer
    'footer.rights': 'All rights reserved',
    
    // Add more translations as needed
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.devices': 'Dispositivos',
    'nav.pricing': 'Precios',
    'nav.about_us': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registrarse',
    'nav.logout': 'Cerrar Sesión',
    
    // Hero Section
    'hero.title': 'Respuesta de Emergencia con IA de Próxima Generación para Expatriados en España',
    'hero.subtitle': 'Tranquilidad para ti y tus seres queridos. Sistema de monitoreo de salud y respuesta de emergencia impulsado por IA.',
    'hero.cta': 'Comenzar',
    'hero.learn_more': 'Más Información',
    
    // Features
    'features.title': 'Características de Protección Avanzada',
    'features.subtitle': 'ICE Alarm combina tecnología de vanguardia con atención personalizada',
    
    // Expat Section
    'expat.title': 'Servicios de Apoyo Sanitario para Expatriados',
    'expat.subtitle': 'Asistencia especializada para la comunidad internacional',
    'expat.desc': 'Nuestro equipo de profesionales ofrece servicios de apoyo sanitario dedicados específicamente a expatriados que viven en España.',
    'expat.service.title': 'Soporte Multilingüe',
    'expat.service.desc': 'Reciba ayuda en su idioma preferido con nuestro equipo de especialistas multilingües disponibles 24/7.',
    'expat.translation.title': 'Traducción de Documentos',
    'expat.translation.desc': 'Nos encargamos de la traducción de documentos médicos, recetas e informes de salud para garantizar una comunicación clara.',
    'expat.emergency.title': 'Asistencia de Emergencia',
    'expat.emergency.desc': 'Apoyo inmediato durante emergencias con profesionales que comprenden las necesidades de los expatriados y los procedimientos sanitarios españoles.',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    
    // Add more translations as needed
  }
};
