
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
  
  // Important: Only show loading screen if we're loading AND haven't hit the timeout
  // This ensures users aren't stuck in a loading state
  if (isLoading && !authTimeout) {
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
