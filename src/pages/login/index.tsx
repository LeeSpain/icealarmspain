
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    isMockAuth,
    handleLoginSuccess,
    language // Now this is correctly obtained from the hook
  } = useLoginPage();
  
  // Render loading state if authentication is being checked or user is already authenticated
  if (isLoading || (isAuthenticated && user)) {
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
          isMockAuth={isMockAuth}
          handleLoginSuccess={handleLoginSuccess}
          loginInProgress={loginInProgress}
          loginError={loginError}
          redirectParam={redirectParam}
          language={language}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
