
import { toast } from "@/hooks/use-toast";

type ErrorWithMessage = {
  message: string;
};

type ErrorWithCode = {
  code: string;
  message?: string;
};

/**
 * Type guard to check if an error has a message property
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  );
}

/**
 * Type guard to check if an error has a code property
 */
function isErrorWithCode(error: unknown): error is ErrorWithCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as ErrorWithCode).code === 'string'
  );
}

/**
 * Extracts a human-readable message from any error type
 */
export function getErrorMessage(error: unknown): string {
  // Default error message
  let message = 'An unknown error occurred';
  
  if (isErrorWithMessage(error)) {
    message = error.message;
  } else if (isErrorWithCode(error)) {
    if (error.message) {
      message = error.message;
    } else {
      // Map common error codes to messages
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'User not found. Please check your credentials.';
          break;
        case 'auth/wrong-password':
          message = 'Invalid password. Please try again.';
          break;
        case 'auth/email-already-in-use':
          message = 'This email is already registered.';
          break;
        default:
          message = `Error code: ${error.code}`;
      }
    }
  } else if (typeof error === 'string') {
    message = error;
  }
  
  return message;
}

/**
 * Global error handler
 */
export function handleError(error: unknown, context?: string): string {
  const errorMessage = getErrorMessage(error);
  const contextPrefix = context ? `${context}: ` : '';
  const fullMessage = `${contextPrefix}${errorMessage}`;
  
  // Log to console
  console.error(fullMessage, error);
  
  return fullMessage;
}

/**
 * Shows an error toast
 */
export function showErrorToast(error: unknown, context?: string): void {
  const message = handleError(error, context);
  
  toast({
    title: context || "Error",
    description: message,
    variant: "destructive",
  });
}

/**
 * Async error handler - can be used with try/catch
 */
export async function tryAsync<T>(
  asyncFn: () => Promise<T>,
  options: {
    context?: string;
    showToast?: boolean;
    fallbackValue?: T;
  } = {}
): Promise<T | undefined> {
  const { context, showToast = true, fallbackValue } = options;
  
  try {
    return await asyncFn();
  } catch (error) {
    if (showToast) {
      showErrorToast(error, context);
    } else {
      handleError(error, context);
    }
    return fallbackValue;
  }
}
