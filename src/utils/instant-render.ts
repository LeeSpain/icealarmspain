
/**
 * Simple instant render utility
 * Forces immediate rendering without complex logic
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
  console.log("DOM loaded - forcing visibility");
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
});

export {};
