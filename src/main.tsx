
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  // Create the root and render the app in a simpler way
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found! Cannot render React app.");
}
