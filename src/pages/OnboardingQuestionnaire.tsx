
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import QuestionnaireLayout from "@/components/questionnaire/QuestionnaireLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";

const OnboardingQuestionnaire: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <QuestionnaireLayout>
      <QuestionnaireForm />
    </QuestionnaireLayout>
  );
};

export default OnboardingQuestionnaire;
