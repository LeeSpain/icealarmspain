
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
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Dashboard Overview',
    'dashboard.devices': 'My Devices',
    'dashboard.add_device': 'Add Device',
    'dashboard.no_devices': 'No devices found',
    'dashboard.setup_device': 'Set Up Device',
    'dashboard.status': 'Status',
    'dashboard.battery': 'Battery',
    'dashboard.active_devices': 'Active Devices',
    'dashboard.alert_status': 'Alert Status',
    'dashboard.next_checkup': 'Next Check-up',
    
    // Device Pages
    'device.settings': 'Device Settings',
    'device.status': 'Device Status',
    'device.battery': 'Battery Level',
    'device.last_check': 'Last Checked',
    'device.configure': 'Configure Device',
    'device.alerts': 'Device Alerts',
    'device.history': 'Usage History',
    
    // Help & Support
    'help.title': 'Help & Support',
    'help.faq': 'Frequently Asked Questions',
    'help.contact': 'Contact Support',
    'help.resources': 'Resources',
    'help.chat': 'Live Chat',
    
    // Settings
    'settings.title': 'Settings',
    'settings.notifications': 'Notification Settings',
    'settings.language': 'Language & Display',
    'settings.privacy': 'Privacy & Data',
    'settings.devices': 'Device Connections',
    
    // Profile
    'profile.title': 'Profile Settings',
    'profile.personal': 'Personal Information',
    'profile.account': 'Account Settings',
    'profile.emergency': 'Emergency Contacts',
    'profile.security': 'Security Settings',
    
    // Health Metrics
    'health.metrics': 'Health Metrics',
    'health.glucose': 'Blood Glucose',
    'health.heart_rate': 'Heart Rate',
    'health.blood_pressure': 'Blood Pressure',
    'health.medications': 'Medications',
    'health.upcoming': 'Upcoming Checkups',

    // Admin Dashboard
    'adminDashboard.title': 'Admin Dashboard',
    'adminDashboard.dashboard': 'Dashboard',
    'adminDashboard.overview': 'Overview',
    'adminDashboard.administration': 'Administration',
    'adminDashboard.adminusers': 'Admin Users',
    'adminDashboard.roles': 'Roles',
    'adminDashboard.permissions': 'Permissions',
    'adminDashboard.users': 'Users',
    'adminDashboard.customers': 'Customers',
    'adminDashboard.clientmanagement': 'Client Management',
    'adminDashboard.devices': 'Devices',
    'adminDashboard.devicemanagement': 'Device Management',
    'adminDashboard.devicemonitoring': 'Device Monitoring',
    'adminDashboard.devicemaintenance': 'Device Maintenance',
    'adminDashboard.callcenter': 'Call Center',
    'adminDashboard.callcenteroverview': 'Call Center Overview',
    'adminDashboard.calllogs': 'Call Logs',
    'adminDashboard.agentperformance': 'Agent Performance',
    'adminDashboard.salesmarketing': 'Sales & Marketing',
    'adminDashboard.products': 'Products',
    'adminDashboard.productcatalog': 'Product Catalog',
    'adminDashboard.productpricing': 'Product Pricing',
    'adminDashboard.subscriptions': 'Subscriptions',
    'adminDashboard.support': 'Support',
    'adminDashboard.supporttickets': 'Support Tickets',
    'adminDashboard.knowledgebase': 'Knowledge Base',
    'adminDashboard.faqs': 'FAQs',
    'adminDashboard.operations': 'Operations',
    'adminDashboard.alertsmanagement': 'Alerts Management',
    'adminDashboard.inventorymanagement': 'Inventory Management',
    'adminDashboard.orderslist': 'Orders List',
    'adminDashboard.regions': 'Regions',
    'adminDashboard.analytics': 'Analytics',
    'adminDashboard.analyticsdashboard': 'Analytics Dashboard',
    'adminDashboard.performancemetrics': 'Performance Metrics',
    'adminDashboard.settings': 'Settings',
    'adminDashboard.generalsettings': 'General Settings',
    'adminDashboard.securitysettings': 'Security Settings',
    'adminDashboard.notifications': 'Notifications',
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
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido de nuevo',
    'dashboard.overview': 'Resumen del Panel',
    'dashboard.devices': 'Mis Dispositivos',
    'dashboard.add_device': 'Añadir Dispositivo',
    'dashboard.no_devices': 'No se encontraron dispositivos',
    'dashboard.setup_device': 'Configurar Dispositivo',
    'dashboard.status': 'Estado',
    'dashboard.battery': 'Batería',
    'dashboard.active_devices': 'Dispositivos Activos',
    'dashboard.alert_status': 'Estado de Alerta',
    'dashboard.next_checkup': 'Próxima Revisión',
    
    // Device Pages
    'device.settings': 'Configuración de Dispositivo',
    'device.status': 'Estado del Dispositivo',
    'device.battery': 'Nivel de Batería',
    'device.last_check': 'Última Verificación',
    'device.configure': 'Configurar Dispositivo',
    'device.alerts': 'Alertas del Dispositivo',
    'device.history': 'Historial de Uso',
    
    // Help & Support
    'help.title': 'Ayuda y Soporte',
    'help.faq': 'Preguntas Frecuentes',
    'help.contact': 'Contactar Soporte',
    'help.resources': 'Recursos',
    'help.chat': 'Chat en Vivo',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.notifications': 'Configuración de Notificaciones',
    'settings.language': 'Idioma y Visualización',
    'settings.privacy': 'Privacidad y Datos',
    'settings.devices': 'Conexiones de Dispositivos',
    
    // Profile
    'profile.title': 'Configuración de Perfil',
    'profile.personal': 'Información Personal',
    'profile.account': 'Configuración de Cuenta',
    'profile.emergency': 'Contactos de Emergencia',
    'profile.security': 'Configuración de Seguridad',
    
    // Health Metrics
    'health.metrics': 'Métricas de Salud',
    'health.glucose': 'Glucosa en Sangre',
    'health.heart_rate': 'Ritmo Cardíaco',
    'health.blood_pressure': 'Presión Arterial',
    'health.medications': 'Medicamentos',
    'health.upcoming': 'Próximas Revisiones',
    
    // Admin Dashboard
    'adminDashboard.title': 'Panel de Administración',
    'adminDashboard.dashboard': 'Panel',
    'adminDashboard.overview': 'Resumen',
    'adminDashboard.administration': 'Administración',
    'adminDashboard.adminusers': 'Usuarios Administradores',
    'adminDashboard.roles': 'Roles',
    'adminDashboard.permissions': 'Permisos',
    'adminDashboard.users': 'Usuarios',
    'adminDashboard.customers': 'Clientes',
    'adminDashboard.clientmanagement': 'Gestión de Clientes',
    'adminDashboard.devices': 'Dispositivos',
    'adminDashboard.devicemanagement': 'Gestión de Dispositivos',
    'adminDashboard.devicemonitoring': 'Monitoreo de Dispositivos',
    'adminDashboard.devicemaintenance': 'Mantenimiento de Dispositivos',
    'adminDashboard.callcenter': 'Centro de Llamadas',
    'adminDashboard.callcenteroverview': 'Resumen del Centro de Llamadas',
    'adminDashboard.calllogs': 'Registro de Llamadas',
    'adminDashboard.agentperformance': 'Rendimiento de Agentes',
    'adminDashboard.salesmarketing': 'Ventas y Marketing',
    'adminDashboard.products': 'Productos',
    'adminDashboard.productcatalog': 'Catálogo de Productos',
    'adminDashboard.productpricing': 'Precios de Productos',
    'adminDashboard.subscriptions': 'Suscripciones',
    'adminDashboard.support': 'Soporte',
    'adminDashboard.supporttickets': 'Tickets de Soporte',
    'adminDashboard.knowledgebase': 'Base de Conocimientos',
    'adminDashboard.faqs': 'Preguntas Frecuentes',
    'adminDashboard.operations': 'Operaciones',
    'adminDashboard.alertsmanagement': 'Gestión de Alertas',
    'adminDashboard.inventorymanagement': 'Gestión de Inventario',
    'adminDashboard.orderslist': 'Lista de Pedidos',
    'adminDashboard.regions': 'Regiones',
    'adminDashboard.analytics': 'Analítica',
    'adminDashboard.analyticsdashboard': 'Panel de Analítica',
    'adminDashboard.performancemetrics': 'Métricas de Rendimiento',
    'adminDashboard.settings': 'Configuración',
    'adminDashboard.generalsettings': 'Configuración General',
    'adminDashboard.securitysettings': 'Configuración de Seguridad',
    'adminDashboard.notifications': 'Notificaciones',
  }
};

