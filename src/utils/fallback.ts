
/**
 * Fallback rendering utility
 * This ensures something always renders even if the main app fails
 */

(() => {
  // Longer timeout to ensure app has time to render
  const RENDER_TIMEOUT = 10000;
  
  setTimeout(() => {
    const root = document.getElementById('root');
    const app = document.querySelector('.App');
    
    // If the app hasn't rendered properly, show a fallback UI
    if (!app || (root && (root.children.length <= 1 || !root.innerHTML.includes('Hero')))) {
      console.error('Application failed to render within timeout, showing fallback UI');
      
      if (root) {
        root.innerHTML = `
          <div style="padding: 40px; text-align: center; font-family: system-ui, sans-serif;">
            <h1 style="font-size: 24px; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p style="margin-bottom: 24px;">Our application is experiencing a temporary issue.</p>
            <button onclick="window.location.reload()" 
              style="background: #0070f3; color: white; border: none; padding: 8px 16px; 
              border-radius: 4px; cursor: pointer; font-size: 14px;">
              Reload Application
            </button>
          </div>
        `;
      }
    }
  }, RENDER_TIMEOUT);
})();

export {};
