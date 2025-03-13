
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/auth";
import ScrollToTop from "./components/layout/ScrollToTop";
import { routes } from "./routes";

function App() {
  console.log("App rendering");
  
  return (
    <Router>
      <HelmetProvider>
        <LanguageProvider>
          <AuthProvider>
            <ScrollToTop />
            <div className="App">
              <Routes>
                {routes.map((route, index) => (
                  <Route 
                    key={`route-${index}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
