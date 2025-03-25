
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AuthProvider } from "./context/auth";

function App() {
  console.log("App component rendering");
  
  return (
    <HelmetProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {routes.map((route) => {
                console.log(`Registering route: ${route.path}`);
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Routes>
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
  );
}

export default App;
