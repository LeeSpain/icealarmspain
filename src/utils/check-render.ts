
/**
 * This utility forces DOM elements to be visible
 * It adds a MutationObserver to detect DOM changes
 */

// Self-executing function for immediate execution
(function checkRender() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  console.log('🔍 Starting visibility enforcement');
  
  // Apply visibility immediately
  const setVisibility = () => {
    // Force root to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
      root.style.minHeight = '100vh';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }

    // Force App to be visible
    const app = document.querySelector('.App');
    if (app) {
      (app as HTMLElement).style.visibility = 'visible';
      (app as HTMLElement).style.opacity = '1';
      (app as HTMLElement).style.display = 'flex';
      (app as HTMLElement).style.flexDirection = 'column';
      (app as HTMLElement).style.minHeight = '100vh';
    }

    // Force body and html to be visible
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
  };
  
  // Apply visibility fixes repeatedly
  setVisibility();
  
  // Run again after a short delay
  setTimeout(setVisibility, 50);
  setTimeout(setVisibility, 100);
  setTimeout(setVisibility, 500);
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setVisibility);
  }
  
  // Set up observer to monitor DOM changes
  const observer = new MutationObserver(() => {
    setVisibility();
  });
  
  // Start observing
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();

export {};
