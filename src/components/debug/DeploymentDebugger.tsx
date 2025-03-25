
import React, { useEffect, useState } from 'react';

interface DeploymentDebuggerProps {
  visible?: boolean;
}

const DeploymentDebugger: React.FC<DeploymentDebuggerProps> = ({ visible = true }) => {
  const [envInfo, setEnvInfo] = useState<Record<string, any>>({});
  const [buildInfo, setBuildInfo] = useState<Record<string, any>>({});
  const [appState, setAppState] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<Array<{ time: string; event: string }>>([]);
  const [errors, setErrors] = useState<Array<{ time: string; error: string }>>([]);

  useEffect(() => {
    // Collect environment information
    try {
      setEnvInfo({
        mode: import.meta.env.MODE,
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD,
        apiKeyDefined: !!import.meta.env.VITE_FIREBASE_API_KEY,
        projectIdDefined: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
        apiKeyLength: import.meta.env.VITE_FIREBASE_API_KEY ? import.meta.env.VITE_FIREBASE_API_KEY.length : 0,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      });
    } catch (error) {
      console.error('Error collecting environment info:', error);
    }

    // Collect build information
    try {
      setBuildInfo({
        buildVerified: window.buildVerified,
        buildInfo: window.buildInfo || {},
        timestamp: window.buildInfo?.timestamp || new Date().toISOString()
      });
    } catch (error) {
      console.error('Error collecting build info:', error);
    }

    // Collect app state
    try {
      setAppState({
        appRendered: window.appRendered,
        appRenderFailed: window.appRenderFailed,
        missingFirebaseConfig: window.missingFirebaseConfig,
        renderAttempted: window.appDiagnostics?.renderAttempted,
        renderCompleted: window.appDiagnostics?.renderCompleted,
        secondAttempt: window.appDiagnostics?.secondAttempt
      });
    } catch (error) {
      console.error('Error collecting app state:', error);
    }

    // Collect events and errors
    try {
      if (window.appDiagnostics?.events) {
        setEvents(window.appDiagnostics.events.slice(-20)); // Get last 20 events
      }

      if (window.appDiagnostics?.errors) {
        setErrors(window.appDiagnostics.errors);
      }
    } catch (error) {
      console.error('Error collecting events and errors:', error);
    }

    // Log to console for easier debugging
    console.log('DeploymentDebugger collected information:', {
      envInfo,
      buildInfo,
      appState,
      events: window.appDiagnostics?.events || [],
      errors: window.appDiagnostics?.errors || []
    });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 bg-white shadow-lg border-t border-l border-gray-200 p-4 overflow-auto max-h-[80vh] z-50 text-xs">
      <h2 className="text-lg font-bold mb-2 flex justify-between items-center">
        <span>Deployment Debugger</span>
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{envInfo.mode}</span>
      </h2>

      <div className="space-y-4">
        <section>
          <h3 className="font-semibold border-b border-gray-200 pb-1 mb-2">Environment</h3>
          <div className="grid grid-cols-2 gap-1">
            <div>Firebase API Key:</div>
            <div>{envInfo.apiKeyDefined ? '✅' : '❌'} {envInfo.apiKeyLength > 0 ? `(${envInfo.apiKeyLength} chars)` : ''}</div>
            
            <div>Firebase Project ID:</div>
            <div>{envInfo.projectIdDefined ? '✅' : '❌'}</div>
            
            <div>Mode:</div>
            <div>{envInfo.mode} {envInfo.isDev ? '(dev)' : envInfo.isProd ? '(prod)' : ''}</div>
          </div>
        </section>

        <section>
          <h3 className="font-semibold border-b border-gray-200 pb-1 mb-2">App State</h3>
          <div className="grid grid-cols-2 gap-1">
            <div>App Rendered:</div>
            <div>{appState.appRendered ? '✅' : '❌'}</div>
            
            <div>Render Failed:</div>
            <div>{appState.appRenderFailed ? '⚠️' : '✅'}</div>
            
            <div>Second Attempt:</div>
            <div>{appState.secondAttempt ? '⚠️' : '✅'}</div>
          </div>
        </section>

        {errors.length > 0 && (
          <section>
            <h3 className="font-semibold border-b border-gray-200 pb-1 mb-2 text-red-600">Errors ({errors.length})</h3>
            <div className="bg-red-50 p-2 rounded max-h-32 overflow-auto">
              {errors.map((error, index) => (
                <div key={index} className="border-b border-red-100 pb-1 mb-1 last:border-0 last:mb-0 last:pb-0">
                  <span className="text-gray-500">{error.time.split('T')[1].split('.')[0]}</span>: {error.error}
                </div>
              ))}
            </div>
          </section>
        )}

        {events.length > 0 && (
          <section>
            <h3 className="font-semibold border-b border-gray-200 pb-1 mb-2">Events (last {events.length})</h3>
            <div className="bg-gray-50 p-2 rounded max-h-32 overflow-auto">
              {events.map((event, index) => (
                <div key={index} className="border-b border-gray-200 pb-1 mb-1 last:border-0 last:mb-0 last:pb-0">
                  <span className="text-gray-500">{event.time.split('T')[1].split('.')[0]}</span>: {event.event}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="text-center mt-4">
          <button 
            onClick={() => {
              // Copy all debug info to clipboard
              const debugInfo = JSON.stringify({
                environment: envInfo,
                buildInfo: buildInfo,
                appState: appState,
                events: events,
                errors: errors,
                timestamp: new Date().toISOString()
              }, null, 2);
              
              navigator.clipboard.writeText(debugInfo);
              alert('Debug information copied to clipboard');
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
          >
            Copy Debug Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDebugger;
