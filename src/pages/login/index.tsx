
import React from "react";
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
    authTimeout 
  });
  
  // Render loading state if authentication is being checked or user is already authenticated
  // But don't render loading if there's an auth timeout
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
