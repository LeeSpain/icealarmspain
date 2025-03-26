
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/instant-render.ts'

// Get root element
const rootElement = document.getElementById('root')

// Direct rendering with no delays or conditions
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
