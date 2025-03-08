
import { KnowledgeAreaType } from "../types";

// Function to determine knowledge area based on message content
export const determineKnowledgeArea = (message: string): KnowledgeAreaType => {
  const normalizedMessage = message.toLowerCase();
  
  if (normalizedMessage.includes('price') || 
      normalizedMessage.includes('service') || 
      normalizedMessage.includes('offer') || 
      normalizedMessage.includes('plan') ||
      normalizedMessage.includes('precio') || 
      normalizedMessage.includes('servicio') || 
      normalizedMessage.includes('oferta') || 
      normalizedMessage.includes('plan')) {
    return 'services';
  }
  
  if (normalizedMessage.includes('help') || 
      normalizedMessage.includes('support') || 
      normalizedMessage.includes('problem') || 
      normalizedMessage.includes('issue') ||
      normalizedMessage.includes('ayuda') || 
      normalizedMessage.includes('soporte') || 
      normalizedMessage.includes('problema') || 
      normalizedMessage.includes('inconveniente')) {
    return 'support';
  }
  
  if (normalizedMessage.includes('business') || 
      normalizedMessage.includes('company') || 
      normalizedMessage.includes('partner') || 
      normalizedMessage.includes('enterprise') ||
      normalizedMessage.includes('negocio') || 
      normalizedMessage.includes('empresa') || 
      normalizedMessage.includes('socio') || 
      normalizedMessage.includes('comercial')) {
    return 'business';
  }
  
  if (normalizedMessage.includes('appointment') || 
      normalizedMessage.includes('schedule') || 
      normalizedMessage.includes('book') || 
      normalizedMessage.includes('meet') ||
      normalizedMessage.includes('cita') || 
      normalizedMessage.includes('agenda') || 
      normalizedMessage.includes('reservar') || 
      normalizedMessage.includes('reunión')) {
    return 'appointments';
  }
  
  return 'general';
};

// Function to get area name in selected language
export const getAreaName = (area: string, lang: 'en' | 'es'): string => {
  switch (area) {
    case 'services':
      return lang === 'en' ? 'our services' : 'nuestros servicios';
    case 'support':
      return lang === 'en' ? 'support and troubleshooting' : 'soporte y solución de problemas';
    case 'business':
      return lang === 'en' ? 'business inquiries' : 'consultas de negocio';
    case 'appointments':
      return lang === 'en' ? 'scheduling appointments' : 'programación de citas';
    default:
      return lang === 'en' ? 'general information' : 'información general';
  }
};
