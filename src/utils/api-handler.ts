
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "./error-handler";
import { isProduction } from "./environment";

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  statusCode?: number;
  success: boolean;
}

/**
 * Options for API requests
 */
export interface ApiRequestOptions {
  showErrorToast?: boolean;
  context?: string;
  retries?: number;
  retryDelay?: number;
}

/**
 * Handles API requests with proper error handling, retries, and consistent response format
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {},
  requestOptions: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    showErrorToast = true,
    context = "API Request",
    retries = 0,
    retryDelay = 1000,
  } = requestOptions;

  let attempts = 0;
  
  const executeRequest = async (): Promise<ApiResponse<T>> => {
    attempts++;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const isJsonResponse = response.headers.get('content-type')?.includes('application/json');
      const data = isJsonResponse ? await response.json() : await response.text();
      
      if (!response.ok) {
        const errorMessage = isJsonResponse && data.error 
          ? data.error 
          : `Request failed with status ${response.status}`;
        
        // Log detailed error information in development
        if (!isProduction()) {
          console.error(`API Error (${response.status}):`, {
            url,
            status: response.status,
            data,
            error: errorMessage,
          });
        }
        
        // If we have retries left, try again after delay
        if (attempts <= retries) {
          console.warn(`Retrying request (${attempts}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return executeRequest();
        }
        
        const apiResponse: ApiResponse<T> = {
          error: errorMessage,
          statusCode: response.status,
          success: false,
        };
        
        if (showErrorToast) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
        
        return apiResponse;
      }
      
      return {
        data: isJsonResponse ? data : { message: data },
        statusCode: response.status,
        success: true,
      };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      
      // Log error in development
      if (!isProduction()) {
        console.error('API Request Error:', {
          url,
          error,
          message: errorMessage,
        });
      }
      
      // If we have retries left, try again after delay
      if (attempts <= retries) {
        console.warn(`Retrying request (${attempts}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return executeRequest();
      }
      
      const apiResponse: ApiResponse<T> = {
        error: errorMessage,
        success: false,
      };
      
      if (showErrorToast) {
        toast({
          title: context,
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      return apiResponse;
    }
  };
  
  return executeRequest();
}

/**
 * Helper function for making GET requests
 */
export function apiGet<T = any>(
  url: string, 
  options: RequestInit = {}, 
  requestOptions: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { ...options, method: 'GET' }, requestOptions);
}

/**
 * Helper function for making POST requests
 */
export function apiPost<T = any>(
  url: string, 
  data: any, 
  options: RequestInit = {}, 
  requestOptions: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(
    url, 
    { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(data),
    }, 
    requestOptions
  );
}

/**
 * Helper function for making PUT requests
 */
export function apiPut<T = any>(
  url: string, 
  data: any, 
  options: RequestInit = {}, 
  requestOptions: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(
    url, 
    { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(data),
    }, 
    requestOptions
  );
}

/**
 * Helper function for making DELETE requests
 */
export function apiDelete<T = any>(
  url: string, 
  options: RequestInit = {}, 
  requestOptions: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { ...options, method: 'DELETE' }, requestOptions);
}
