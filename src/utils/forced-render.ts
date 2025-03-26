
/**
 * Forced render utility
 * Ensures the app renders immediately with no loading screens
 */

(() => {
  console.log("Forced render utility running");
  
  // Execute immediately to force visibility
  document.documentElement.style.visibility = 'visible';
  document.documentElement.style.opacity = '1';
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  // Force root visibility
  const root = document.getElementById('root');
  if (root) {
    root.style.visibility = 'visible';
    root.style.opacity = '1';
    
    // Clear any "Loading..." text
    if (root.innerHTML.includes('Loading application')) {
      root.innerHTML = '';
    }
  }
  
  // Remove any loading indicators or spinner overlays
  document.querySelectorAll('.loading-indicator, .spinner').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
})();

export {};
