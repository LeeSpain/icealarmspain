
import React from "react";
import AuthForm from "@/components/AuthForm";

interface JoinSignupProps {
  language: string;
  onSuccess: () => void;
}

const JoinSignup: React.FC<JoinSignupProps> = ({ language, onSuccess }) => {
  return (
    <div className="max-w-md mx-auto glass-panel p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
      </h1>
      <p className="text-muted-foreground mb-4 text-center">
        {language === 'en' 
          ? "Sign up to start your health monitoring journey with ICE Alarm España. You'll complete your profile in the next step." 
          : "Regístrate para comenzar tu viaje de monitoreo de salud con ICE Alarm España. Completarás tu perfil en el siguiente paso."}
      </p>
      
      <AuthForm mode="signup" onSuccess={onSuccess} redirectTo="/onboarding" />
    </div>
  );
};

export default JoinSignup;
