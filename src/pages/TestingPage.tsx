
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasValidFirebaseConfig, getEnvironmentDiagnostics } from '@/utils/environment';
import DeploymentDebugger from '@/components/debug/DeploymentDebugger';
import CriticalDebug from '@/components/debug/CriticalDebug';
import EmergencyInitializer from '@/components/debug/EmergencyInitializer';

const TestingPage: React.FC = () => {
  const [envInfo, setEnvInfo] = useState<Record<string, any>>({});
  const [initStatus, setInitStatus] = useState<string>('checking');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    console.log('TestingPage mounted - running diagnostics');
    
    // Collect environment information
    try {
      const diagnostics = getEnvironmentDiagnostics();
      setEnvInfo(diagnostics);
      console.log('Environment diagnostics:', diagnostics);
      
      // Check for critical issues
      if (!hasValidFirebaseConfig()) {
        setInitStatus('config-error');
        setErrorDetails('Missing or invalid Firebase configuration');
      } else {
        setInitStatus('ok');
      }
    } catch (error) {
      console.error('Error collecting diagnostics:', error);
      setInitStatus('error');
      setErrorDetails(error instanceof Error ? error.message : 'Unknown error');
    }
    
    // Add this to diagnose when the component is actually rendering
    document.body.classList.add('test-page-rendered');
    
    // Force the emergency initializer to run
    if (typeof window !== 'undefined') {
      window.appDiagnostics = window.appDiagnostics || {
        startTime: new Date().toISOString(),
        events: [],
        errors: []
      };
      
      // Ensure arrays exist
      if (!window.appDiagnostics.events) {
        window.appDiagnostics.events = [];
      }
      
      if (!window.appDiagnostics.errors) {
        window.appDiagnostics.errors = [];
      }
      
      // Log this event
      window.appDiagnostics.events.push({
        time: new Date().toISOString(),
        event: 'TestingPage mounted'
      });
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <EmergencyInitializer />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Ice Guardian Deployment Test Page</h1>
            <p className="text-blue-100">This page helps diagnose app initialization issues</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className={`w-4 h-4 rounded-full mr-2 ${
                initStatus === 'ok' ? 'bg-green-500' : 
                initStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="font-semibold">
                Status: {
                  initStatus === 'ok' ? 'All systems operational' : 
                  initStatus === 'checking' ? 'Running diagnostics...' :
                  initStatus === 'config-error' ? 'Configuration error' : 'Initialization error'
                }
              </span>
            </div>
            
            {errorDetails && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                <p className="font-medium">Error detected:</p>
                <p>{errorDetails}</p>
              </div>
            )}
            
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Environment Information</h2>
                <div className="bg-gray-50 p-4 rounded overflow-auto max-h-40">
                  <pre className="text-xs">{JSON.stringify(envInfo, null, 2)}</pre>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Manual Initialization</h2>
                <p className="mb-4">Try manually triggering the app initialization process:</p>
                <button 
                  onClick={() => {
                    console.log('Manual render attempt triggered');
                    if (typeof window !== 'undefined' && window.renderApp) {
                      console.log('Calling window.renderApp()');
                      try {
                        window.renderApp();
                      } catch (error) {
                        console.error('Error calling window.renderApp():', error);
                        setErrorDetails(error instanceof Error ? error.message : 'Error calling renderApp');
                      }
                    } else {
                      console.error('window.renderApp function not found');
                      setErrorDetails('The renderApp function is not available');
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Try Manual Render
                </button>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Navigation Links</h2>
                <p className="mb-4">Try navigating to different routes:</p>
                <div className="space-y-2">
                  <Link to="/" className="block text-blue-600 hover:underline">Home Page</Link>
                  <Link to="/about" className="block text-blue-600 hover:underline">About Page</Link>
                  <Link to="/dashboard" className="block text-blue-600 hover:underline">Dashboard (protected)</Link>
                </div>
              </section>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <CriticalDebug />
        </div>
        
        <div className="mt-8">
          <DeploymentDebugger visible={true} />
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
