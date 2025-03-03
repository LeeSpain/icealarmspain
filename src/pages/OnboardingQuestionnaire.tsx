import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, FileText, User, Home, Phone, Heart, UserPlus, ShieldAlert, BookA } from "lucide-react";

interface Question {
  id: number;
  questionEn: string;
  questionEs: string;
  options?: { id: number; textEn: string; textEs: string; value: string }[];
  type: "text" | "select" | "boolean";
}

const questions: Question[] = [
  {
    id: 1,
    questionEn: "Full Name",
    questionEs: "Nombre Completo",
    type: "text",
  },
  {
    id: 2,
    questionEn: "Address",
    questionEs: "Dirección",
    type: "text",
  },
  {
    id: 3,
    questionEn: "Phone Number",
    questionEs: "Número de Teléfono",
    type: "text",
  },
  {
    id: 4,
    questionEn: "Emergency Contact Name",
    questionEs: "Nombre del Contacto de Emergencia",
    type: "text",
  },
  {
    id: 5,
    questionEn: "Emergency Contact Phone",
    questionEs: "Teléfono del Contacto de Emergencia",
    type: "text",
  },
  {
    id: 6,
    questionEn: "Do you have any known allergies?",
    questionEs: "¿Tiene alguna alergia conocida?",
    type: "boolean",
  },
  {
    id: 7,
    questionEn: "Do you have any medical conditions?",
    questionEs: "¿Tiene alguna condición médica?",
    type: "boolean",
  },
  {
    id: 8,
    questionEn: "Primary Doctor's Name",
    questionEs: "Nombre del Médico Principal",
    type: "text",
  },
  {
    id: 9,
    questionEn: "Primary Doctor's Phone",
    questionEs: "Teléfono del Médico Principal",
    type: "text",
  },
  {
    id: 10,
    questionEn: "Preferred Hospital",
    questionEs: "Hospital Preferido",
    type: "text",
  },
];

const OnboardingQuestionnaire: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex]);

  const handleAnswerChange = (
    questionId: number,
    value: string | boolean
  ) => {
    setAnswers({ ...answers, [questionId]: String(value) });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Process and save answers
    console.log("Answers:", answers);
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>
                {language === "en"
                  ? "Onboarding Questionnaire"
                  : "Cuestionario de Incorporación"}
              </CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Please answer the following questions to complete your profile."
                  : "Por favor, responda las siguientes preguntas para completar su perfil."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} />
              <h2 className="text-xl font-semibold">
                {language === "en"
                  ? `Question ${currentQuestionIndex + 1} of ${questions.length}`
                  : `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}
              </h2>
              <p>
                {language === "en"
                  ? currentQuestion?.questionEn
                  : currentQuestion?.questionEs}
              </p>

              {currentQuestion?.type === "text" && (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={answers[currentQuestion?.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion?.id, e.target.value)
                  }
                />
              )}

              {currentQuestion?.type === "boolean" && (
                <div className="flex gap-4">
                  <Button
                    variant={
                      answers[currentQuestion?.id] === "true"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => handleAnswerChange(currentQuestion?.id, "true")}
                  >
                    {language === "en" ? "Yes" : "Sí"}
                  </Button>
                  <Button
                    variant={
                      answers[currentQuestion?.id] === "false"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() =>
                      handleAnswerChange(currentQuestion?.id, "false")
                    }
                  >
                    {language === "en" ? "No" : "No"}
                  </Button>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                >
                  {language === "en" ? "Previous" : "Anterior"}
                </Button>
                {currentQuestionIndex === questions.length - 1 ? (
                  <Button onClick={handleSubmit}>
                    {language === "en" ? "Submit" : "Enviar"}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {language === "en" ? "Next" : "Siguiente"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingQuestionnaire;
