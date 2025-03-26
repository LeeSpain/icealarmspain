
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Import the instant render utility first to ensure it runs before anything else
import './utils/instant-render'

// Simple direct rendering - no error handling or complex logic
const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />)
} else {
  console.error("Root element not found")
  // Create a root element if missing
  const newRoot = document.createElement('div')
  newRoot.id = 'root'
  document.body.appendChild(newRoot)
  ReactDOM.createRoot(newRoot).render(<App />)
}

console.log("Application rendered")
