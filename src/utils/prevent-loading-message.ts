
/**
 * Prevent "Ice Guardian Alert" loading message from displaying
 * This is the most aggressive approach to prevent loading messages
 */

(function() {
  console.log('🛑 Preventing loading message utility running');
  
  // Define our mutation observer to catch any loading messages
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.target.nodeName === 'DIV') {
        const target = mutation.target;
        
        // Check if this is the root element or if it contains loading text
        if (target.id === 'root' || 
            (target instanceof HTMLElement && 
             (target.innerHTML.includes('Loading') || 
              target.innerHTML.includes('Ice Guardian Alert') ||
              target.innerHTML.includes('Not found')))) {
          
          // If we find loading text in the root or we added a loading message, clear it
          if (target.innerHTML.includes('Loading') || 
              target.innerHTML.includes('Ice Guardian Alert') ||
              target.innerHTML.includes('Not found')) {
            console.log('Observer caught loading text, clearing it');
            target.innerHTML = '';
          }
        }
      }
    });
  });
  
  // Start observing the document body for added nodes
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  
  // Also force clear any loading text immediately and repeatedly
  const clearLoadingText = () => {
    const root = document.getElementById('root');
    if (root) {
      if (root.innerHTML.includes('Loading') || 
          root.innerHTML.includes('Ice Guardian Alert') ||
          root.innerHTML.includes('Not found')) {
        console.log('Clearing loading text from root element');
        root.innerHTML = '';
      }
    }
  };
  
  // Run immediately and with various timeouts
  clearLoadingText();
  setTimeout(clearLoadingText, 0);
  setTimeout(clearLoadingText, 10);
  setTimeout(clearLoadingText, 100);
  setTimeout(clearLoadingText, 500);
  setTimeout(clearLoadingText, 1000);
  
  // Set a final timeout to reload the page if we still see loading text
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root && (root.innerHTML.includes('Loading') || 
                 root.innerHTML.includes('Ice Guardian Alert') ||
                 root.innerHTML.includes('Not found'))) {
      console.log('Still showing loading text after timeout - reloading page');
      window.location.reload();
    }
  }, 3000);
})();

export {};
