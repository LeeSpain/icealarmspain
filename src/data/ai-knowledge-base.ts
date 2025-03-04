
import { KnowledgeEntry } from './ai-knowledge/types';
import { companyEntries } from './ai-knowledge/company-info';
import { deviceEntries } from './ai-knowledge/devices';
import { supportEntries } from './ai-knowledge/support';
import { membershipEntries } from './ai-knowledge/memberships';
import { specialtyEntries } from './ai-knowledge/specialty-services';

// Combine all knowledge entries into a single array
export const COMPANY_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  ...companyEntries,
  ...deviceEntries, 
  ...supportEntries,
  ...membershipEntries,
  ...specialtyEntries
];

// Function to find the most relevant knowledge entry based on user query
export const findRelevantKnowledge = (query: string, language: 'en' | 'es'): string => {
  const lowercaseQuery = query.toLowerCase();
  
  // Find relevant entries by checking for keyword matches
  const relevantEntries = COMPANY_KNOWLEDGE_BASE.filter(entry => 
    entry.keywords.some(keyword => lowercaseQuery.includes(keyword))
  );
  
  if (relevantEntries.length === 0) {
    // Return default response if no matches
    return language === 'en' 
      ? "I'm ICE AI Guardian, your dedicated assistant. I can help with information about our services, devices, pricing, or support. How can I assist you today?"
      : "Soy ICE AI Guardian, su asistente dedicado. Puedo ayudar con información sobre nuestros servicios, dispositivos, precios o soporte. ¿Cómo puedo ayudarle hoy?";
  }
  
  // Get a random response from the most relevant entry
  const mostRelevant = relevantEntries[0];
  const responses = mostRelevant.responses[language];
  return responses[Math.floor(Math.random() * responses.length)];
};
