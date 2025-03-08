
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from "@/components/mode-toggle"
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="ice-ui-theme">
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
