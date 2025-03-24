
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              {routes.map((route) => {
                // Protected routes with optional role restrictions
                if (route.protected) {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <AuthGuard allowedRoles={route.allowedRoles}>
                          {route.element}
                        </AuthGuard>
                      }
                    />
                  );
                }
                // Regular routes
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Routes>
          </Router>
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
