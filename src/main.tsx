
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/instant-render.ts'
import './utils/force-render.ts'
import './utils/fallback.ts'
import './utils/bypass-loading.ts'
import './utils/check-render.ts'

// Ensure body and root are immediately visible
document.body.style.visibility = 'visible';
document.body.style.display = 'block';
const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.style.visibility = 'visible';
  rootElement.style.display = 'block';
  rootElement.style.opacity = '1';
}

// Direct rendering with no delays or conditions
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Extra safety - force render again after a very short delay
setTimeout(() => {
  if (rootElement && rootElement.innerHTML.includes('Loading')) {
    console.log('Safety check - forcing clean render');
    rootElement.innerHTML = '';
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
}, 50);
