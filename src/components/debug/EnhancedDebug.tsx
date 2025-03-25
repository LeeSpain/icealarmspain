
import React, { useEffect, useState } from 'react';
import { isDevelopment, getEnvironment, getEnvironmentDiagnostics } from '@/utils/environment';

/**
 * Enhanced debug component that shows detailed diagnostics
 * Only visible in development by default, can be toggled with Ctrl+Shift+D
 */
const EnhancedDebug = () => {
  const [visible, setVisible] = useState(isDevelopment());
  const [expanded, setExpanded] = useState(false);
  const [diagnostics, setDiagnostics] = useState<Record<string, unknown>>({});
  const [domInfo, setDomInfo] = useState<Record<string, unknown>>({});
  
  useEffect(() => {
    console.log("EnhancedDebug component mounted");
    
    // Get environment diagnostics
    const envDiagnostics = getEnvironmentDiagnostics();
    setDiagnostics(envDiagnostics);
    
    // Setup keyboard shortcut to toggle visibility (Ctrl+Shift+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setVisible(prev => !prev);
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Collect DOM information
    const rootElement = document.getElementById('root');
    setDomInfo({
      rootExists: !!rootElement,
      rootChildNodes: rootElement?.childNodes.length || 0,
      bodyChildNodes: document.body.childNodes.length,
      windowInnerHeight: window.innerHeight,
      windowInnerWidth: window.innerWidth,
      userAgent: navigator.userAgent,
      devicePixelRatio: window.devicePixelRatio,
      scripts: document.scripts.length,
      stylesheets: document.styleSheets.length
    });
    
    // Log render verification
    console.log("EnhancedDebug: React is successfully rendering components");
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!visible) return null;
  
  return (
    <div id="enhanced-debug" className="fixed top-0 right-0 bg-amber-500 text-white p-4 z-50 max-w-md shadow-lg rounded-bl-lg">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Debug Panel</h3>
        <div className="space-x-2">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="px-2 py-1 bg-amber-600 rounded text-xs"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
          <button 
            onClick={() => setVisible(false)} 
            className="px-2 py-1 bg-amber-700 rounded text-xs"
          >
            Hide
          </button>
        </div>
      </div>
      
      <div className="text-sm mt-2">
        <p>Environment: <strong>{getEnvironment()}</strong></p>
        <p>Dev Mode: <strong>{isDevelopment() ? 'Yes' : 'No'}</strong></p>
        <p>Render Status: <strong>Active</strong></p>
      </div>
      
      {expanded && (
        <div className="mt-4 border-t border-amber-400 pt-2">
          <h4 className="font-bold mb-2">Environment Diagnostics</h4>
          <pre className="text-xs bg-amber-600 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(diagnostics, null, 2)}
          </pre>
          
          <h4 className="font-bold mb-2 mt-4">DOM Structure</h4>
          <pre className="text-xs bg-amber-600 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(domInfo, null, 2)}
          </pre>
          
          <div className="mt-4">
            <p className="text-xs">Press <kbd>Ctrl+Shift+D</kbd> to toggle this panel</p>
            <button
              onClick={() => {
                const root = document.getElementById('root');
                if (root) {
                  console.log('Root element HTML:', root.innerHTML.substring(0, 500) + '...');
                  alert('Root element HTML logged to console');
                }
              }}
              className="mt-2 px-2 py-1 bg-amber-700 rounded text-xs w-full"
            >
              Log Root Element HTML
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDebug;
