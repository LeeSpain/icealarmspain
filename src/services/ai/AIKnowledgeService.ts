import { supabase } from '../../integrations/supabase/client';
import { KnowledgeArea, KnowledgeItem } from '../../data/ai-knowledge/types';
import { companyInfo } from '../../data/ai-knowledge/company-info';
import { devices } from '../../data/ai-knowledge/devices';
import { memberships } from '../../data/ai-knowledge/memberships';
import { specialtyServices } from '../../data/ai-knowledge/specialty-services';
import { support } from '../../data/ai-knowledge/support';

// All knowledge areas combined
const allKnowledgeAreas: Record<string, KnowledgeItem[]> = {
  company: companyInfo,
  devices: devices,
  memberships: memberships,
  specialtyServices: specialtyServices,
  support: support,
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
  async getKnowledgeArea(area: KnowledgeArea): Promise<KnowledgeItem[]> {
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
  async searchKnowledge(query: string): Promise<KnowledgeItem[]> {
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
   * Fallback search implementation using local data
   */
  private searchFallbackKnowledge(query: string): KnowledgeItem[] {
    const lowercaseQuery = query.toLowerCase();
    const results: KnowledgeItem[] = [];

    // Search through all knowledge areas
    Object.values(this.fallbackKnowledgeBase).forEach((items) => {
      items.forEach((item) => {
        if (
          item.title.toLowerCase().includes(lowercaseQuery) ||
          item.content.toLowerCase().includes(lowercaseQuery)
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
