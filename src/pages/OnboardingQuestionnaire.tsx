
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import QuestionnaireLayout from "@/components/questionnaire/QuestionnaireLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { QuestionnaireProvider } from "@/components/questionnaire/QuestionnaireContext";
import { toast } from "react-toastify";

const OnboardingQuestionnaire: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
    
    // Check if profile is completed
    const profileCompleted = localStorage.getItem('profileCompleted') === 'true';
    
    // If user has already completed profile, redirect to personal details page
    if (profileCompleted) {
      toast.info(
        language === 'en'
          ? 'You have already completed your profile. Redirecting to personal details.'
          : 'Ya has completado tu perfil. Redirigiendo a datos personales.'
      );
      navigate("/dashboard/personal-details");
    }
  }, [isAuthenticated, isLoading, navigate, language]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Loading...' : 'Cargando...'}
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <p className="text-ice-700">
          {language === 'en' ? 'Redirecting to login...' : 'Redirigiendo al login...'}
        </p>
      </div>
    );
  }

  return (
    <QuestionnaireProvider>
      <QuestionnaireLayout>
        <QuestionnaireForm />
      </QuestionnaireLayout>
    </QuestionnaireProvider>
  );
};

export default OnboardingQuestionnaire;
