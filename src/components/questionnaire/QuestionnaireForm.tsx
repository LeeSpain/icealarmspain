
import React from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './questions';
import QuestionCard from './QuestionCard';
import ProgressIndicator from './ProgressIndicator';
import NavigationControls from './NavigationControls';
import MultiEntrySection from './MultiEntrySection';
import RegularQuestionSection from './RegularQuestionSection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/auth';

const QuestionnaireForm: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const {
    answers,
    multiEntries,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    progress,
    handleAddEntry,
    handleRemoveEntry,
    handleAnswerChange,
    handleMultiEntryChange
  } = useQuestionnaire();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // Process and save answers
    const formattedAnswers = {
      ...answers,
      multiEntries: multiEntries
    };
    
    console.log("Answers submitted:", formattedAnswers);
    
    // Save to local storage for demonstration purposes
    localStorage.setItem('userQuestionnaire', JSON.stringify(formattedAnswers));
    
    // In a real application, you would save this to your database and update the user's profile
    // updateUserProfile(user.id, formattedAnswers)
    
    toast.success(
      language === "en"
        ? "Questionnaire submitted successfully! Redirecting to personal details."
        : "¡Cuestionario enviado con éxito! Redirigiendo a datos personales."
    );
    
    // Navigate to personal details page
    setTimeout(() => {
      navigate("/dashboard/personal-details");
    }, 1500);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="container mx-auto px-4 py-12">
      <QuestionCard question={currentQuestion} language={language}>
        <ProgressIndicator 
          currentStep={currentQuestionIndex + 1} 
          totalSteps={questions.length} 
          progressValue={progress} 
          language={language} 
        />

        {/* Render regular questions or multi-entry section */}
        {currentQuestion.allowMultiple ? (
          <MultiEntrySection
            question={currentQuestion}
            entries={multiEntries[currentQuestion.id] || []}
            language={language}
            onAddEntry={() => handleAddEntry(currentQuestion.id)}
            onRemoveEntry={(entryId) => handleRemoveEntry(currentQuestion.id, entryId)}
            onEntryChange={(entryId, subQuestionId, value) => 
              handleMultiEntryChange(currentQuestion.id, entryId, subQuestionId, value)
            }
          />
        ) : (
          <RegularQuestionSection
            question={currentQuestion}
            answers={answers}
            language={language}
            onAnswerChange={(subQuestionId, value) => 
              handleAnswerChange(currentQuestion.id, subQuestionId, value)
            }
          />
        )}

        <NavigationControls
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isLastQuestion={isLastQuestion}
          language={language}
        />
      </QuestionCard>
    </div>
  );
};

export default QuestionnaireForm;
