
import React, { useEffect, useState } from 'react';
import { isDevelopment, getEnvironment, getEnvironmentDiagnostics } from '@/utils/environment';

/**
 * Enhanced debug component that shows detailed diagnostics in development mode
 * and can be toggled with a keyboard shortcut
 */
const EnhancedDebug = () => {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [diagnostics, setDiagnostics] = useState<Record<string, unknown>>({});
  
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
    
    // Check if CSS is working by testing a style
    const debugElement = document.getElementById('enhanced-debug');
    if (debugElement) {
      console.log("Debug element found in DOM");
      console.log("Debug element styles:", {
        backgroundColor: window.getComputedStyle(debugElement).backgroundColor,
        color: window.getComputedStyle(debugElement).color
      });
    } else {
      console.log("Debug element NOT found in DOM");
    }
    
    // Log render verification
    console.log("React is successfully rendering components");
    
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
          <div className="text-xs">
            <p>Root Element: <strong>{document.getElementById('root') ? 'Found' : 'Not Found'}</strong></p>
            <p>Child Nodes: <strong>{document.getElementById('root')?.childNodes.length || 0}</strong></p>
          </div>
          
          <div className="mt-4">
            <p className="text-xs">Press <kbd>Ctrl+Shift+D</kbd> to toggle this panel</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDebug;
