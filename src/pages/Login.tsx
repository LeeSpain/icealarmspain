
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleLoginSuccess = () => {
    // Redirect to dashboard or home after successful login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto glass-panel p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {language === 'en' ? "Welcome Back" : "Bienvenido de Nuevo"}
            </h1>
            <p className="text-muted-foreground mb-8 text-center">
              {language === 'en' 
                ? "Sign in to access your ICE Alarm España account and dashboard." 
                : "Inicia sesión para acceder a tu cuenta y panel de ICE Alarm España."}
            </p>
            
            <AuthForm mode="login" onSuccess={handleLoginSuccess} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
