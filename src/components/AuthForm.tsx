
import React from "react";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import "react-toastify/dist/ReactToastify.css";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: (email: string, password: string) => void;
  isLoading?: boolean;
  redirectTo?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess, isLoading, redirectTo }) => {
  console.log("AuthForm rendering, mode:", mode, "redirectTo:", redirectTo);
  
  return (
    <>
      {mode === "login" ? (
        <LoginForm onSuccess={onSuccess} isLoading={isLoading} redirectTo={redirectTo} />
      ) : (
        <SignupForm onSuccess={onSuccess} isLoading={isLoading} redirectTo={redirectTo} />
      )}
    </>
  );
};

export default AuthForm;
