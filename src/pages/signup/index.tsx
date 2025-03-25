
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth"; // Use relative path for consistency
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Signup: React.FC = () => {
  const { language } = useLanguage();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signUp(email, password, {
        display_name: displayName
      });
      
      toast({
        title: language === 'en' ? "Account Created" : "Cuenta Creada",
        description: language === 'en' 
          ? "Please check your email to confirm your account" 
          : "Por favor, revisa tu correo electrónico para confirmar tu cuenta",
        duration: 5000
      });
      
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error);
      setError(language === 'en' 
        ? "An error occurred during signup" 
        : "Ocurrió un error durante el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{language === 'en' ? 'Create Account - ICE Alarm' : 'Crear Cuenta - ICE Alarm'}</title>
        <meta
          name="description"
          content={
            language === 'en'
              ? "Create your ICE Alarm account to access health monitoring services."
              : "Crea tu cuenta de ICE Alarm para acceder a los servicios de monitoreo de salud."
          }
        />
      </Helmet>
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto p-8 shadow-xl bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
            </h1>
            <p className="text-muted-foreground mb-8 text-center">
              {language === 'en' 
                ? "Sign up to start your health monitoring journey with ICE Alarm España." 
                : "Regístrate para comenzar tu viaje de monitoreo de salud con ICE Alarm España."}
            </p>
            
            <CardContent className="p-0">
              <SignupForm 
                onSuccess={handleSignup} 
                isLoading={isLoading}
                error={error}
              />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? "Already have an account?" : "¿Ya tienes una cuenta?"}{' '}
                  <Link to="/login" className="text-ice-600 hover:text-ice-700 font-medium">
                    {language === 'en' ? "Log In" : "Inicia Sesión"}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
};

export default Signup;
