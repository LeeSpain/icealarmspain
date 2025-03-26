
import React, { useEffect, useState } from 'react';

interface EmergencyRenderProps {
  children: React.ReactNode;
}

/**
 * Emergency render component that ensures the app is visible
 * This is a last resort to fix blank screens in production
 */
const EmergencyRender: React.FC<EmergencyRenderProps> = ({ children }) => {
  const [renderAttempt, setRenderAttempt] = useState(0);
  
  useEffect(() => {
    console.log('EmergencyRender mounted');
    
    // Force visibility of all elements
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Multiple checks at different intervals
    const intervals = [10, 50, 100, 500, 1000];
    intervals.forEach((ms, index) => {
      setTimeout(() => {
        setRenderAttempt(prev => prev + 1);
        
        // Force visibility at each interval
        document.documentElement.style.visibility = 'visible';
        document.body.style.visibility = 'visible';
        
        // Log environment info at final interval for debugging
        if (index === intervals.length - 1) {
          console.log('Final render check. Environment:', {
            mode: import.meta.env.MODE,
            prod: import.meta.env.PROD,
            firebaseConfig: import.meta.env.VITE_FIREBASE_API_KEY ? 'present' : 'missing'
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
    
  }, []);
  
  return (
    <div id="emergency-render" style={{ minHeight: '100vh', width: '100%' }}>
      {children}
    </div>
  );
};

export default EmergencyRender;
