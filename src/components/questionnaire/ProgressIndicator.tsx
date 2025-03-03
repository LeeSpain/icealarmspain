
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progressValue: number;
  language: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  progressValue,
  language,
}) => {
  return (
    <div className="space-y-2">
      <Progress value={progressValue} className="h-2" />
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {language === "en"
            ? `Step ${currentStep} of ${totalSteps}`
            : `Paso ${currentStep} de ${totalSteps}`}
        </span>
        <span>{Math.round(progressValue)}%</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
