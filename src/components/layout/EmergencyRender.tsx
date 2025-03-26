
import React, { useEffect } from 'react';

interface EmergencyRenderProps {
  children: React.ReactNode;
}

/**
 * Simplified emergency render component
 * Only runs critical render logic once on mount
 */
const EmergencyRender: React.FC<EmergencyRenderProps> = ({ children }) => {
  useEffect(() => {
    console.log('EmergencyRender mounted - simpler version');
    
    // Single force visibility call
    document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
      
      // Clear any loading text
      if (root.innerHTML.includes('Loading') || 
          root.innerHTML.includes('Not found')) {
        console.log('Emergency clearing of loading text');
        root.innerHTML = '';
      }
    }
    
    // Clear any "Not found" messages outside the react app
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement && !el.id.includes('fallback')) {
        el.style.display = 'none';
      }
    });
    
    return () => {
      console.log('EmergencyRender unmounted');
    };
  }, []);
  
  return (
    <div id="emergency-render" style={{ display: 'contents' }}>
      {children}
    </div>
  );
};

export default EmergencyRender;
