/**
 * A last resort utility to ensure content is visible and the spinner is hidden
 * This will run after other checks and should forcefully make the application visible
 */

// Self-executing function to isolate scope
(function() {
  console.log('🚨 Renderer rescue utility running');
  
  // Define a function to hide the spinner
  function hideLoadingSpinner() {
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      spinner.style.opacity = '0';
      setTimeout(() => {
        spinner.style.display = 'none';
        console.log('Spinner hidden by renderer-rescue');
      }, 100);
    }
  }
  
  // Define a function to ensure the root element is visible
  function ensureRootVisible() {
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
      console.log('Root element visibility enforced');
    }
  }
  
  // Call these functions immediately
  hideLoadingSpinner();
  ensureRootVisible();
  
  // Then set up various timeouts to keep checking
  const checkTimes = [500, 1000, 2000, 3000, 5000];
  checkTimes.forEach(time => {
    setTimeout(() => {
      hideLoadingSpinner();
      ensureRootVisible();
    }, time);
  });
  
  // Also attach to window load event
  window.addEventListener('load', () => {
    hideLoadingSpinner();
    ensureRootVisible();
    console.log('Window load event: forcing content visibility');
  });
})();

export {};
