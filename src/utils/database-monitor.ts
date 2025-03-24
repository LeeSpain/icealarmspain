
import { supabase, supabaseOperation } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/**
 * HealthCheckResult contains the result of a database health check
 */
export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    connectivity: boolean;
    responseTime: number;
    tablesCount?: number;
  };
  error?: string;
}

/**
 * Performs a health check on the database connection
 */
export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const startTime = performance.now();
  let connectivity = false;
  let tablesCount = 0;
  
  try {
    // Check if we can connect and run a simple query
    const { data, error, success } = await supabaseOperation(
      () => supabase.from('profiles').select('count', { count: 'exact', head: true }),
      { showToast: false, context: 'Database Health Check' }
    );
    
    connectivity = success && !error;
    
    // If connected, try to get the table count
    if (connectivity) {
      const { data: tableData } = await supabaseOperation(
        () => supabase.rpc('get_tables_count') as Promise<any>,
        { showToast: false, context: 'Database Health Check' }
      );
      
      if (tableData) {
        tablesCount = tableData;
      }
    }
    
    const responseTime = performance.now() - startTime;
    
    // Determine overall status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    
    if (!connectivity) {
      status = 'unhealthy';
    } else if (responseTime > 1000) {
      status = 'degraded';
    }
    
    return {
      status,
      timestamp: new Date().toISOString(),
      checks: {
        connectivity,
        responseTime,
        tablesCount
      }
    };
  } catch (error: any) {
    console.error('Database health check failed:', error);
    
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        connectivity: false,
        responseTime: performance.now() - startTime
      },
      error: error?.message || 'Unknown database error'
    };
  }
}

/**
 * Monitors database health and shows alerts for issues
 */
export function startDatabaseMonitor(interval = 60000, showToasts = true) {
  // Run initial check
  checkDatabaseHealth().then(result => {
    if (result.status !== 'healthy' && showToasts) {
      toast({
        title: "Database Status",
        description: result.status === 'degraded' 
          ? "Database is responding slowly. Some operations may take longer than usual."
          : "Cannot connect to database. Please check your connection.",
        variant: result.status === 'degraded' ? "warning" : "destructive",
      });
    }
  });
  
  // Set up recurring checks
  const monitorId = setInterval(async () => {
    const result = await checkDatabaseHealth();
    
    // Only show toasts for degraded or unhealthy status
    if (result.status !== 'healthy' && showToasts) {
      toast({
        title: "Database Status",
        description: result.status === 'degraded' 
          ? "Database is responding slowly. Some operations may take longer than usual."
          : "Cannot connect to database. Please check your connection.",
        variant: result.status === 'degraded' ? "warning" : "destructive",
      });
    }
  }, interval);
  
  // Return a function to stop monitoring
  return () => clearInterval(monitorId);
}
