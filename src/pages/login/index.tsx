
import React, { useRef } from "react";
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
    authTimeout,
    handleLoginSuccess,
    language
  } = useLoginPage();
  
  // Prevent render loop with refs
  const renderCountRef = useRef(0);
  
  console.log("Login page rendering with state:", { 
    isLoading, 
    isAuthenticated, 
    user, 
    authTimeout,
    loginError,
    renderCount: renderCountRef.current++
  });
  
  // CRITICAL: If more than 3 renders and still loading, force the login form
  const shouldForceLoginForm = renderCountRef.current > 3 && isLoading;
  
  // Important: Only show loading screen if we're loading AND haven't hit the timeout AND are not forcing login form
  // This ensures users aren't stuck in a loading state
  if (isLoading && !authTimeout && !shouldForceLoginForm) {
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
          loginError={loginError || (shouldForceLoginForm ? "Authentication service timed out. Please sign in manually." : null)}
          redirectParam={redirectParam}
          language={language}
        />
      </main>
    </div>
  );
};

export default Login;
