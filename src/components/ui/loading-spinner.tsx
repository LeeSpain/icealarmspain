
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  message, 
  className,
  fullPage = false
}) => {
  const { language } = useLanguage();
  const defaultMessage = language === 'en' ? 'Loading...' : 'Cargando...';
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center", 
      fullPage ? "min-h-screen" : "",
      className
    )}>
      <Loader2 className={cn("animate-spin text-primary mb-2", sizeClasses[size])} aria-hidden="true" />
      {(message || fullPage) && (
        <p className="text-muted-foreground">
          {message || defaultMessage}
        </p>
      )}
    </div>
  );
  
  // For accessibility, announce loading state to screen readers
  return (
    <>
      {content}
      {fullPage && (
        <div className="sr-only" role="status" aria-live="polite">
          {message || defaultMessage}
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
