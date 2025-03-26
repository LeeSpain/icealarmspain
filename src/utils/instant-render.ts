
/**
 * Simple instant render utility
 * Forces immediate rendering without any loading screens
 */

console.log("⚡ Rendering application...");

// Execute immediately
document.documentElement.style.visibility = 'visible';
document.documentElement.style.opacity = '1';
document.body.style.visibility = 'visible';
document.body.style.opacity = '1';

// Force root visibility
const root = document.getElementById('root');
if (root) {
  root.style.visibility = 'visible';
  root.style.opacity = '1';
}

// Apply when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Remove any "Not found" messages outside the react app
  document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
  
  // Hide any loading messages within the app
  const loadingElements = document.querySelectorAll('.loading-screen, .loading-indicator');
  loadingElements.forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
});

export {};
