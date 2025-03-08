
import { createClient } from '@supabase/supabase-js';

export type AIQueryType = 
  | 'general' 
  | 'client_search' 
  | 'client_onboarding' 
  | 'business_metrics'
  | 'device_status'
  | 'user_management'
  | 'inventory'
  | 'alerts';

export interface AIQueryContext {
  user?: any;
  searchTerm?: string;
  clientId?: number;
  deviceId?: string;
  section?: string;
  [key: string]: any;
}

class AIKnowledgeService {
  private supabase;
  
  constructor() {
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL || '',
      import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    );
  }
  
  async fetchData(queryType: AIQueryType, context: AIQueryContext): Promise<any> {
    // This is a mock implementation that simulates different data responses
    // In a real implementation, this would call APIs or database queries
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 600));
    
    switch (queryType) {
      case 'client_search':
        return this.getMockClientSearchResults(context);
      case 'business_metrics':
        return this.getMockBusinessMetrics(context);
      case 'device_status':
        return this.getMockDeviceStatus(context);
      case 'user_management':
        return this.getMockUserManagement(context);
      case 'inventory':
        return this.getMockInventory(context);
      case 'alerts':
        return this.getMockAlerts(context);
      default:
        return { message: "No specific data available for this query type." };
    }
  }
  
  private getMockClientSearchResults(context: AIQueryContext) {
    const searchTerm = context.searchTerm?.toLowerCase() || '';
    
    // Mock client data
    const allClients = [
      { id: 1, name: 'María García', status: 'active', devices: 2 },
      { id: 2, name: 'Juan Rodríguez', status: 'active', devices: 1 },
      { id: 3, name: 'Ana Martínez', status: 'inactive', devices: 0 },
      { id: 4, name: 'Pedro López', status: 'active', devices: 3 },
      { id: 5, name: 'Sofía Sánchez', status: 'pending', devices: 1 }
    ];
    
    // Filter clients by search term
    const matchingClients = searchTerm
      ? allClients.filter(client => 
          client.name.toLowerCase().includes(searchTerm) || 
          client.id.toString() === searchTerm
        )
      : allClients;
    
    return { matchingClients };
  }
  
  private getMockBusinessMetrics(context: AIQueryContext) {
    return {
      activeClients: 78,
      newClients: 12,
      revenueGenerated: '€18,540',
      activeDevices: 123,
      alertsHandled: 45
    };
  }
  
  private getMockDeviceStatus(context: AIQueryContext) {
    return {
      totalDevices: 143,
      activeDevices: 123,
      inactiveDevices: 15,
      maintenanceRequired: 5,
      batteryLow: 8
    };
  }
  
  private getMockUserManagement(context: AIQueryContext) {
    return {
      activeUsers: 24,
      admins: 3,
      callCenterAgents: 12,
      fieldTechnicians: 9
    };
  }
  
  private getMockInventory(context: AIQueryContext) {
    return {
      totalProducts: 15,
      lowStock: 3,
      pendingOrders: 8,
      recentDeliveries: 12
    };
  }
  
  private getMockAlerts(context: AIQueryContext) {
    return {
      pendingAlerts: 8,
      resolvedToday: 14,
      criticalAlerts: 2,
      averageResponseTime: '4.5 min'
    };
  }
}

export const aiKnowledgeService = new AIKnowledgeService();
