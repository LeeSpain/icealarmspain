
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Import refactored components
import QuestionCard from "@/components/questionnaire/QuestionCard";
import ProgressIndicator from "@/components/questionnaire/ProgressIndicator";
import NavigationControls from "@/components/questionnaire/NavigationControls";
import MultiEntrySection from "@/components/questionnaire/MultiEntrySection";
import RegularQuestionSection from "@/components/questionnaire/RegularQuestionSection";
import { questions } from "@/components/questionnaire/QuestionData";
import { MultiEntry } from "@/components/questionnaire/types";

const OnboardingQuestionnaire: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // State for all answers
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  
  // State for multi-entry sections (emergency contacts, medications, etc.)
  const [multiEntries, setMultiEntries] = useState<{
    [sectionId: string]: MultiEntry[];
  }>({});
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Initialize multi-entries for sections that allow multiple entries
  useEffect(() => {
    const initialMultiEntries: { [sectionId: string]: MultiEntry[] } = {};
    
    questions.forEach(question => {
      if (question.allowMultiple) {
        initialMultiEntries[question.id] = [createEmptyEntry(question.id)];
      }
    });
    
    setMultiEntries(initialMultiEntries);
  }, []);
  
  // Create an empty entry with a unique ID for multi-entry sections
  const createEmptyEntry = (sectionId: string): MultiEntry => {
    const entry: MultiEntry = { _id: `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
    
    questions.find(q => q.id === sectionId)?.subQuestions.forEach(subQ => {
      entry[subQ.id] = '';
    });
    
    return entry;
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex]);

  // Handle adding a new entry for multi-entry sections
  const handleAddEntry = (sectionId: string) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), createEmptyEntry(sectionId)]
    }));
  };

  // Handle removing an entry from multi-entry sections
  const handleRemoveEntry = (sectionId: string, entryId: string) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].filter(entry => entry._id !== entryId)
    }));
  };

  // Handle answer change for regular questions
  const handleAnswerChange = (
    questionId: string,
    subQuestionId: string,
    value: string | boolean
  ) => {
    setAnswers(prev => ({
      ...prev,
      [`${questionId}_${subQuestionId}`]: value
    }));
  };

  // Handle answer change for multi-entry questions
  const handleMultiEntryChange = (
    sectionId: string,
    entryId: string,
    subQuestionId: string,
    value: string
  ) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(entry => 
        entry._id === entryId ? { ...entry, [subQuestionId]: value } : entry
      )
    }));
  };

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
    
    console.log("Answers:", formattedAnswers);
    
    toast.success(
      language === "en"
        ? "Questionnaire submitted successfully!"
        : "¡Cuestionario enviado con éxito!"
    );
    
    navigate("/dashboard");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Redirecting to login...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
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
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingQuestionnaire;
