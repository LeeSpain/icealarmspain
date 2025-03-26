
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Immediately remove any "Not found" messages
document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
  if (el instanceof HTMLElement) {
    el.style.display = 'none';
  }
});

// Force visibility of critical elements
document.documentElement.style.visibility = 'visible';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';

const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.style.visibility = 'visible';
  rootElement.style.display = 'block';
  rootElement.style.opacity = '1';
  
  // Clear any loading or "Not found" text
  if (rootElement.innerHTML.includes('Loading') || 
      rootElement.innerHTML.includes('Not found') ||
      rootElement.innerHTML.includes('Ice Guardian Alert')) {
    rootElement.innerHTML = '';
  }
  
  // Render immediately with no delays
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Extra safety - force clean rendering if any content still shows
setTimeout(() => {
  const root = document.getElementById('root');
  if (root) {
    // Clear any "Not found" or loading text
    if (root.innerHTML.includes('Not found') || 
        root.innerHTML.includes('Loading') ||
        root.innerHTML.includes('Ice Guardian Alert')) {
      root.innerHTML = '';
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
    
    // Force visibility again
    root.style.visibility = 'visible';
    root.style.display = 'block';
    root.style.opacity = '1';
  }
  
  // Hide any elements outside the root
  document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'none';
    }
  });
}, 10); // Extremely short timeout
