import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isEnglish: boolean;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.devices': 'Devices',
    'nav.pricing': 'Pricing',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.about_us': 'About Us',
    'nav.contact': 'Contact',
    'nav.logout': 'Logout',
    
    // Hero section
    'hero.badge': 'AI-Powered Health Protection',
    'hero.title': 'Intelligent Health Monitoring & Emergency Response',
    'hero.subtitle': 'Our AI Guardian provides 24/7 monitoring and emergency support, integrating smart devices for real-time health tracking and instant response.',
    'hero.cta.explore': 'Explore Solutions',
    'hero.cta.learn': 'Learn More',
    'hero.feature.protection.title': '24/7 Protection',
    'hero.feature.protection.desc': 'Continuous monitoring with instant emergency response when you need it most.',
    'hero.feature.insights.title': 'Health Insights',
    'hero.feature.insights.desc': 'AI-powered analysis of your health data for personalized recommendations.',
    'hero.feature.response.title': 'Rapid Response',
    'hero.feature.response.desc': 'Immediate assistance through our professional call center and AI Guardian.',
    
    // Dashboard section
    'dashboard.title': 'ICE Members Dashboard',
    'dashboard.subtitle': 'Monitor health data in real-time and receive AI-driven insights for proactive care.',
    'dashboard.glucose': 'Glucose Level',
    'dashboard.pendant': 'SOS Pendant',
    'dashboard.medication': 'Last Medication',
    'dashboard.ai.greeting': 'Good morning, María. Your glucose levels are within normal range today. Remember to take your medication at 12:00 PM. Would you like me to remind you?',
    'dashboard.ai.yes': 'Yes, please',
    'dashboard.ai.no': 'No, thanks',
    'dashboard.ai.reminders': 'Show all reminders',
    'dashboard.alert': 'Your next medication dose is in 45 minutes. The Medical Dispenser is prepared.',
    
    // Devices section
    'devices.title': 'Integrated Smart Devices',
    'devices.subtitle': 'Our comprehensive ecosystem of health monitoring devices works seamlessly with the AI Guardian.',
    'devices.sos.name': 'SOS Pendant',
    'devices.sos.desc': 'Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking.',
    'devices.dispenser.name': 'Medical Dispenser',
    'devices.dispenser.desc': 'Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking.',
    'devices.glucose.name': 'Glucose Monitor',
    'devices.glucose.desc': 'Real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health.',
    'devices.cta': 'Learn More',
    
    // Pricing section
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Purchase your devices and subscribe to our monitoring services. No leasing, no hidden fees.',
    'pricing.single.title': 'Single Device',
    'pricing.single.desc': 'Basic monitoring with a single device of your choice.',
    'pricing.dual.title': 'Dual Protection',
    'pricing.dual.desc': 'Enhanced protection with two integrated devices.',
    'pricing.complete.title': 'Complete Guardian',
    'pricing.complete.desc': 'Comprehensive health monitoring with all three devices.',
    'pricing.popular': 'Most Popular',
    'pricing.period': 'per month',
    'pricing.savings': 'Save',
    'pricing.cta': 'Get Started',
    'pricing.note': 'All plans include device purchase. Additional fees apply for device replacement.',
    'pricing.details': 'View complete pricing details',
    
    // Features
    'feature.emergency': 'One-touch emergency call',
    'feature.gps': 'GPS tracking',
    'feature.fall': 'Fall detection sensors',
    'feature.routing': 'Custom emergency routing',
    'feature.checkins': 'AI wellness check-ins',
    'feature.dispenser': 'Automated pill dispensing',
    'feature.notifications': 'Missed dose notifications',
    'feature.reminders': 'AI-powered reminders',
    'feature.protocols': 'Escalation protocols',
    'feature.tracking': 'Medication adherence tracking',
    'feature.continuous': 'Continuous glucose monitoring',
    'feature.analysis': 'AI trend analysis',
    'feature.alerts': 'Immediate alerts',
    'feature.emergency.response': 'Emergency response',
    'feature.recommendations': 'Dietary recommendations',
    
    // Expat explanations
    'expat.title': 'For Expats in Spain',
    'expat.subtitle': 'Understanding Healthcare in Spain as a Non-Spanish Speaker',
    'expat.desc': 'Living in Spain without fluency in Spanish can make accessing healthcare and emergency services challenging. ICE Alarm España bridges this gap with bilingual support.',
    'expat.service.title': 'Our Bilingual Service',
    'expat.service.desc': 'All our customer support, emergency response, and AI interactions are available in both English and Spanish. We understand the unique challenges faced by expats and provide tailored assistance.',
    'expat.translation.title': 'Translation Assistance',
    'expat.translation.desc': 'Our AI Guardian can translate medical terms and emergency instructions between English and Spanish, ensuring you always understand critical health information.',
    'expat.emergency.title': 'Emergency Support',
    'expat.emergency.desc': 'In case of emergency, our call center staff are fluent in English and can coordinate with local Spanish emergency services on your behalf, eliminating language barriers in critical situations.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.dashboard': 'Panel',
    'nav.devices': 'Dispositivos',
    'nav.pricing': 'Precios',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registrarse',
    'nav.about_us': 'Sobre Nosotros',
    'nav.contact': 'Contacto',
    'nav.logout': 'Cerrar Sesión',
    
    // Hero section
    'hero.badge': 'Protección de Salud con IA',
    'hero.title': 'Monitorización Inteligente de Salud y Respuesta de Emergencia',
    'hero.subtitle': 'Nuestro Guardián IA proporciona monitorización 24/7 y soporte de emergencia, integrando dispositivos inteligentes para seguimiento de salud en tiempo real y respuesta instantánea.',
    'hero.cta.explore': 'Explorar Soluciones',
    'hero.cta.learn': 'Saber Más',
    'hero.feature.protection.title': 'Protección 24/7',
    'hero.feature.protection.desc': 'Monitorización continua con respuesta de emergencia instantánea cuando más lo necesitas.',
    'hero.feature.insights.title': 'Información de Salud',
    'hero.feature.insights.desc': 'Análisis impulsado por IA de tus datos de salud para recomendaciones personalizadas.',
    'hero.feature.response.title': 'Respuesta Rápida',
    'hero.feature.response.desc': 'Asistencia inmediata a través de nuestro centro de llamadas profesional y Guardián IA.',
    
    // Dashboard section
    'dashboard.title': 'Panel de Miembros ICE',
    'dashboard.subtitle': 'Monitoriza datos de salud en tiempo real y recibe información impulsada por IA para cuidado proactivo.',
    'dashboard.glucose': 'Nivel de Glucosa',
    'dashboard.pendant': 'Colgante SOS',
    'dashboard.medication': 'Última Medicación',
    'dashboard.ai.greeting': 'Buenos días, María. Tus niveles de glucosa están dentro del rango normal hoy. Recuerda tomar tu medicación a las 12:00 PM. ¿Quieres que te lo recuerde?',
    'dashboard.ai.yes': 'Sí, por favor',
    'dashboard.ai.no': 'No, gracias',
    'dashboard.ai.reminders': 'Mostrar todos los recordatorios',
    'dashboard.alert': 'Tu próxima dosis de medicación es en 45 minutos. El Dispensador Médico está preparado.',
    
    // Devices section
    'devices.title': 'Dispositivos Inteligentes Integrados',
    'devices.subtitle': 'Nuestro ecosistema integral de dispositivos de monitorización de salud funciona perfectamente con el Guardián IA.',
    'devices.sos.name': 'Colgante SOS',
    'devices.sos.desc': 'Respuesta de emergencia inmediata con solo un toque. Nuestro avanzado colgante proporciona protección las 24 horas con detección de caídas incorporada y seguimiento GPS.',
    'devices.dispenser.name': 'Dispensador Médico',
    'devices.dispenser.desc': 'Nunca vuelvas a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicación con recordatorios inteligentes y seguimiento de adherencia.',
    'devices.glucose.name': 'Monitor de Glucosa',
    'devices.glucose.desc': 'Monitorización de glucosa en tiempo real con análisis impulsado por IA. Recibe alertas inmediatas para niveles preocupantes y recomendaciones personalizadas para una mejor salud.',
    'devices.cta': 'Saber Más',
    
    // Pricing section
    'pricing.title': 'Precios Simples y Transparentes',
    'pricing.subtitle': 'Compra tus dispositivos y suscríbete a nuestros servicios de monitorización. Sin arrendamiento, sin tarifas ocultas.',
    'pricing.single.title': 'Dispositivo Único',
    'pricing.single.desc': 'Monitorización básica con un solo dispositivo de tu elección.',
    'pricing.dual.title': 'Protección Dual',
    'pricing.dual.desc': 'Protección mejorada con dos dispositivos integrados.',
    'pricing.complete.title': 'Guardián Completo',
    'pricing.complete.desc': 'Monitorización integral de salud con los tres dispositivos.',
    'pricing.popular': 'Más Popular',
    'pricing.period': 'por mes',
    'pricing.savings': 'Ahorra',
    'pricing.cta': 'Comenzar',
    'pricing.note': 'Todos los planes incluyen la compra del dispositivo. Se aplican tarifas adicionales para el reemplazo del dispositivo.',
    'pricing.details': 'Ver detalles completos de precios',
    
    // Features
    'feature.emergency': 'Llamada de emergencia con un toque',
    'feature.gps': 'Seguimiento GPS',
    'feature.fall': 'Sensores de detección de caídas',
    'feature.routing': 'Enrutamiento de emergencia personalizado',
    'feature.checkins': 'Controles de bienestar con IA',
    'feature.dispenser': 'Dispensación automatizada de píldoras',
    'feature.notifications': 'Notificaciones de dosis perdidas',
    'feature.reminders': 'Recordatorios impulsados por IA',
    'feature.protocols': 'Protocolos de escalada',
    'feature.tracking': 'Seguimiento de adherencia a medicación',
    'feature.continuous': 'Monitorización continua de glucosa',
    'feature.analysis': 'Análisis de tendencias con IA',
    'feature.alerts': 'Alertas inmediatas',
    'feature.emergency.response': 'Respuesta de emergencia',
    'feature.recommendations': 'Recomendaciones dietéticas',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get language from localStorage, default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang === 'es' ? 'es' : 'en';
  });
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const t = (key: string): string => {
    const langObj = translations[language];
    return langObj[key as keyof typeof langObj] || key;
  };
  
  const isEnglish = language === 'en';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isEnglish }}>
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
