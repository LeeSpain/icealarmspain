
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    console.log("Login page useEffect - isAuthenticated:", isAuthenticated, "user:", user);
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'callcenter':
          navigate('/call-center');
          break;
        default:
          // Direct members to the member dashboard
          navigate('/dashboard');
          break;
      }
    }
  }, [isAuthenticated, navigate, user]);
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleLoginSuccess = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", email);
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: language === 'en' ? "Login successful!" : "¡Inicio de sesión exitoso!",
          description: language === 'en' ? "Redirecting to your dashboard..." : "Redirigiendo a tu panel...",
        });
        
        // Navigation happens automatically in the useEffect
      } else {
        toast({
          title: language === 'en' ? "Login failed" : "Error de inicio de sesión",
          description: language === 'en' ? "Invalid email or password" : "Correo o contraseña inválidos",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: language === 'en' ? "Login error" : "Error de inicio de sesión",
        description: language === 'en' ? "Something went wrong" : "Algo salió mal",
        variant: "destructive",
      });
      setIsLoading(false);
    }
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
            
            <AuthForm 
              mode="login" 
              onSuccess={handleLoginSuccess} 
              isLoading={isLoading}
            />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {language === 'en' ? "Demo credentials:" : "Credenciales de demostración:"}
              </p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p><strong>{language === 'en' ? "Admin:" : "Administrador:"}</strong> admin@icealarm.es / admin123</p>
                <p><strong>{language === 'en' ? "Member:" : "Miembro:"}</strong> member@icealarm.es / member123</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
