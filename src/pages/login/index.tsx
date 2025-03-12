
import React from "react";
import Navbar from "@/components/Navbar";
import { LoginContent } from "./LoginContent";
import { useLoginPage } from "./useLoginPage";

const Login: React.FC = () => {
  const {
    language,
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess
  } = useLoginPage();

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
