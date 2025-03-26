
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log("Starting application render")

// Get root element or create it if missing
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error("Root element not found, creating one")
  const newRoot = document.createElement('div')
  newRoot.id = 'root'
  document.body.appendChild(newRoot)
}

// Force visibility before rendering
document.documentElement.style.visibility = 'visible'
document.body.style.visibility = 'visible'

// Simple direct rendering with minimal error handling
ReactDOM.createRoot(rootElement || document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

console.log("Application rendered successfully")
