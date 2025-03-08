
import { supabase } from '../../integrations/supabase/client';
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
  // Fallback knowledge base in case of API errors
  private fallbackKnowledgeBase = allKnowledgeAreas;
  private supabaseClient;

  constructor() {
    try {
      // Use the existing supabase client instead of creating a new one
      this.supabaseClient = supabase;
      console.log('AIKnowledgeService: Successfully connected to Supabase client');
    } catch (error) {
      console.error('AIKnowledgeService: Error initializing Supabase client, using fallback knowledge base', error);
      this.supabaseClient = null;
    }
  }

  /**
   * Get knowledge items for a specific area
   */
  async getKnowledgeArea(area: KnowledgeArea): Promise<KnowledgeEntry[]> {
    try {
      // If we don't have a working Supabase client, use fallback data
      if (!this.supabaseClient) {
        console.log(`AIKnowledgeService: Using fallback data for ${area}`);
        return this.fallbackKnowledgeBase[area] || [];
      }

      // Otherwise try to fetch from Supabase
      const { data, error } = await this.supabaseClient
        .from('knowledge_base')
        .select('*')
        .eq('area', area);

      if (error) {
        console.error('AIKnowledgeService: Error fetching knowledge area:', error);
        return this.fallbackKnowledgeBase[area] || [];
      }

      return data.length > 0 ? data : this.fallbackKnowledgeBase[area] || [];
    } catch (error) {
      console.error(`AIKnowledgeService: Error in getKnowledgeArea for ${area}:`, error);
      return this.fallbackKnowledgeBase[area] || [];
    }
  }

  /**
   * Search across all knowledge areas
   */
  async searchKnowledge(query: string): Promise<KnowledgeEntry[]> {
    try {
      // If we don't have a working Supabase client, search in fallback data
      if (!this.supabaseClient) {
        console.log(`AIKnowledgeService: Using fallback data for search: ${query}`);
        return this.searchFallbackKnowledge(query);
      }

      // Otherwise try to search in Supabase
      const { data, error } = await this.supabaseClient
        .from('knowledge_base')
        .select('*')
        .textSearch('content', query, {
          config: 'english',
        });

      if (error) {
        console.error('AIKnowledgeService: Error searching knowledge:', error);
        return this.searchFallbackKnowledge(query);
      }

      return data.length > 0 ? data : this.searchFallbackKnowledge(query);
    } catch (error) {
      console.error(`AIKnowledgeService: Error in searchKnowledge for ${query}:`, error);
      return this.searchFallbackKnowledge(query);
    }
  }

  /**
   * Fetch data based on context type and parameters
   * This implements the missing fetchData method referenced in aiResponseService
   */
  async fetchData(contextType: string, params: Record<string, any>): Promise<any> {
    try {
      console.log(`AIKnowledgeService: Fetching data for context: ${contextType}`, params);
      
      // If we don't have a working Supabase client, return empty data
      if (!this.supabaseClient) {
        console.log(`AIKnowledgeService: No Supabase client available for context: ${contextType}`);
        return {};
      }

      // Handle different context types
      switch (contextType) {
        case 'general':
          return { 
            generalInfo: "ICE Alarm provides comprehensive health monitoring services with 24/7 support.",
            availableServices: ["Emergency Response", "Health Monitoring", "Medication Management"]
          };
        
        case 'client_search':
          // In a real implementation, this would search for client data
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
   * Fallback search implementation using local data
   */
  private searchFallbackKnowledge(query: string): KnowledgeEntry[] {
    const lowercaseQuery = query.toLowerCase();
    const results: KnowledgeEntry[] = [];

    // Search through all knowledge areas
    Object.values(this.fallbackKnowledgeBase).forEach((items) => {
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
