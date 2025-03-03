
import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationControlsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  language: string;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
  isLastQuestion,
  language,
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentQuestionIndex === 0}
      >
        {language === "en" ? "Previous" : "Anterior"}
      </Button>
      
      {isLastQuestion ? (
        <Button onClick={onSubmit}>
          {language === "en" ? "Submit" : "Enviar"}
        </Button>
      ) : (
        <Button onClick={onNext}>
          {language === "en" ? "Next" : "Siguiente"}
        </Button>
      )}
    </div>
  );
};

export default NavigationControls;
