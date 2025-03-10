
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { LoginLoading } from "./LoginLoading";
import { LoginContent } from "./LoginContent";
import { useLoginPage } from "./useLoginPage";

const Login: React.FC = () => {
  const { 
    user,
    isAuthenticated,
    isLoading,
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess,
    language
  } = useLoginPage();
  
  console.log("Login page rendering with state:", { 
    isLoading, 
    isAuthenticated, 
    user, 
    loginError,
    loginInProgress
  });
  
  // Reset auth state if stuck in a strange state
  useEffect(() => {
    // If we're stuck in loading for too long, add a timeout to force reset
    const forceTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Login page - Forcing load state reset due to timeout");
        // Force reload the page to reset all state
        window.location.reload();
      }
    }, 8000); // 8 seconds timeout
    
    return () => clearTimeout(forceTimeout);
  }, [isLoading]);
  
  // Show loading state when authentication is being checked
  // but NOT when login is in progress (that shows a different loading state)
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
