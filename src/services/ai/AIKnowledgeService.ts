
import { KnowledgeEntry } from '../../data/ai-knowledge/types';
import { companyEntries } from '../../data/ai-knowledge/company-info';
import { deviceEntries } from '../../data/ai-knowledge/devices';
import { membershipEntries } from '../../data/ai-knowledge/memberships';
import { specialtyEntries } from '../../data/ai-knowledge/specialty-services';
import { supportEntries } from '../../data/ai-knowledge/support';

// Define the types needed for the service
export type KnowledgeArea = 'company' | 'devices' | 'memberships' | 'specialtyServices' | 'support';

// All knowledge areas combined
const allKnowledgeAreas: Record<string, KnowledgeEntry[]> = {
  company: companyEntries,
  devices: deviceEntries,
  memberships: membershipEntries,
  specialtyServices: specialtyEntries,
  support: supportEntries,
};

class AIKnowledgeService {
  private knowledgeBase = allKnowledgeAreas;

  /**
   * Get knowledge items for a specific area
   */
  async getKnowledgeArea(area: KnowledgeArea): Promise<KnowledgeEntry[]> {
    try {
      return this.knowledgeBase[area] || [];
    } catch (error) {
      console.error(`AIKnowledgeService: Error in getKnowledgeArea for ${area}:`, error);
      return [];
    }
  }

  /**
   * Search across all knowledge areas
   */
  async searchKnowledge(query: string): Promise<KnowledgeEntry[]> {
    try {
      return this.searchLocalKnowledge(query);
    } catch (error) {
      console.error(`AIKnowledgeService: Error in searchKnowledge for ${query}:`, error);
      return [];
    }
  }

  /**
   * Fetch data based on context type and parameters
   */
  async fetchData(contextType: string, params: Record<string, any>): Promise<any> {
    try {
      console.log(`AIKnowledgeService: Fetching data for context: ${contextType}`, params);
      
      // Handle different context types
      switch (contextType) {
        case 'general':
          return { 
            generalInfo: "ICE Alarm provides comprehensive health monitoring services with 24/7 support.",
            availableServices: ["Emergency Response", "Health Monitoring", "Medication Management"]
          };
        
        case 'client_search':
          return { 
            searchResults: [],
            message: `No clients found matching "${params.searchTerm}"`
          };
        
        case 'business_metrics':
          return {
            activeUsers: 1250,
            alertsHandled: 320,
            customerSatisfaction: "96%"
          };
          
        default:
          console.log(`AIKnowledgeService: Unknown context type: ${contextType}`);
          return {};
      }
    } catch (error) {
      console.error(`AIKnowledgeService: Error in fetchData for ${contextType}:`, error);
      return {};
    }
  }

  /**
   * Local search implementation
   */
  private searchLocalKnowledge(query: string): KnowledgeEntry[] {
    const lowercaseQuery = query.toLowerCase();
    const results: KnowledgeEntry[] = [];

    // Search through all knowledge areas
    Object.values(this.knowledgeBase).forEach((items) => {
      items.forEach((item) => {
        if (
          item.topic?.toLowerCase().includes(lowercaseQuery) ||
          item.keywords?.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
          item.responses?.en?.some(response => response.toLowerCase().includes(lowercaseQuery)) ||
          item.responses?.es?.some(response => response.toLowerCase().includes(lowercaseQuery))
        ) {
          results.push(item);
        }
      });
    });

    return results;
  }
}

// Singleton instance
export const aiKnowledgeService = new AIKnowledgeService();
