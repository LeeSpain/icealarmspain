
/**
 * Build verification utility
 * This script helps identify build-specific issues
 */

// Define the extended Performance interface to support memory
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

// Execute immediately
(() => {
  try {
    console.log('🔍 Build verification starting');
    
    // Log environment information
    const env = {
      environment: import.meta.env.VITE_ENVIRONMENT || 'unknown',
      buildTime: import.meta.env.VITE_BUILD_TIME || 'unknown',
      buildMode: import.meta.env.MODE || 'unknown',
      debug: import.meta.env.VITE_DEBUG_BUILD === 'true',
    };
    
    console.log('📊 Environment:', env);
    
    // Check for critical resources
    setTimeout(() => {
      try {
        // Verify DOM structure
        const rootEl = document.getElementById('root');
        if (!rootEl) {
          console.error('❌ Root element missing');
        } else {
          console.log('✅ Root element exists');
        }
        
        // Verify React has initialized
        const appEl = document.querySelector('.App');
        if (!appEl) {
          console.error('❌ App element missing - React may not have initialized');
        } else {
          console.log('✅ App element exists - React has initialized');
        }
        
        // Verify route rendering
        const contentEls = document.querySelectorAll('#root > .App > *');
        console.log(`📄 Content elements: ${contentEls.length}`);
        
        // Log memory usage if available
        const extendedPerformance = performance as ExtendedPerformance;
        if (extendedPerformance && extendedPerformance.memory) {
          console.log('💾 Memory:', {
            usedJSHeapSize: Math.round(extendedPerformance.memory.usedJSHeapSize / (1024 * 1024)) + 'MB',
            totalJSHeapSize: Math.round(extendedPerformance.memory.totalJSHeapSize / (1024 * 1024)) + 'MB',
          });
        }
      } catch (error) {
        console.error('Error during build verification checks:', error);
      }
    }, 1000);
    
    // Add a window property to indicate build verification ran
    window.__ICE_GUARDIAN_BUILD_VERIFIED = true;
    
  } catch (error) {
    console.error('Build verification error:', error);
  }
})();

// Add build info to window for debugging
declare global {
  interface Window {
    __ICE_GUARDIAN_BUILD_VERIFIED?: boolean;
  }
}

export {};
