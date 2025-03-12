
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { LoginLoading } from "./LoginLoading";
import { LoginContent } from "./LoginContent";
import { useLoginPage } from "./useLoginPage";
import { isDevelopmentMode } from "@/context/auth/utils";

const Login: React.FC = () => {
  const { 
    user,
    isAuthenticated,
    isLoading,
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess,
    language,
    forceReload
  } = useLoginPage();
  
  // Force development mode to be enabled for testing
  useEffect(() => {
    // Always set the forceDevMode flag when on login page
    console.log("Login page - Forcing development mode");
    localStorage.setItem('forceDevMode', 'true');
    
    // Also clear any old user data that might be causing conflicts
    if (!isAuthenticated) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      sessionStorage.removeItem('currentUser');
    }
    
    const currentMode = isDevelopmentMode();
    console.log("Login page - Development mode check:", currentMode);
  }, [isAuthenticated]);
  
  console.log("Login page rendering with state:", { 
    isLoading, 
    isAuthenticated, 
    user, 
    loginError,
    loginInProgress,
    isDevelopment: isDevelopmentMode(),
    hasUser: !!localStorage.getItem('currentUser'),
    storedRole: localStorage.getItem('userRole')
  });
  
  // Reset auth state if stuck in a strange state
  useEffect(() => {
    // If we're stuck in loading for too long, add a timeout to force reset
    const forceTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Login page - Forcing load state reset due to timeout");
        forceReload();
      }
    }, 1500); // Reduced timeout to 1.5 seconds
    
    return () => clearTimeout(forceTimeout);
  }, [isLoading, forceReload]);
  
  // Show loading state when authentication is being checked
  if (isLoading && !loginInProgress) {
    return <LoginLoading 
      isLoading={true} 
      isAuthenticated={isAuthenticated && !!user} 
      language={language} 
    />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <LoginContent
          handleLoginSuccess={handleLoginSuccess}
          loginInProgress={loginInProgress}
          loginError={loginError}
          redirectParam={redirectParam}
          language={language}
        />
      </main>
    </div>
  );
};

export default Login;
