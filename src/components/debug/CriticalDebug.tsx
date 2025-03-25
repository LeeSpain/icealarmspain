
import React, { useEffect, useState } from 'react';

/**
 * Emergency debug component that renders when other components fail
 * This component will display critical information about the application state
 */
const CriticalDebug: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<any>({});
  const [environment, setEnvironment] = useState<string>('unknown');
  
  useEffect(() => {
    console.log("CriticalDebug component mounted - collecting information");
    
    try {
      // Collect diagnostic information
      const appDiagnostics = window.appDiagnostics || {};
      const envInfo = {
        mode: import.meta.env.MODE,
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD,
        firebaseApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
        firebaseProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
      };
      
      setDiagnostics({
        ...appDiagnostics,
        envInfo,
        rootElement: !!document.getElementById('root'),
        buildVerified: window.buildVerified,
        appRendered: window.appRendered,
        missingFirebaseConfig: window.missingFirebaseConfig,
        timestamp: new Date().toISOString()
      });
      
      setEnvironment(import.meta.env.MODE || 'unknown');
      
      // Log this information to the console for debugging
      console.log("CriticalDebug collected information:", {
        ...appDiagnostics,
        envInfo,
        rootElement: !!document.getElementById('root'),
        buildVerified: window.buildVerified,
        appRendered: window.appRendered,
        missingFirebaseConfig: window.missingFirebaseConfig
      });
      
      // Try to dispatch a custom event that can be captured by analytics
      document.dispatchEvent(new CustomEvent('critical-debug-mounted', {
        detail: {
          timestamp: new Date().toISOString(),
          environment: import.meta.env.MODE
        }
      }));
    } catch (error) {
      console.error("Error in CriticalDebug:", error);
      setDiagnostics({ error: String(error) });
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-red-300 mt-10">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Application Diagnostic Information</h1>
      
      <div className="bg-red-50 p-4 rounded-md mb-6">
        <p className="font-medium">The application failed to initialize properly. This debugging information may help identify the issue:</p>
      </div>
      
      <h2 className="text-lg font-semibold mb-2">Environment</h2>
      <div className="mb-4 bg-gray-50 p-3 rounded">
        <p><strong>Mode:</strong> {environment}</p>
        <p><strong>Firebase API Key defined:</strong> {diagnostics.envInfo?.firebaseApiKey ? 'Yes' : 'No'}</p>
        <p><strong>Firebase Project ID defined:</strong> {diagnostics.envInfo?.firebaseProjectId ? 'Yes' : 'No'}</p>
      </div>
      
      <h2 className="text-lg font-semibold mb-2">Application State</h2>
      <div className="mb-4 bg-gray-50 p-3 rounded">
        <p><strong>Build Verified:</strong> {diagnostics.buildVerified ? 'Yes' : 'No'}</p>
        <p><strong>App Rendered:</strong> {diagnostics.appRendered ? 'Yes' : 'No'}</p>
        <p><strong>Render Attempted:</strong> {diagnostics.renderAttempted ? 'Yes' : 'No'}</p>
        <p><strong>Missing Firebase Config:</strong> {diagnostics.missingFirebaseConfig ? 'Yes' : 'No'}</p>
        <p><strong>Root Element Present:</strong> {diagnostics.rootElement ? 'Yes' : 'No'}</p>
      </div>
      
      {diagnostics.events && diagnostics.events.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2">Event Log</h2>
          <div className="mb-4 bg-gray-50 p-3 rounded overflow-auto max-h-40">
            <ul className="list-disc pl-5">
              {diagnostics.events.slice(-10).map((event: any, index: number) => (
                <li key={index} className="mb-1">
                  <span className="text-gray-500 text-sm">{event.time.split('T')[1].split('.')[0]}</span>: {event.event}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      {diagnostics.errors && diagnostics.errors.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2">Error Log</h2>
          <div className="mb-4 bg-red-50 p-3 rounded overflow-auto max-h-40">
            <ul className="list-disc pl-5">
              {diagnostics.errors.map((error: any, index: number) => (
                <li key={index} className="mb-1 text-red-600">
                  <span className="text-gray-500 text-sm">{error.time.split('T')[1].split('.')[0]}</span>: {error.error}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Steps</h2>
        <ol className="list-decimal pl-6">
          <li className="mb-2">Ensure Firebase environment variables are correctly set in your Vercel deployment</li>
          <li className="mb-2">Check that your Firebase project is active and properly configured</li>
          <li className="mb-2">Clear browser cache and cookies, then reload the page</li>
          <li className="mb-2">Try accessing the site in an incognito/private browsing window</li>
          <li className="mb-2">Review browser console logs for specific error messages</li>
        </ol>
      </div>
    </div>
  );
};

export default CriticalDebug;
