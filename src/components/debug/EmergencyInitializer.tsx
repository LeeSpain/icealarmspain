
import React, { useEffect, useState, useRef } from 'react';

/**
 * Emergency initializer component that forces core app systems to initialize
 * This is a last resort to make sure the app can start when other initialization fails
 */
const EmergencyInitializer: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const attemptRef = useRef(0);
  
  useEffect(() => {
    console.log('EmergencyInitializer mounted - initializing core systems');
    
    // Ensure the diagnostics object exists and is properly initialized
    if (typeof window !== 'undefined') {
      if (!window.appDiagnostics) {
        console.log('Creating missing appDiagnostics object');
        window.appDiagnostics = {
          startTime: new Date().toISOString(),
          events: [],
          errors: [],
          environment: import.meta.env.MODE || 'unknown',
          firebaseConfigValid: !!import.meta.env.VITE_FIREBASE_API_KEY && !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
          renderAttempted: false,
          renderCompleted: false,
          renderTime: null,
          secondAttempt: false
        };
      } else {
        // Make sure all properties exist
        window.appDiagnostics.events = window.appDiagnostics.events || [];
        window.appDiagnostics.errors = window.appDiagnostics.errors || [];
        window.appDiagnostics.environment = window.appDiagnostics.environment || import.meta.env.MODE || 'unknown';
        window.appDiagnostics.firebaseConfigValid = window.appDiagnostics.firebaseConfigValid !== undefined ? 
          window.appDiagnostics.firebaseConfigValid : 
          !!import.meta.env.VITE_FIREBASE_API_KEY && !!import.meta.env.VITE_FIREBASE_PROJECT_ID;
      }
      
      // Add initialization event
      if (window.appDiagnostics.events) {
        window.appDiagnostics.events.push({
          time: new Date().toISOString(),
          event: 'EmergencyInitializer mounted'
        });
      }
      
      // Set build verification flags if missing
      if (window.buildVerified === undefined) {
        window.buildVerified = true;
      }
      
      if (!window.buildInfo) {
        window.buildInfo = {
          timestamp: new Date().toISOString(),
          environment: import.meta.env.MODE || 'unknown',
          firebaseConfigComplete: !!import.meta.env.VITE_FIREBASE_API_KEY && 
                                 !!import.meta.env.VITE_FIREBASE_PROJECT_ID
        };
      }
      
      // Try to force render if app isn't rendered yet
      if (!window.appRendered) {
        const attemptEmergencyRender = () => {
          attemptRef.current += 1;
          setAttempts(attemptRef.current);
          
          console.log(`EmergencyInitializer: Render attempt ${attemptRef.current}`);
          
          if (window.appDiagnostics && window.appDiagnostics.events) {
            window.appDiagnostics.events.push({
              time: new Date().toISOString(),
              event: `EmergencyInitializer render attempt ${attemptRef.current}`
            });
          }
          
          try {
            if (typeof window.renderApp === 'function') {
              console.log('Calling window.renderApp() from EmergencyInitializer');
              window.renderApp();
            } else {
              console.warn('window.renderApp is not a function');
              
              // Fallback code - manually update the DOM if possible
              const root = document.getElementById('root');
              if (root && (!root.children || root.children.length === 0)) {
                console.log('Attempting direct DOM update for empty root');
                root.innerHTML = `
                  <div style="text-align: center; padding: 20px;">
                    <h2>Emergency Recovery Mode</h2>
                    <p>The application is recovering from an initialization failure.</p>
                    <p>Please wait while we attempt to restore functionality...</p>
                  </div>
                `;
              }
            }
          } catch (error) {
            console.error('Error in emergency render attempt:', error);
            if (window.appDiagnostics && window.appDiagnostics.errors) {
              window.appDiagnostics.errors.push({
                time: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error in emergency render'
              });
            }
          }
          
          // Check if we succeeded
          if (window.appRendered) {
            console.log('App successfully rendered after emergency initialization');
            if (window.appDiagnostics && window.appDiagnostics.events) {
              window.appDiagnostics.events.push({
                time: new Date().toISOString(),
                event: 'App successfully rendered after emergency initialization'
              });
            }
            setInitialized(true);
            return true;
          }
          
          return false;
        };
        
        // Try immediately
        const success = attemptEmergencyRender();
        
        // If not successful, try again with increasing delays
        if (!success && attemptRef.current < 3) {
          const timeouts = [1000, 3000, 5000]; // Milliseconds
          
          timeouts.forEach((timeout, index) => {
            if (index < 3 - attemptRef.current) {
              setTimeout(() => {
                if (!window.appRendered) {
                  attemptEmergencyRender();
                }
              }, timeout);
            }
          });
        }
      } else {
        console.log('App already rendered, no emergency initialization needed');
        setInitialized(true);
      }
    }
  }, []);
  
  // Don't render anything visible
  return (
    <div id="emergency-initializer" style={{display: 'none'}} data-initialized={initialized.toString()} data-attempts={attempts}>
      {/* Hidden component to force initialization */}
    </div>
  );
};

export default EmergencyInitializer;
