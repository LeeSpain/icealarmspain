
import { toast } from '@/components/ui/use-toast';

/**
 * Get a formatted error message from any error type
 */
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === 'object') {
    return error.message || error.error || JSON.stringify(error);
  }
  return 'An unexpected error occurred';
}

/**
 * Shows an error toast with a formatted error message
 */
export function showErrorToast(error: any, context: string = 'Operation') {
  console.error(`${context} error:`, error);
  
  let errorMessage = getErrorMessage(error);
  
  toast({
    title: `${context} Failed`,
    description: errorMessage,
    variant: "destructive",
  });
}

/**
 * Formats an error message for display
 */
export function formatErrorMessage(error: any): string {
  return getErrorMessage(error);
}

/**
 * Handles API errors and returns a formatted response
 */
export function handleApiError<T>(error: any, defaultValue: T): { data: T; error: string } {
  console.error('API Error:', error);
  return {
    data: defaultValue,
    error: formatErrorMessage(error)
  };
}

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  code?: string;
  details?: any;
  
  constructor(message: string, code?: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}
