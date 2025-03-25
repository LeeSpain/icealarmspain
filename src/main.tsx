
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  // Create the React root and render directly - no error boundaries that might block rendering
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log("React app rendered successfully");
}
