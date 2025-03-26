
/**
 * Simple instant render utility
 * Forces immediate rendering without any loading screens
 */

console.log("⚡ Rendering application...");

// Execute immediately
(() => {
  // Force all HTML elements to be visible
  document.documentElement.style.visibility = 'visible';
  document.documentElement.style.opacity = '1';
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  document.body.style.display = 'block';
  
  // Force root visibility
  const root = document.getElementById('root');
  if (root) {
    root.style.visibility = 'visible';
    root.style.opacity = '1';
    root.style.display = 'block';
    
    // Clear any loading text within root
    if (root.innerHTML.includes('Loading')) {
      root.innerHTML = '';
    }
  }
  
  // Remove any "Not found" messages outside the react app immediately
  document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
  
  // Hide any loading messages within the app
  document.querySelectorAll('.loading-screen, .loading-indicator, .loading').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
})();

// Apply again after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Remove any "Not found" messages outside the react app
  document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
  
  // Hide any loading messages within the app
  document.querySelectorAll('.loading-screen, .loading-indicator, .loading').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
  
  // Force root visibility again
  const root = document.getElementById('root');
  if (root) {
    root.style.visibility = 'visible';
    root.style.opacity = '1';
    root.style.display = 'block';
    
    // Clear any loading text
    if (root.innerHTML.includes('Loading')) {
      root.innerHTML = '';
    }
  }
});

export {};
