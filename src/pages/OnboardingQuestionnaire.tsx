import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import QuestionnaireLayout from "@/components/questionnaire/QuestionnaireLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { QuestionnaireProvider } from "@/components/questionnaire/QuestionnaireContext";
import { toast } from "react-toastify";
import MemberSidebar from "@/components/member/MemberSidebar";

const OnboardingQuestionnaire: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
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
      
      navigate(isDashboardRoute ? "/dashboard/personal-details" : "/dashboard/personal-details");
    }
  }, [isAuthenticated, isLoading, navigate, language, isDashboardRoute]);

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

  // If this is accessed from the dashboard route, render with the dashboard layout
  if (isDashboardRoute) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar
          activePage="personal-details"
          collapsed={false}
          setCollapsed={() => {}}
        />
        
        <QuestionnaireProvider>
          <div className="flex-1 overflow-auto">
            <div className="p-6 w-full">
              <QuestionnaireForm />
            </div>
          </div>
        </QuestionnaireProvider>
      </div>
    );
  }

  // Otherwise, use the standard questionnaire layout
  return (
    <QuestionnaireProvider>
      <QuestionnaireLayout>
        <QuestionnaireForm />
      </QuestionnaireLayout>
    </QuestionnaireProvider>
  );
};

export default OnboardingQuestionnaire;
