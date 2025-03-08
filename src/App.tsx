
import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DeviceShowcase from "./components/DeviceShowcase";
import Pricing from "./components/Pricing";
import ExpatInfo from "./components/ExpatInfo";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/auth";

function App() {
  useEffect(() => {
    console.log("App component mounted");
    
    // Add additional debugging
    const rootElement = document.getElementById('root');
    console.log("Root element:", rootElement);
    
    const bodyElement = document.body;
    console.log("Body styles:", {
      backgroundColor: window.getComputedStyle(bodyElement).backgroundColor,
      color: window.getComputedStyle(bodyElement).color
    });
  }, []);
  
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
            <Navbar />
            
            <main className="flex-grow relative">
              <Hero />
              
              <DeviceShowcase />
              
              <Pricing />
              
              <ExpatInfo />
            </main>
            
            <Footer />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
