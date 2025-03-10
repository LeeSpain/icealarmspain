
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
    authTimeout,
    handleLoginSuccess,
    language
  } = useLoginPage();
  
  console.log("Login page rendering with state:", { 
    isLoading, 
    isAuthenticated, 
    user, 
    authTimeout,
    loginError
  });
  
  // Force a new render if auth timeout occurs
  useEffect(() => {
    // This is just to ensure the component re-renders when auth times out
  }, [authTimeout]);
  
  // Render loading state only if:
  // 1. We're checking authentication AND
  // 2. We haven't hit the auth timeout AND
  // 3. We're already authenticated with a user
  if ((isLoading || (isAuthenticated && user)) && !authTimeout) {
    return <LoginLoading 
      isLoading={isLoading} 
      isAuthenticated={!!user} 
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
