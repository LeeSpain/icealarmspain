
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  const healthcheck = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      database: { status: 'checking' },
      storage: { status: 'checking' },
      auth: { status: 'checking' },
    },
    version: '1.0.0',
  };

  try {
    // Initialize Supabase client - we use admin-level access for health checks
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check database connectivity
    const dbStart = Date.now();
    try {
      const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
      
      if (error) throw error;
      
      healthcheck.services.database = {
        status: 'healthy',
        responseTime: `${Date.now() - dbStart}ms`,
      };
    } catch (error) {
      console.error('Database health check failed:', error);
      healthcheck.services.database = {
        status: 'unhealthy',
        error: error.message,
      };
      healthcheck.status = 'degraded';
    }
    
    // Check storage service
    const storageStart = Date.now();
    try {
      const { error } = await supabase.storage.listBuckets();
      
      if (error) throw error;
      
      healthcheck.services.storage = {
        status: 'healthy',
        responseTime: `${Date.now() - storageStart}ms`,
      };
    } catch (error) {
      console.error('Storage health check failed:', error);
      healthcheck.services.storage = {
        status: 'unhealthy',
        error: error.message,
      };
      healthcheck.status = 'degraded';
    }
    
    // Check auth service
    const authStart = Date.now();
    try {
      const { error } = await supabase.auth.getUser();
      
      // For health checks, we don't care about the actual user
      // We just want to make sure the auth service is responding
      
      healthcheck.services.auth = {
        status: 'healthy',
        responseTime: `${Date.now() - authStart}ms`,
      };
    } catch (error) {
      console.error('Auth health check failed:', error);
      healthcheck.services.auth = {
        status: 'unhealthy',
        error: error.message,
      };
      healthcheck.status = 'degraded';
    }
    
    // Set overall status
    const hasFailure = Object.values(healthcheck.services).some(
      service => service.status === 'unhealthy'
    );
    
    if (hasFailure) {
      healthcheck.status = 'unhealthy';
    }
    
    return new Response(JSON.stringify(healthcheck), {
      status: hasFailure ? 503 : 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return new Response(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
