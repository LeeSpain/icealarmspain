
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { LoginLoading } from "./LoginLoading";
import { LoginContent } from "./LoginContent";
import { useLoginPage } from "./useLoginPage";

const Login: React.FC = () => {
  const { language } = useLanguage();
  const { 
    user,
    isAuthenticated,
    isLoading,
    loginInProgress,
    loginError,
    redirectParam,
    isMockAuth,
    handleLoginSuccess
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
