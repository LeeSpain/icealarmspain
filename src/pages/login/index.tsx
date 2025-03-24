
import React from "react";
import { Helmet } from "react-helmet-async";
import { LoginContent } from "./LoginContent";
import { useLoginPage } from "./useLoginPage";
import Layout from "@/components/layout/Layout";

const Login: React.FC = () => {
  const {
    language,
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess
  } = useLoginPage();

  return (
    <Layout>
      <Helmet>
        <title>{language === 'en' ? 'Login - ICE Alarm' : 'Inicio de Sesión - ICE Alarm'}</title>
        <meta
          name="description"
          content={
            language === 'en'
              ? "Sign in to your ICE Alarm account to access your health monitoring dashboard."
              : "Inicia sesión en tu cuenta de ICE Alarm para acceder a tu panel de monitoreo de salud."
          }
        />
      </Helmet>
      
      <main className="pt-28 pb-16">
        <LoginContent
          handleLoginSuccess={handleLoginSuccess}
          loginInProgress={loginInProgress}
          loginError={loginError}
          redirectParam={redirectParam}
          language={language}
        />
      </main>
    </Layout>
  );
};

export default Login;
