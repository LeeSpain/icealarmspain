
import React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Steps = ({ currentStep, children, className }: StepsProps) => {
  // Count the number of Step components
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === Step
  );
  const totalSteps = steps.length;

  // Clone and enhance each Step component with additional props
  const enhancedSteps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Step) {
      return React.cloneElement(child, {
        stepNumber: index + 1,
        isActive: index + 1 === currentStep,
        isCompleted: index + 1 < currentStep,
        isLast: index + 1 === totalSteps,
      });
    }
    return child;
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col sm:flex-row gap-2">{enhancedSteps}</div>
    </div>
  );
};

export const Step = ({
  title,
  description,
  icon,
  stepNumber,
  isActive,
  isCompleted,
  isLast,
}: StepProps & {
  stepNumber?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
}) => {
  return (
    <div className="flex-1 relative">
      <div className="flex items-center mb-2">
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full z-10",
            isActive
              ? "bg-ice-600 text-white"
              : isCompleted
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-500"
          )}
        >
          {isCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : icon ? (
            icon
          ) : (
            <span className="text-sm font-medium">{stepNumber}</span>
          )}
        </div>
        
        {!isLast && (
          <div className="hidden sm:block h-0.5 flex-1 bg-gray-200 ml-2">
            <div
              className={cn("h-full bg-green-600", isCompleted ? "w-full" : "w-0")}
            />
          </div>
        )}
      </div>
      
      <div className="sm:pr-6">
        <h3
          className={cn(
            "text-sm font-medium",
            isActive ? "text-ice-700" : isCompleted ? "text-green-700" : "text-gray-500"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {!isLast && (
        <div className="sm:hidden w-0.5 h-6 bg-gray-200 absolute left-4 top-8">
          <div
            className={cn("w-full bg-green-600", isCompleted ? "h-full" : "h-0")}
          />
        </div>
      )}
    </div>
  );
};
