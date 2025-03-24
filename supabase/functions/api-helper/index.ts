
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Standard response format for all API responses
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  success: boolean;
}

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Handles API requests with standardized error handling and response format
 */
export function createApiHandler<T = unknown>(
  handler: (req: Request) => Promise<T>,
  options: {
    requireAuth?: boolean;
    rateLimit?: boolean;
    logRequests?: boolean;
  } = {}
) {
  const { requireAuth = false, rateLimit = false, logRequests = true } = options;

  return async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Log request (if enabled)
      if (logRequests) {
        console.log(`API Request: ${req.method} ${req.url}`);
      }

      // Check authentication (if required)
      if (requireAuth) {
        // In a real implementation, verify the JWT token from supabase
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new Error('Authentication required');
        }
        
        // You would validate the token here
        // const token = authHeader.split(' ')[1];
        // const { data: user, error } = await supabase.auth.getUser(token);
        // if (error || !user) throw new Error('Invalid authentication');
      }

      // Check rate limiting (if enabled)
      if (rateLimit) {
        // Implement rate limiting logic
        // This is just a placeholder for actual implementation
        const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
        // You would check against a cache/database if this IP has exceeded limits
      }

      // Call the handler function to process the request
      const result = await handler(req);
      
      // Return successful response
      const responseBody: ApiResponse<T> = {
        data: result,
        success: true,
      };

      return new Response(
        JSON.stringify(responseBody),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } catch (error) {
      console.error('API error:', error);
      
      // Determine appropriate status code
      let status = 500;
      let errorCode = 'internal_server_error';
      
      if (error.message === 'Authentication required') {
        status = 401;
        errorCode = 'unauthorized';
      } else if (error.message === 'Forbidden') {
        status = 403;
        errorCode = 'forbidden';
      } else if (error.message === 'Not Found') {
        status = 404;
        errorCode = 'not_found';
      } else if (error.message === 'Rate limit exceeded') {
        status = 429;
        errorCode = 'rate_limit_exceeded';
      }
      
      // Prepare error response
      const responseBody: ApiResponse = {
        success: false,
        error: {
          message: error.message || 'An unexpected error occurred',
          code: errorCode,
          details: error.details || undefined,
        },
      };
      
      return new Response(
        JSON.stringify(responseBody),
        {
          status,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  };
}

// Example usage
// serve(createApiHandler(async (req) => {
//   const { name } = await req.json();
//   return { greeting: `Hello, ${name}!` };
// }));

// Export the helper function
export { serve };
