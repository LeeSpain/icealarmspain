
import React, { useEffect, useState } from 'react';

interface EmergencyRenderProps {
  children: React.ReactNode;
}

/**
 * Ultra aggressive emergency render component
 * This is a last resort to fix blank screens in production
 */
const EmergencyRender: React.FC<EmergencyRenderProps> = ({ children }) => {
  const [renderAttempt, setRenderAttempt] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  
  useEffect(() => {
    console.log('EmergencyRender mounted - ultra aggressive version');
    
    // Force visibility of all elements using the most direct approach
    document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
      
      // Aggressively clear any loading text
      if (root.innerHTML.includes('Loading') || 
          root.innerHTML.includes('Not found') ||
          root.innerHTML.includes('Ice Guardian Alert')) {
        console.log('Emergency clearing of loading text');
        root.innerHTML = '';
      }
    }
    
    // Multiple aggressive checks at ultra-short intervals
    const intervals = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000];
    intervals.forEach((ms, index) => {
      setTimeout(() => {
        setRenderAttempt(prev => prev + 1);
        
        // Force visibility at each interval with direct style manipulation
        document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
        document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
        
        if (root) {
          root.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
        }
        
        // Clear any "Not found" messages outside the react app
        document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
          if (el instanceof HTMLElement && 
              !el.id.includes('fallback') && 
              !el.classList.contains('js-error-recovery')) {
            el.style.display = 'none';
          }
        });
        
        // Log environment info at final interval for debugging
        if (index === intervals.length - 1) {
          setShowDebug(true);
          console.log('Final emergency render check. Environment:', {
            mode: import.meta.env.MODE,
            prod: import.meta.env.PROD,
            firebaseConfig: import.meta.env.VITE_FIREBASE_API_KEY ? 'present' : 'missing',
            renderAttempts: renderAttempt + 1
          });
        }
      }, ms);
    });
    
    // Clear any stray loading elements
    document.querySelectorAll('.loading-indicator, .loading-screen, .loading').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Return cleanup function
    return () => {
      console.log('EmergencyRender unmounted');
    };
  }, []);
  
  return (
    <div id="emergency-render" style={{ minHeight: '100vh', width: '100%', visibility: 'visible', display: 'block' }}>
      {children}
      {showDebug && import.meta.env.DEV && renderAttempt >= 5 && (
        <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#f3f4f6', padding: 10, borderRadius: 4, fontSize: 12, zIndex: 9999 }}>
          Emergency render attempts: {renderAttempt}
        </div>
      )}
    </div>
  );
};

export default EmergencyRender;
