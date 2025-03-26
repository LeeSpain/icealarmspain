
/**
 * Instant render utility
 * Forces immediate rendering of the application
 */

console.log("⚡ Instant render utility running");

// Execute immediately
document.documentElement.style.visibility = 'visible';
document.documentElement.style.opacity = '1';
document.documentElement.style.display = 'block';

document.body.style.visibility = 'visible';
document.body.style.opacity = '1';
document.body.style.display = 'block';

// Force root visibility
const root = document.getElementById('root');
if (root) {
  root.style.visibility = 'visible';
  root.style.opacity = '1';
  root.style.display = 'block';
  
  // Clear any "Loading..." text
  if (root.innerHTML.includes('Loading application')) {
    root.innerHTML = '';
  }
}

// Remove any loading indicators
document.querySelectorAll('.loading-indicator, .spinner, .loading-screen').forEach(el => {
  if (el instanceof HTMLElement) {
    el.style.display = 'none';
  }
});

// Execute on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded - force rendering");
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
});

export {};
