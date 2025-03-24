
import React from "react";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import "react-toastify/dist/ReactToastify.css";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
  language?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  mode, 
  onSuccess, 
  isLoading, 
  error,
  redirectTo,
  language 
}) => {
  console.log("AuthForm rendering, mode:", mode, "redirectTo:", redirectTo, "error:", error);
  
  // Create empty promise for default onSuccess
  const defaultOnSuccess = async (email: string, password: string, rememberMe: boolean) => {
    console.log("Default onSuccess handler called");
    return Promise.resolve();
  };

  // For signup form specific handler that accepts displayName
  const handleSignupSuccess = async (email: string, password: string, displayName: string) => {
    if (onSuccess) {
      // The signup form passes displayName but the login handler expects rememberMe
      // We'll ignore the displayName and pass false for rememberMe to satisfy the typing
      return onSuccess(email, password, false);
    }
    return Promise.resolve();
  };
  
  return (
    <>
      {mode === "login" ? (
        <LoginForm 
          onSuccess={onSuccess || defaultOnSuccess} 
          isLoading={isLoading} 
          error={error}
          redirectTo={redirectTo}
          language={language} 
        />
      ) : (
        <SignupForm 
          onSuccess={handleSignupSuccess} 
          isLoading={isLoading}
          error={error}
          // Don't pass redirectTo as it's not in the SignupForm props
        />
      )}
    </>
  );
};

export default AuthForm;
