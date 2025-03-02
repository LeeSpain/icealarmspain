
import React from "react";
import { Link } from "react-router-dom";

// Form validation utility
export const validateForm = (formData: {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}, mode: "login" | "signup", language: string) => {
  const newErrors: {[key: string]: string} = {};
  
  if (!formData.email.trim()) {
    newErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = language === 'en' ? "Email is invalid" : "El correo electrónico no es válido";
  }
  
  if (!formData.password) {
    newErrors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
  } else if (formData.password.length < 8) {
    newErrors.password = language === 'en' 
      ? "Password must be at least 8 characters" 
      : "La contraseña debe tener al menos 8 caracteres";
  }
  
  if (mode === "signup") {
    if (!formData.name?.trim()) {
      newErrors.name = language === 'en' ? "Name is required" : "El nombre es obligatorio";
    }
    
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = language === 'en' 
        ? "Passwords do not match" 
        : "Las contraseñas no coinciden";
    }
  }
  
  return newErrors;
};

// Social Sign in buttons
export const SocialSignIn: React.FC<{language: string}> = ({ language }) => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {language === 'en' ? "Or continue with" : "O continuar con"}
          </span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ice-500"
        >
          <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.0003 2C6.47731 2 2.00098 6.47733 2.00098 12C2.00098 16.9913 5.58731 21.1283 10.4377 21.8785V14.8906H7.90104V12H10.4377V9.79625C10.4377 7.29125 11.931 5.875 14.2153 5.875C15.311 5.875 16.4537 6.10188 16.4537 6.10188V8.5625H15.194C13.951 8.5625 13.5629 9.3334 13.5629 10.1242V12H16.337L15.894 14.8906H13.5629V21.8785C18.4134 21.1275 22.0003 16.9903 22.0003 12C22.0003 6.47733 17.5234 2 12.0003 2Z" />
          </svg>
        </button>
        
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ice-500"
        >
          <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.8,10.5h-10v3.6h5.7c-0.5,2.5-2.7,4.3-5.7,4.3c-3.5,0-6.3-2.8-6.3-6.3s2.8-6.3,6.3-6.3c1.5,0,2.9,0.5,4,1.4l2.5-2.5C16.4,2.9,14.3,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c8.4,0,10.3-7.8,9.5-11.5C21.5,10.5,21.8,10.5,21.8,10.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Auth form footer with links
export const AuthFormFooter: React.FC<{
  mode: "login" | "signup";
  language: string;
}> = ({ mode, language }) => {
  return (
    <div className="mt-6 text-center text-sm">
      {mode === "login" ? (
        <p>
          {language === 'en' ? "Don't have an account?" : "¿No tienes una cuenta?"}{" "}
          <Link to="/join" className="font-medium text-ice-600 hover:text-ice-500">
            {language === 'en' ? "Sign up here" : "Regístrate aquí"}
          </Link>
        </p>
      ) : (
        <p>
          {language === 'en' ? "Already have an account?" : "¿Ya tienes una cuenta?"}{" "}
          <Link to="/login" className="font-medium text-ice-600 hover:text-ice-500">
            {language === 'en' ? "Sign in here" : "Inicia sesión aquí"}
          </Link>
        </p>
      )}
    </div>
  );
};
