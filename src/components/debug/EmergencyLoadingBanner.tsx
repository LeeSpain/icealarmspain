
import React, { useState, useEffect } from 'react';
import { hasValidFirebaseConfig } from '@/utils/environment';

/**
 * Emergency banner that shows up when the app isn't loading properly
 * Helps users navigate to the testing page to diagnose and fix issues
 */
const EmergencyLoadingBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
    firebase: false,
    root: false,
    appRendered: false
  });
  
  useEffect(() => {
    // Only show after a slight delay to avoid flickering on normal loads
    const timer = setTimeout(() => {
      // Check for signs of initialization problems
      const root = document.getElementById('root');
      const rootEmpty = root && (!root.children || root.children.length === 0);
      const firebaseConfig = hasValidFirebaseConfig();
      const appRendered = window.appRendered === true;
      
      setConfig({
        firebase: firebaseConfig,
        root: !rootEmpty,
        appRendered
      });
      
      // Show the banner if there are initialization problems
      if (rootEmpty || !appRendered) {
        setVisible(true);
        console.log('Showing emergency banner due to initialization problems');
      }
    }, 3000); // Show after 3 seconds if the app isn't properly initialized
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) {
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white p-4 z-50 shadow-lg" style={{ zIndex: 9999 }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">Emergency Recovery Mode</h2>
            <p>The application is experiencing initialization issues.</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.href = '/testing'}
              className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-red-100 transition-colors"
            >
              Go to Test Page
            </button>
            
            <button 
              onClick={() => {
                if (typeof window.renderApp === 'function') {
                  try {
                    window.renderApp();
                    console.log('Manual render triggered from emergency banner');
                  } catch (e) {
                    console.error('Error in manual render:', e);
                  }
                }
              }}
              className="bg-red-700 text-white px-4 py-2 rounded font-medium hover:bg-red-800 transition-colors"
            >
              Try to Fix
            </button>
            
            <button 
              onClick={() => setVisible(false)}
              className="bg-transparent text-white px-3 py-2 rounded font-medium hover:bg-red-700 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-red-200">
          <div className="flex gap-4">
            <span>Firebase Config: {config.firebase ? '✅' : '❌'}</span>
            <span>Root Element: {config.root ? '✅' : '❌'}</span>
            <span>App Rendered: {config.appRendered ? '✅' : '❌'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLoadingBanner;
