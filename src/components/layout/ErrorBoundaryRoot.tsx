
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Root level error boundary to catch application initialization errors
 */
class ErrorBoundaryRoot extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error("Root level error caught:", error, errorInfo);
  }

  private retry = (): void => {
    // Reset the error state and try to re-render
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // Error path
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Application Error</h1>
            
            <p className="text-gray-600 mb-6">
              We're sorry, but something went wrong while initializing the application.
            </p>
            
            <button
              onClick={this.retry}
              className="px-4 py-2 bg-ice-600 text-white rounded-md hover:bg-ice-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ice-500 focus:ring-opacity-50"
            >
              Reload Application
            </button>
            
            <div className="mt-6 text-sm text-gray-500">
              <p className="font-medium">Error details:</p>
              <div className="mt-2 text-left bg-gray-50 p-3 rounded-md overflow-auto max-h-32">
                <p>{this.state.error?.toString()}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Normal path
    return this.props.children;
  }
}

export default ErrorBoundaryRoot;
