
import React from "react";
import { Link } from "react-router-dom";

interface LoginFormFooterProps {
  rememberMe: boolean;
  onRememberMeChange: () => void;
  isLoading: boolean;
  language: string;
}

export const LoginFormFooter: React.FC<LoginFormFooterProps> = ({
  rememberMe,
  onRememberMeChange,
  isLoading,
  language
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={onRememberMeChange}
            className="h-4 w-4 text-ice-600 focus:ring-ice-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            {language === 'en' ? "Remember me" : "Recuérdame"}
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="font-medium text-ice-600 hover:text-ice-500">
            {language === 'en' ? "Forgot your password?" : "¿Olvidaste tu contraseña?"}
          </a>
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ice-600 hover:bg-ice-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ice-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'en' ? "Signing in..." : "Iniciando sesión..."}
            </>
          ) : (
            language === 'en' ? "Sign in" : "Iniciar sesión"
          )}
        </button>
      </div>
      
      <div className="text-center text-sm">
        <p>
          {language === 'en' ? "Don't have an account?" : "¿No tienes una cuenta?"}{" "}
          <Link to="/join" className="font-medium text-ice-600 hover:text-ice-500">
            {language === 'en' ? "Sign up here" : "Regístrate aquí"}
          </Link>
        </p>
      </div>
    </div>
  );
};
