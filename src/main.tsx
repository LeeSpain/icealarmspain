
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './App.css';
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { BrowserRouter } from 'react-router-dom';

// Add console logs for debugging
console.log("main.tsx rendering");

// Rendering the application with all necessary providers
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <App />
          <Toaster />
          <ToastContainer />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
